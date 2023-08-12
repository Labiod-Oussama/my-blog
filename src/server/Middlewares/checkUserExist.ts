import { NextFunction, Request, Response } from "express";
import User from "../Models/User";
const bcrypt = require('bcrypt');
async function checkUserExist(req: Request, res: Response, next: NextFunction) {
    const { Email, Password } = req.body;

    try {
        const user = await User.findOne({ Email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const authPass = await bcrypt.compare(Password, user.Password);
        if (!authPass) {
            return res.status(404).json({ message: 'Invalid Password' });
        }
        (req as any).user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
export default checkUserExist