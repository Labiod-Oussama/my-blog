import { Request, Response } from 'express'
import User from '../Models/User';
module.exports.signup = async (req: Request, res: Response) => {
    const { FirstName, LastName, Email, Password } = req.body;
    try {
        const existingUser = await User.findOne({ Email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: 'User already exists' });
        }
        const user = await User.create({ FirstName, LastName, Email, Password })
        const token = await user.generateAuthToken();
        res.cookie('token', token, {
            maxAge: 1000 * 60 * 60 * 24, httpOnly: true, secure: true, sameSite: 'strict', path: '/', domain: '.netlify.app'
        });
        res.status(201).json({ success: true, user, token })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'error during signup' })
    }
}

module.exports.login = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;
        const token = await user.generateAuthToken();
        res.cookie('token', token, {
            maxAge: 1000 * 60 * 60 * 24, httpOnly: true, secure: true, sameSite: 'strict', path: '/', domain: '.netlify.app'
        });
        res.status(201).json({ success: true, user, token })
    }
    catch (error) {
        console.log(error);

    }
}

module.exports.logout = async (req: Request, res: Response) => {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: 'logged out '
    })
}


