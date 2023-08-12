import React, { useState, useContext } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { grey } from '@mui/material/colors';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { infoGlobal } from '../../App';

interface TopBarProps {
  title: string;
  username: string;
}

const TopBar: React.FC<TopBarProps> = ({ title, username }) => {
  const navigate = useNavigate();
  const { infos: { token, UserInfos }, setInfos } = useContext(infoGlobal)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleHome = () => {
    navigate('/');
  }
  const handleLogOut = () => {
    fetch('http://localhost:3000/logout', {
      method: 'get'
    }).then(() => { setInfos({ token: undefined, UserInfos: {} }); localStorage.removeItem('UserInfosBlog'); navigate('/login') })
      .catch(err => console.log(err))
  }
  return (
    <AppBar position="static" sx={{ bgcolor: grey[300], color: 'primary.main' }}>
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bolder', letterSpacing: '2px' }}>
          {title}
        </Typography>
        <Box>
          <Button
            id="fade-button"
            variant='contained'
            aria-controls={open ? 'fade-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            endIcon={open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            startIcon={<AccountCircleIcon />}
            sx={{ '&:hover': { bgcolor: 'primary.main' } }}
          >
            {username}
          </Button>
          <Menu
            id="fade-menu"
            MenuListProps={{
              'aria-labelledby': 'fade-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={handleHome}>Home</MenuItem>
            <MenuItem onClick={handleLogOut}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;