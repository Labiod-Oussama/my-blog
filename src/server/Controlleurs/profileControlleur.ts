import { NextFunction, Request, Response } from "express";
import image from '../Models/image'

module.exports.saveImg = async (req: Request, res: Response, Next: NextFunction) => {
    if (!req.file) {
        return res.status(400).json({ type: 'error', message: 'it is the same photo' });
    }
    const imagePath = req.file.path;
    const userid = res.locals.id;
    try {
        const currentImg = await image.find({ userid });
        if (currentImg.length != 0) {
            await image.updateOne({ userid }, { $set: { image: imagePath } })
            return res.status(200).json({ type: 'success', message: 'the photo profile changed successfull' })
        }
        const img = await image.create({ userid, image: imagePath })
        if (img) {
            return res.status(200).json({ type: 'success', message: 'the photo profile changed successfully' })
        }
        else {
            return res.status(500).json({ type: 'error', message: 'failed to create it' })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports.getImg = async (req: Request, res: Response, Next: NextFunction) => {
    const userid = res.locals.id;
    try {
        const img = await image.find({ userid })
        console.log(img);

        if (img.length != 0) {
            return res.status(200).json({ image: img[0].image })
        } else {
            return res.status(403).json({ message: 'there is no photo' })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}