import {v2 as cloudinary} from "cloudinary"
import fs from 'fs'


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath,{
            resourse_type:"auto"
        })
        fs.unlinkSync(localFilePath)
        console.log("file uploaded successfully",response.url);
    } catch (error) {
        fs.unlinkSync(localFilePath)
    }
}

export {uploadOnCloudinary}

