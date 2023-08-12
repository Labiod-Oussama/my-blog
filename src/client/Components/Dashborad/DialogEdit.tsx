import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { TextField } from '@mui/material';
import { valuesEdit } from '../Type/Props';
import { serverAddress } from '../Global/Config';
import { useNavigate } from 'react-router-dom';

type SetValuesFunction = (updatedValues: {
    _id: string,
    Title: string;
    Image: string;
    Description: string;
}) => void;
export default function DialogEdit(props: {
    values: valuesEdit,
    setValues: SetValuesFunction,
    setBlogs: any,
    setAlert: any,
    open: boolean,
    handleClickOpen: (e: boolean) => void;
}) {
    const navigate = useNavigate()
    const { _id, Title, Image, Description } = props.values
    const handleEdit = (id: string) => {
        if (Image && Title && Description) {
            fetch(`${serverAddress}/EditBlog/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Title,
                    Image,
                    Description
                })
            }).then(res => res.json())
                .then(data => {
                    const { type, message } = data;
                    props.setAlert({ alerting: { type, text: message }, open: true })
                    props.handleClickOpen(false)
                }).then(() => setTimeout(() => {
                    location.reload()
                }, 1500))
                .catch(err => console.log(err))
        }
    }
    return (
        <div>

            <Dialog
                open={props.open}
                onClose={() => props.handleClickOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <TextField
                        label='Title'
                        variant='outlined'
                        color='primary'
                        type='text'
                        fullWidth
                        value={Title}
                        onChange={(e) => props.setValues({ ...props.values, Title: e.target.value })}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label='Image'
                        variant='outlined'
                        color='primary'
                        type='text'
                        fullWidth
                        value={Image}
                        onChange={(e) => props.setValues({ ...props.values, Image: e.target.value })}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label='Description'
                        variant='outlined'
                        color='primary'
                        type='text'
                        fullWidth
                        multiline
                        rows={4}
                        value={Description}
                        onChange={(e) => props.setValues({ ...props.values, Description: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color='primary' onClick={() => handleEdit(_id)}>Edit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}