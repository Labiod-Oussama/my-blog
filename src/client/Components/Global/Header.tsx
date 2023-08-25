import React, { useEffect, useState, useContext } from 'react'
import { AppBar, Box, Button, Menu, MenuItem, Toolbar, Typography, Avatar } from '@mui/material'
import HouseIcon from '@mui/icons-material/House';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useNavigate } from 'react-router-dom';
import Drawer from './Draw';
import { infoGlobal } from '../../App';
import user from '../../assets/user.jpg'
import DialogImg from './DialogImg';
import { serverAddress } from './Config';

function Header() {
    const { infos: { token, UserInfos }, setInfos } = useContext(infoGlobal)
    const navigate = useNavigate()
    const [showLogin, setShowLogin] = useState<boolean>(true);
    const [showRegister, setShowRegister] = useState<boolean>(true);
    useEffect(() => {
        setShowRegister(true)
        setShowLogin(true)
        const path = window.location.pathname;
        if (path.includes('Login')) {
            setShowLogin(false)
        }
        else if (path.includes('Signup')) {
            setShowRegister(false)
        }
    }, [window.location.pathname])


    const handleLogOut = () => {
        fetch('http://localhost:3000/logout', {
            method: 'get'
        }).then(() => { setInfos({ token: undefined, UserInfos: {} }); localStorage.removeItem('UserInfosBlog'); navigate('/login') })
            .catch(err => console.log(err))
    }
    const [photoProfile, setPhotoPfrofile] = useState<string>(user)
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (e: boolean) => {
        setOpen(e);
    };
    useEffect(() => {
        const getImg = async () => {
            const response = await fetch(`${serverAddress}/getImg`, {
                method: 'get'
            }).then(async (res) => {
                if (!res.ok) {
                    setPhotoPfrofile(user)
                } else {
                    const { image } = await res.json();
                    const indexFile = (image as string).indexOf('file');
                    setPhotoPfrofile(`Images/${image.slice(indexFile)}`)
                }
            })
                .catch(err => console.log(err))
        }
        getImg()
    }, [])

    return (
        <>
            <AppBar sx={{ position: 'relative', bgcolor: 'whitesmoke', p: '0 15px' }}>
                <Toolbar disableGutters sx={{ display: 'flex', justifyContent: "space-between" }}>
                    <Box display='flex' alignItems='center'>
                        <HouseIcon sx={{ color: 'primary.main', mr: 1 }} />
                        <Typography variant='h6' color='primary' component='a' href='/' sx={{ textDecoration: 'none', letterSpacing: '.2rem', fontWeight: 'bolder' }}>
                            BLOG
                        </Typography>
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {
                            !token && <>
                                {
                                    showLogin &&
                                    <Button
                                        variant='outlined'
                                        color='primary'
                                        startIcon={<LoginIcon />}
                                        sx={{ fontWeight: 'bold' }}
                                        onClick={() => navigate('/Login')}
                                    >
                                        Log in
                                    </Button>
                                }
                                {
                                    showRegister &&
                                    <Button
                                        variant='contained'
                                        startIcon={<PersonAddAltIcon />}
                                        sx={{ bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.main' }, fontWeight: 'bold', ml: 1 }}
                                        onClick={() => navigate('/Signup')}
                                    >
                                        Sign up
                                    </Button>
                                }
                            </>
                        }
                        {
                            token && <>
                                <Typography variant='h6' color='primary'>{UserInfos?.user?.FirstName}</Typography>
                                <Avatar
                                    variant="rounded"
                                    src={photoProfile}
                                    alt='profile_user'
                                    sx={{ ml: 1, cursor: 'pointer' }}
                                    onClick={() => setOpen(true)}
                                />
                                <Button variant='contained' sx={{ marginLeft: '15px', fontWeight: 'bold', bgcolor: 'primary','&:hover': { bgcolor :'primary.main'} }} onClick={handleLogOut}>
                                    logout
                                </Button>
                            </>
                        }

                    </Box>
                    <Drawer />
                </Toolbar>

            </AppBar >
            <DialogImg image={photoProfile} imageUploaded={setPhotoPfrofile} open={open} handleClickOpen={handleClickOpen} />
        </>
    )
}

export default Header