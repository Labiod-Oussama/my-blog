import { Button, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React, { useState } from 'react'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useNavigate } from 'react-router-dom';

function Draw() {
    const navigate = useNavigate()
    const [openMenu, setOperMenu] = useState<boolean>(false)

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
                    <ListItemButton sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant='outlined' color='primary' startIcon={<LoginIcon />} sx={{ fontWeight: 'bold' }}>
                            Log in
                        </Button>
                    </ListItemButton>
                    <ListItemButton sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant='contained' startIcon={<PersonAddAltIcon />} sx={{ bgcolor: 'primary.main','&:hover':{bgcolor:'primary.main'}, fontWeight: 'bold' }}>
                            Sign up
                        </Button>
                    </ListItemButton>


                </List>
            </Drawer>
            <IconButton color='primary' sx={{ display: { sm: 'block', md: 'none' }, ml: 'auto', transform: 'scale(1.3)' }} onClick={() => setOperMenu(!openMenu)}>
                <MenuOutlinedIcon />
            </IconButton>
        </>
    )
}

export default Draw