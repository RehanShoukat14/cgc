import { asyncHandler } from "../utils/asyncHandler.js"
import User from '../models/user.model.js'
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from '../utils/ApiResponse.js'

const genrateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.genrateAccessToken()
        const refreshToken = user.genrateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500, "Something went wrong while genrating refresh and access tokens")
    }
}

// registerUser
const registerUser = asyncHandler( async(req, res) => {
    const {username, fullname, password, cnic, email} = req.body
    
    if([fullname, username, cnic, password, email].some((field) => field?.trim() === "")){
        throw new ApiError(400, "All field are required")
    }

    const existedUser = User.findOne({
        $or:[{cnic},{email}]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or cnic already exists")
    }

    const user = await User.create({
        fullname,
        username: username.toLowerCase(),
        cnic,
        password,
        email:email.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }
    return res.status(201).json(
        new  ApiResponse(200, createdUser, "User created successfully")
    )
})

//loginUser
const loginUser = asyncHandler(async (req, res) => {
    const {email, password, username} = req.body

    if(!username || email){
        throw new ApiError(400, "Username or Email is required")
    }

    const user = User.findOne({
        $or: [{username}, {email}]
    })

    if(!user){
        throw new ApiError(404, "User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(401, "Invalid user credientials")
    }

    const {accessToken, refreshToken} = await genrateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findOne(user._id).select("-password -refeshToken")
    const options = {
        httpOnly: true,
        scure: true
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken", refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                user:loggedInUser
            },
            "User logged In Successfully"
        )
    )

})

//loggedOut User
const logoutUser = asyncHandler (async (req, res) => {
    
})
export {registerUser, loginUser}