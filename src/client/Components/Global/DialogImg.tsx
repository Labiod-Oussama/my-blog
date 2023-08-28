import React, { useEffect, useRef, useState, useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { AlertProps } from '../Type/Props';
import { serverAddress } from '../Global/Config';
import { useNavigate } from 'react-router-dom';
import UploadIcon from '@mui/icons-material/Upload';
import axios from 'axios';
import Alerte from './Alerte';
import { infoGlobal } from '../../App';

const DialogImg = (props: {
    image: string,
    imageUploaded: (e: string) => void,
    open: boolean,
    handleClickOpen: (e: boolean) => void;
}) => {
    const { infos: { token, UserInfos }, setInfos } = useContext(infoGlobal);
    const navigate = useNavigate()
    const [img, setImg] = useState<string>('');
    useEffect(() => {
        setImg(props.image)
    }, [props.image])
    const [a, seta] = useState<any>();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const onLoadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        if (files && files[0]) {
            const blob = URL.createObjectURL(files[0]);
            setImg(blob);
            seta(files[0])
        }
        event.target.value = '';
    };
    const [alert, setAlert] = useState<AlertProps>({ alerting: { type: '', text: '' }, open: false });

    const handleEdit = () => {
        const formData = new FormData();
        // Append the selected file to the formData
        formData.append("file", a);
        fetch(`${serverAddress}/uploadImg`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: formData
        }).then(async (res) => {
            const { type, message } = await res.json();
            if (!res.ok) {
                setAlert({ alerting: { type: type, text: message }, open: true });
            } else {
                setAlert({ alerting: { type: type, text: message }, open: true });
                props.handleClickOpen(false)
                setTimeout(() => {
                    window.location.reload()
                }, 2000)
            }
        })
            .catch(err => {
                console.error(err);
                // Handle the error here
            });
    }

    return (
        <>
            <Dialog
                open={props.open}
                onClose={() => props.handleClickOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent sx={{ display: 'grid', gap: '10px' }}>
                    <img src={img} alt={img} style={{ width: '100%', objectFit: 'cover' }} />
                    <Button variant='contained' component='label' color='primary' startIcon={<UploadIcon />} sx={{ '&:hover': { bgcolor: "primary.main" }, margin: '0px auto 20px', fontWeight: 'bold', letterSpacing: '2px' }} >
                        Upload photo
                        <input
                            ref={inputRef}
                            type="file"
                            style={{ display: 'none' }}
                            accept="image/*"
                            onChange={onLoadImage}
                        />
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button color='primary' onClick={handleEdit}>Edit</Button>
                </DialogActions>

            </Dialog>
            <Alerte alerting={alert.alerting} open={alert.open} />
        </>
    )
}

export default DialogImg