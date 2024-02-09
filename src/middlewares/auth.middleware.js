import { asyncHandler } from "../utils/asyncHandler.js";

export const varifyJWT =asyncHandler( async (req, res, next) => {
    req.cookies?.accessToken || req.header("Authorization")
})