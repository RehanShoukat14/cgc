import { asyncHandler } from "../utils/asyncHandler";

export const varifyJWT =asyncHandler( async (req, res, next) => {
    req.cookies?.accessToken || req.header("Authorization")?
})