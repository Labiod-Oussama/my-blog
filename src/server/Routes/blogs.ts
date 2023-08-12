import authUser from "../Middlewares/authUser";
 const { Router } = require('express')
const BlogController = require('../Controlleurs/BlogControlleur');
const router = Router();

router.get('/getBlogs', BlogController.getBlogs);
router.post('/like/:id', authUser, BlogController.like);
router.get('/OneBlog/:id', authUser, BlogController.OneBlog);
router.post('/comment', authUser, BlogController.Comment);
router.put('/EditBlog/:id',authUser,BlogController.edit)
router.post('/create',authUser,BlogController.create)
router.delete('/deleteBlog/:id', authUser,BlogController.delete)
module.exports = router;