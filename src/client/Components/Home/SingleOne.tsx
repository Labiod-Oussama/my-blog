import React, { useContext, useEffect, useState } from 'react'
import { Box, Card, CardHeader, Avatar, Container, CardMedia, CardContent, Typography, CardActions, Button, TextField, } from '@mui/material'
import Header from '../Global/Header'
import { useNavigate, useParams } from "react-router-dom";
import { getOneBlog } from '../API/ApiForBlog';
import { AlertProps, propsBlogs } from '../Type/Props';
import { infoGlobal } from '../../App';
import { serverAddress } from '../Global/Config';

function SingleOne() {
    const { infos: { token, UserInfos }, setInfos } = useContext(infoGlobal);
    const params = useParams()
    const blogid = params.blogID || '';
    const navigate = useNavigate()
    const [alert, setAlert] = useState<AlertProps>({ alerting: { type: '', text: '' }, open: false });
    const [blog, setBlog] = useState<propsBlogs>({} as propsBlogs)
    useEffect(() => {
        const getBlog = async () => {
            const { json, ok, status } = await getOneBlog(blogid);
            if (!ok && status == 403) {
                setAlert({ alerting: { type: 'error', text: json.message }, open: true });
            } else {
                setBlog(json.blog)
            }
        }
        getBlog()
    }, [])
    useEffect(() => {
        if (!token) {
            navigate('/')
        }
    }, [])
    const [comment, setComment] = useState<string>('');
    const [errorCommit, setErrorCommit] = useState<boolean>(false)
    const handleComment = () => {
        if (comment) {
            fetch(`${serverAddress}/comment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({
                    blogid: blog._id,
                    comment
                })
            }).then(res => res.json())
                .then(data => { setBlog(data?.blog); setComment('') })
                .catch(err => console.log(err))

        }
    }
    return (
        <Box>
            <Header />
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, mb: 5 }}>
                {

                    Object.keys(blog).length != 0 && <Card sx={{ width: { xs: '90%', md: '70%' } }} >
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe" sx={{ bgcolor: 'red' }}>
                                    {blog.Title?.slice(0, 1)}

                                </Avatar>
                            }
                            title={blog.Title}
                            subheader={new Date(blog.Date)?.toDateString()}
                        />
                        <CardMedia
                            component="img"
                            height="300px"
                            image={blog.Image}
                            alt={blog.Title}
                            sx={{ cursor: 'pointer', objectFit: 'cover' }}
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary" mb={3}>
                                {blog.Description}
                            </Typography>
                            <Box className='CommentSec'>
                                <Typography variant='h5'>Comments</Typography>
                                {
                                    blog.Commentaire?.length != 0
                                        ? <Box sx={{ maxHeight: '200px', overflowY: 'auto' }}>

                                            {
                                                blog.Commentaire?.map((comment, index) => (
                                                    <CardHeader
                                                        key={index}
                                                        avatar={
                                                            <CardHeader
                                                                avatar={
                                                                    <Avatar aria-label="recipe">
                                                                        {
                                                                            comment.userid?.FirstName?.slice(0, 1)
                                                                        }
                                                                    </Avatar>
                                                                }
                                                                title={`${comment.userid.FirstName} ${comment.userid.LastName}`}
                                                                subheader={comment.body}
                                                            />
                                                        }
                                                    />
                                                ))
                                            }
                                        </Box> : <Typography variant="caption" sx={{ color: 'orange' }}>there is no comment</Typography>
                                }

                            </Box>
                        </CardContent>
                        <CardActions disableSpacing sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', m: 1, p: 2, bgcolor: 'rgb(234, 243, 243)' }}>
                            <Typography variant='h5' fontWeight='bold' mb={1.5}>Add your comment here!</Typography>
                            <TextField
                                variant='filled'
                                color='primary'
                                type='text'
                                value={comment}
                                fullWidth
                                multiline
                                rows={2}
                                onChange={(e) => setComment(e.target.value)}
                                error={errorCommit}
                            />
                            <Button
                                variant='contained'
                                color='primary' sx={{ mt: 2, '&:hover': { bgcolor: 'primary.main' } }}
                                onClick={handleComment}
                            >
                                Comment
                            </Button>
                        </CardActions>

                    </Card>
                }
            </Box>
        </Box>
    )
}

export default SingleOne