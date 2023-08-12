import { useEffect, useState, useContext, forwardRef, useReducer } from 'react'
import { Box, Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography, CardActions, Snackbar, Grow } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import { infoGlobal } from '../../App';
import { serverAddress } from '../Global/Config';
// import MuiAlert from '@mui/material/Alert';
import { propsBlogs, SnackbarProps, AlertProps, Action } from '../Type/Props';
import { useNavigate } from 'react-router-dom';
import Alert from '../Global/Alerte';
// const Alert = forwardRef(function Alert(props, ref) {
//     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} sx={{ cursor: 'pointer' }} />;
// });

const Blog = (props: propsBlogs) => {
    const { infos: { token, UserInfos }, setInfos } = useContext(infoGlobal);
    const iduser = UserInfos?.user?._id;
    const navigate = useNavigate();
    const initialState = props
    const reducer = (state: propsBlogs, action: Action): propsBlogs => {
        switch (action) {
            case 'like':
                return {
                    ...state, Like: [...state.Like, iduser]
                }
            case 'unlike':
                return {
                    ...state, Like: state.Like.filter(id => id != iduser)
                }
            default:
                return state
        }
    }
    const [blog, dispatch] = useReducer(reducer, initialState);
    //handling the alert of cart 
    const [alert, setAlert] = useState<AlertProps>({ alerting: { type: '', text: '' }, open: false });
    // handlelike
    const handleLike = async (id_Blog: any) => {
        const response = await fetch(`${serverAddress}/like/${id_Blog}`, {
            method: 'post',
            headers: { "Content-Type": "application/json" }
        })
        const json = await response.json();
        if (!response.ok && response.status == 403) {
            setAlert({ alerting: { type: 'error', text: json.message }, open: true });
        }
        else {
            dispatch(json.dispatch)
        }
    }
    return (
        <>
            {
                <Card key={blog._id} sx={{ flex: '1 1 300px' }} >
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
                        height="194"
                        image={blog.Image}
                        alt="Paella dish"
                        sx={{ cursor: 'pointer' }}
                        onClick={() => token
                            ? navigate(`/${blog._id}`)
                            : setAlert({ alerting: { type: 'error', text: 'You must log in ' }, open: true })}
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {blog.Description}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton
                                aria-label="add to favorites"
                                style={{ marginRight: '1px' }}
                                onClick={() => handleLike(blog._id)}
                            >
                                {
                                    (token && blog.Like.includes(iduser)) ? <FavoriteIcon sx={{ color: 'red' }} />
                                        : < FavoriteBorderIcon sx={{ color: 'red' }} />
                                }
                            </IconButton>
                            {blog.Like.length}
                        </Box>
                        <Box >
                            {blog.Commentaire?.length != 0 && blog.Commentaire?.length}
                            <IconButton
                                aria-label="share"
                                style={{ marginLeft: '1px' }}
                                onClick={() => token ? (navigate(`/${blog._id}`)) : setAlert({ alerting: { type: 'error', text: 'You must log in' }, open: true })}
                            >
                                <CommentIcon />
                            </IconButton>
                        </Box>

                    </CardActions>

                </Card>
            }
            {
                <Alert alerting={alert.alerting} open={alert.open} />
            }
        </>
    )
}

export default Blog