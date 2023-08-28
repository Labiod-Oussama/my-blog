import React, { useState, useEffect, useContext } from 'react'
import SideBar from './SideBar'
import { Box, Container, TextField, Paper, Button } from '@mui/material'
import { ErrorMessage, Form, Formik, FormikValues } from 'formik';
import * as Yup from 'yup';
import TopBar from './TopBar'
import { AlertProps, SignupFormValues, propsBlogs } from '../Type/Props'
import { serverAddress } from '../Global/Config';
import Alerte from '../Global/Alerte';
import { useNavigate } from 'react-router-dom';
import { infoGlobal } from '../../App';
const CreateBlog = () => {
    const { infos: { token, UserInfos }, setInfos } = useContext(infoGlobal)
    const navigate = useNavigate()
    useEffect(() => {
        fetch(`${serverAddress}/Dashboad`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        }).then(res => res.json()).then(data => {
            const { admin } = data
            if (!admin) {
                navigate('/');
            }
        })
    }, [])

    const [blog, setBlog] = useState<propsBlogs>({} as propsBlogs)
    const [alert, setAlert] = useState<AlertProps>({ alerting: { type: '', text: '' }, open: false });
    const initialValues: SignupFormValues = {
        Title: '',
        Image: '',
        Description: '',
    };

    const validationSchema = Yup.object().shape({
        Title: Yup.string()
            .min(2, 'Title is too short')
            .required('Title is required'),
        Image: Yup.string()
            .required('Image url is required')
            .url(),
        Description: Yup.string()
            .min(10, 'Description is too short')
            .required('Description is required'),
    });
    const handleSubmit = async (values: SignupFormValues, { setSubmitting }: FormikValues) => {
        setSubmitting(false);
        fetch(`${serverAddress}/create`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({
                Title: values.Title,
                Image: values.Image,
                Description: values.Description
            })
        }).then(res => res.json())
            .then(data => {
                const { type, message } = data;
                setAlert({ alerting: { type, text: message }, open: true })
            })
            .catch(err => console.log(err))
    };
    return (
        <Box sx={{ display: 'flex' }}>
            <SideBar current='Create blog' />
            <Box sx={{ width: '100%', height: '100vh' }}>
                <TopBar title='Dashboard' username={UserInfos.user.FirstName} />
                <Container sx={{ mt: 5 }}>
                    <Paper elevation={2} sx={{ p: 2 }}>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ values, handleChange, handleBlur, touched, errors, isSubmitting }) => (
                                <Form style={{ display: 'grid' }}>
                                    <TextField
                                        name='Title'
                                        label='Title'
                                        type="text"
                                        variant="filled"
                                        value={values.Title}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        helperText={<ErrorMessage name="Title" />}
                                        error={touched.Title && Boolean(errors.Title)}
                                        style={{ marginBottom: '10px' }}
                                    />
                                    <TextField
                                        name='Image'
                                        label='Image'
                                        type="text"
                                        variant="filled"
                                        value={values.Image}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        helperText={<ErrorMessage name="Image" />}
                                        error={touched.Image && Boolean(errors.Image)}
                                        style={{ marginBottom: '10px' }}
                                    />
                                    <TextField
                                        name='Description'
                                        label='Description'
                                        type="text"
                                        variant="filled"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        value={values.Description}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        helperText={<ErrorMessage name="Description" />}
                                        error={touched.Description && Boolean(errors.Description)}
                                        style={{ marginBottom: '10px' }}
                                    />
                                    <Button type="submit" variant='contained' color='primary' disabled={isSubmitting} sx={{ '&:hover': { bgcolor: 'primary.main' }, display: 'block', marginLeft: 'auto', fontWeight: 'bold' }}>
                                        Create
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </Paper>
                </Container>
            </Box>
            <Alerte alerting={alert.alerting} open={alert.open} />
        </Box>
    )
}

export default CreateBlog