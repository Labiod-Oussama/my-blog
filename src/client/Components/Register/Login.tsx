import React, { useState, useEffect, useContext } from 'react'
import Header from '../Global/Header'
import { Button, Paper, Box, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { infoGlobal } from '../../App'
import { serverAddress } from '../Global/Config'

const Login = () => {
    const { infos, setInfos } = useContext(infoGlobal)
    const [Email, setEmail] = useState<string>('')
    const [Password, setPassword] = useState<any>('')
    const [emptyEmail, setEmptyEmail] = useState<boolean>(false)
    const [emptyPassword, setEmptyPassword] = useState<boolean>(false)
    const [errorLogin, setErrorLogin] = useState<string>('');
    const navigate = useNavigate();
    const handleLogin = () => {
        if (!Email) {
            setEmptyEmail(true)
        }
        if (!Password) {
            setEmptyPassword(true)
        }
        if (Email && Password) {
            setEmptyEmail(false)
            setEmptyPassword(false)
            fetch('http://localhost:3000/login', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    Email,
                    Password
                })
            }).then(res => res.json())
                .then(data => {
                    const { success, ...rest } = data
                    if (success) {
                        localStorage.setItem('UserInfosBlog', JSON.stringify({ ...rest }));
                        setInfos({ token: rest.token, UserInfos: JSON.parse(localStorage.getItem('UserInfosBlog') || '') });
                        fetch(`${serverAddress}/Dashboad`, {
                            method: 'GET'
                        }).then(res => res.json()).then(data => {
                            const { admin } = data
                            if (admin) {
                                navigate('/admin/dashborad');
                            }
                            else {
                                navigate('/');
                            }
                        })
                    } else {
                        setErrorLogin(rest.message)
                    }
                }).catch(err => console.log(err)
                )
        }
    }
    useEffect(() => {
        if (Email) {
            setEmptyEmail(false)
        }
        if (Password) {
            setEmptyPassword(false)
        }
    }, [Email, Password])
    return (
        <>
            <Header />
            <Box sx={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Paper elevation={3} sx={{ width: { xs: '90%', md: '70%', lg: '50%' }, display: 'flex', flexDirection: 'column', p: 1, mt: 5 }}>
                    <Typography variant='h4' style={{ marginBottom: '40px', textAlign: 'center' }}>Login</Typography>
                    <TextField
                        name='Email'
                        label='Email'
                        type="text"
                        variant="outlined"
                        fullWidth
                        value={Email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        error={emptyEmail}
                        style={{ marginBottom: '15px' }}
                    />
                    <TextField
                        name='Password'
                        label='Password'
                        type="text"
                        variant="outlined"
                        fullWidth
                        value={Password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        error={emptyPassword}
                        helperText={errorLogin}
                        style={{ marginBottom: '5px' }}
                    />
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={handleLogin}
                        sx={{ '&:hover': { bgcolor: 'primary.main' } }}
                    >Login</Button>

                </Paper>
            </Box>
        </>
    )
}

export default Login