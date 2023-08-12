import { NextFunction, Request, Response } from "express";

async function isAdmin(req: Request, res: Response, next: NextFunction) {
    const role = res.locals.role;
    if (role != 'admin') {
        return res.status(200).json({ admin: false });
    } else {
        return res.status(200).json({ admin: true });
    }
}

export default isAdmin