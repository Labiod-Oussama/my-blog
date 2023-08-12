import { Request, Response } from "express";
import Blog from "../Models/Blog";
import Like from "../Models/Like";

module.exports.getBlogs = async (req: Request, res: Response) => {
    try {
        let blogs: any[] = [];
        await Blog.find()
            .then(result => {
                result.forEach(blog => blogs.push(blog))
                res.status(200).json({ blogs })
            })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ 'error': 'could not fetch' })
    }
}

module.exports.like = async (req: Request, res: Response) => {
    const userid = res.locals.id;
    const blogid = req.params.id;
    const response = await Blog.find({ _id: blogid, Like: userid })
    try {
        if (response.length == 0) {
            await Blog.updateOne({ _id: blogid }, { $push: { Like: userid } })
            return res.status(200).json({ dispatch: 'like' })
        }
        await Blog.updateOne({ _id: blogid }, { $pull: { Like: userid } })
        return res.status(200).json({ dispatch: 'unlike' })

    }
    catch (error) {
        return res.status(500).json({ message: 'error in fetch' })
    }
}

module.exports.OneBlog = async (req: Request, res: Response) => {
    const blogid = req.params.id;
    try {
        const blog = await Blog.findById(blogid).populate({
            path: 'Commentaire.userid',
            model: 'users',
            select: ['FirstName', 'LastName'],
        });

        res.status(200).json({ blog })
    } catch (error) {
        return res.status(500).json({ message: 'error in fetch' })

    }
}

module.exports.Comment = async (req: Request, res: Response) => {
    const userid = res.locals.id;
    const { blogid, comment } = req.body;
    try {
        const response = await Blog.findOneAndUpdate(
            { _id: blogid },
            {
                $push: {
                    Commentaire: {
                        userid: userid,
                        body: comment,
                    },
                },
            },
            { new: true }
        ).populate({
            path: 'Commentaire.userid',
            model: 'users',
            select: ['FirstName', 'LastName'],
        });
        if (response) {
            return res.status(200).json({ blog: response })
        }
    } catch (error) {
        return res.status(500).json({ message: 'error in fetch' })
    }
}

module.exports.edit = async (req: Request, res: Response) => {
    const Idblogtoedit = req.params.id;
    const { Title, Image, Description } = req.body
    try {
        const response = await Blog.findOneAndUpdate(
            { _id: Idblogtoedit },
            {
                $set: {
                    Title,
                    Image,
                    Description
                }
            },
            { new: true }
        )
        if (response) {
            return res.status(200).json({ type: 'success', message: 'updated successfully' })
        }
        else {
            return res.status(500).json({ type: 'error', message: 'updated failed' })
        }
    } catch (error) {
        res.status(500).json({ message: 'error in fetch' })
    }

}

module.exports.create = async (req: Request, res: Response) => {
    const { Title, Image, Description } = req.body;    
    try {
        const blog = await Blog.findOne({ Title, Image, Description });
        if (blog) {
            return res.status(403).json({ type: 'error', message: 'blog are already exist' })
        }
       const newBlog= await Blog.create({ Title, Image, Description});
        if (newBlog) {
            res.status(200).json({ type: 'success', message: 'the blog created successfully' })
        } else {
            res.status(500).json({ type: 'success', message: 'failed to create it' })
        }
    } catch (error) {
        res.status(500).json({ message: 'error in fetch' })
    }
}

module.exports.delete = async (req: Request, res: Response) => {
    const Idblogtodelete = req.params.id;
    try {
        await Blog.deleteOne({ _id: Idblogtodelete }).then(result => {
            res.status(200).json({ type: 'success', message: 'deleted successfuly' })
        }).catch(err => res.status(500).json({ type: 'error', message: 'deleted failed' }))
    } catch (error) {
        res.status(500).json({ message: 'error in fetch' })
    }
}