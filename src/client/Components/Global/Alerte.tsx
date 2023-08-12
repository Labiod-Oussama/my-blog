import React, { forwardRef, useEffect, useState } from 'react'
import MuiAlert from '@mui/material/Alert';
import { Grow, Snackbar } from '@mui/material'
import { AlertProps, SnackbarProps } from '../Type/Props';
import { useNavigate } from 'react-router-dom';
const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} sx={{ cursor: 'pointer' }} />;
});
const Alerte = (props: AlertProps) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState<boolean>(false);
    useEffect(() => {
        setOpen(props.open)
    }, [props.open])
    const handleClose: SnackbarProps['onClose'] = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false)
    };
    const [SnackbarShow, setSnackbarShow] = useState<SnackbarProps>({
        vertical: 'top',
        horizontal: 'center',
    })
    const { vertical, horizontal } = SnackbarShow;
    function GrowTransition(props: any) {
        return <Grow {...props} />;
    }
    return (
        <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            transitionDuration={1000}
            autoHideDuration={3000}
            onClose={handleClose}
            TransitionComponent={GrowTransition}
            key={vertical + horizontal}
        >

            <Alert
                onClose={handleClose}
                severity={props.alerting.type}
                onClick={() => { (props.alerting.type == 'error' && props.alerting.text.includes('log')) && navigate('/login') }}

            >
                {props.alerting.text}
            </Alert>
        </Snackbar>
    )
}

export default Alerte