import { NextFunction, Request, Response } from "express";
import User from "../Models/User";
const jwt = require('jsonwebtoken')
async function authUser(req: Request, res: Response, next: NextFunction) {
    const { token } = req.cookies;
    if (!token) {
        return res.status(403).send({ message: "you must log in" });
        return next();
    }
    try {
        const decodedToken = jwt.verify(token, 'Oussama LD');
        if (!decodedToken) {
            return res.status(401).json({message:'Unauthorized'})
        }
        if (decodedToken) {
           const user= await User.findById(decodedToken._id)
           if (user) {
             res.locals.id=decodedToken._id;
             res.locals.role=user.Role;
           }
        }

        next()
    } catch (error) {
        return res.status(500).json({ message:'error in fetch' })
    }
}
export default authUser; 
// export type AuthMiddleware<
//   Locals extends Record<keyof IUser, IUser[keyof IUser]> = Record<
//     keyof IUser,
//     IUser[keyof IUser]
//   >
// > = RequestHandler<{ [key: string]: string }, any, any, any, Locals>;

// export const authMiddleware: AuthMiddleware = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { authorization, refresh } = req.cookies;
//   console.log("jwt");
  
// console.log(refresh);
// console.log(authorization);

//   if (!authorization) {
//     return res.status(400).sen
// ihab kenouze9:35 PM
// export function generateToken(
//   user: IUser,
//   type: "refresh" | "token" = "token"
// ): string {
//   return sign(user, jwtSecret, {
//     expiresIn: type === "token" ? "30s" : "7d",
//   });
// }

// export function renewToken(token: string) {
//   try {
//     const { user_id, user_email,user_lavel,user_Device_id } = verify(token, jwtSecret) as IUser;
//     const user: IUser = { user_id, user_email,user_lavel,user_Device_id } as IUser;
//     const newToken = generateToken(user, "token");
//     const refresh = generateTo