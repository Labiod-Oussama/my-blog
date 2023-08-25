import { Box, Button, InputAdornment, Link, Paper, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ErrorMessage, Form, Formik, FormikValues } from 'formik';
import * as Yup from 'yup';
import React, { useState, useContext } from 'react';
import Header from '../Global/Header';
import signup from '../../assets/signup.svg';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { infoGlobal } from '../../App';
import { serverAddress } from '../Global/Config';

interface SignupFormValues {
    FirstName: string;
    LastName: string;
    Email: string;
    Password: string;
}

function Signup() {
    const { infos, setInfos } = useContext(infoGlobal);
    const [visibilityPassword, setVisibilityPassword] = useState(true);
    const initialValues: SignupFormValues = {
        FirstName: '',
        LastName: '',
        Email: '',
        Password: ''
    };

    const validationSchema = Yup.object().shape({
        FirstName: Yup.string()
            .min(2, 'FirstName is too short')
            .required('FirstName is required'),
        LastName: Yup.string()
            .min(2, 'LastName is too short')
            .required('LastName is required'),
        Email: Yup.string()
            .email('Invalid Email')
            .required('Email is required'),
        Password: Yup.string()
            .min(8, 'Password must be at least 8 characters long')
            .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .required('Password is required')
    });
    const theme = useTheme();
    const fontFamily = theme.typography.fontFamily || ''
    const isMatchedTablette = useMediaQuery(theme.breakpoints.down('md'));
    const isMatchedPhone = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const handleSubmit = async (values: SignupFormValues, { setSubmitting }: FormikValues) => {
        setSubmitting(false);
        await axios.post(`${serverAddress}/signup`, values)
            .then(res => res.data)
            .then(data => {
                const { success, ...rest } = data
                if (success) {
                    localStorage.setItem('UserInfosBlog', JSON.stringify({ ...rest }));
                    setInfos({ token: rest.token, UserInfos: JSON.parse(localStorage.getItem('UserInfosBlog') || '') })
                    navigate('/');
                }
            })
    };
    return (
        <Box>
            <Header />
            <Box sx={{ display: 'flex', marginInline: { xs: 2, md: 3 }, mt: 5 }}>
                <Box sx={{ flex: isMatchedTablette ? 1 : 0.8 }}>
                    <Typography variant='h5' color='primary' mb={3} fontWeight='bold' fontFamily={fontFamily.split(',')[1]}>
                        Sign up now – it's free and only takes 2 minutes!
                    </Typography>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ values, handleChange, handleBlur, touched, errors, isSubmitting }) => (
                            <Form style={{ display: 'grid' }}>
                                <TextField
                                    name='FirstName'
                                    label='FirstName'
                                    type="text"
                                    variant="filled"
                                    value={values.FirstName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={<ErrorMessage name="FirstName" />}
                                    error={touched.FirstName && Boolean(errors.FirstName)}
                                    style={{ marginBottom: '10px' }}
                                />
                                <TextField
                                    name='LastName'
                                    label='LastName'
                                    type="text"
                                    variant="filled"
                                    value={values.LastName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={<ErrorMessage name="LastName" />}
                                    error={touched.LastName && Boolean(errors.LastName)}
                                    style={{ marginBottom: '10px' }}
                                />
                                <TextField
                                    name='Email'
                                    label='Email'
                                    type="text"
                                    variant="filled"
                                    value={values.Email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={<ErrorMessage name="Email" />}
                                    error={touched.Email && Boolean(errors.Email)}
                                    style={{ marginBottom: '10px' }}
                                />
                                <TextField
                                    name='Password'
                                    label='Password'
                                    type={visibilityPassword ? 'password' : 'text'}
                                    variant="filled"
                                    value={values.Password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={<ErrorMessage name="Password" />}
                                    error={touched.Password && Boolean(errors.Password)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                {visibilityPassword ? (
                                                    <VisibilityOffOutlinedIcon onClick={() => setVisibilityPassword(false)} sx={{ color: 'black', cursor: 'pointer' }} />
                                                ) : (
                                                    <VisibilityOutlinedIcon onClick={() => setVisibilityPassword(true)} sx={{ color: 'black', cursor: 'pointer' }} />
                                                )}
                                            </InputAdornment>
                                        )
                                    }}
                                    style={{ marginBottom: '20px' }}
                                />
                                <Typography variant='body1' mb={2} fontWeight={500}>
                                    I accept Stockili's <Link underline='hover' sx={{ color: 'primary.dark', cursor: 'pointer' }}>GTC</Link> and acknowledge the <Link underline='hover' sx={{ color: 'primary.dark', cursor: 'pointer' }}>Privacy Policy</Link>.
                                </Typography>
                                <Button type="submit" variant='contained' color='primary' disabled={isSubmitting} sx={{ fontWeight: 'bold', letterSpacing: '2px' }}>
                                    Sign up
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Box>
                {!isMatchedTablette && (
                    <Box sx={{ flex: 1.2, display: 'flex', justifyContent: 'center' }}>
                        <img src={signup} alt="signup" width='70%' height='70%' />
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default Signup;