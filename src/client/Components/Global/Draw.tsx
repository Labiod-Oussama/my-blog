import { Avatar, Button, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React, { useState, useEffect, useContext } from 'react'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useNavigate } from 'react-router-dom';
import { infoGlobal } from '../../App';
import { serverAddress } from './Config';

function Draw() {
    const navigate = useNavigate()
    const [openMenu, setOperMenu] = useState<boolean>(false)
    const { infos: { token, UserInfos }, setInfos } = useContext(infoGlobal)
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
        fetch(`${serverAddress}/logout`, {
            method: 'get'
        }).then(() => {
            setInfos({ token: undefined, UserInfos: {} }); localStorage.removeItem('UserInfosBlog'); document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; navigate('/login')
        })
            .catch(err => console.log(err))
    }
    return (
        <>
            <Drawer
                anchor='top'
                PaperProps={{ sx: { width: "100%", overflow: 'hidden' } }}
                transitionDuration={400}
                open={openMenu}
                onClose={() => setOperMenu(false)}
            >

                <List>
                    {
                        !token && <>
                            {
                                showLogin &&
                                <ListItemButton sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button variant='outlined' color='primary' href='/login' startIcon={<LoginIcon />} sx={{ fontWeight: 'bold' }}>
                                        Log in
                                    </Button>
                                </ListItemButton>
                            }
                            {
                                showRegister && <ListItemButton sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button variant='contained' href='/signup' startIcon={<PersonAddAltIcon />} sx={{ bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.main' }, fontWeight: 'bold' }}>
                                        Sign up
                                    </Button>
                                </ListItemButton>
                            }
                        </>
                    }
                    {
                        token && <>
                            <Button variant='contained' sx={{ margin: '0 auto', fontWeight: 'bold', bgcolor: 'primary', '&:hover': { bgcolor: 'primary.main' } }} onClick={handleLogOut}>
                                logout
                            </Button>
                        </>
                    }

                </List>
            </Drawer>
            <IconButton color='primary' sx={{ display: { sm: 'block', md: 'none' }, ml: 'auto', transform: 'scale(1.3)' }} onClick={() => setOperMenu(!openMenu)}>
                <MenuOutlinedIcon />
            </IconButton>
        </>
    )
}

export default Draw