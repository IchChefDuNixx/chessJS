import React from 'react';
import { AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

import ProfileDrawer from './ProfileDrawer';
import './NavBar.css';

// see https://mui.com/material-ui/react-app-bar/#app-bar-with-responsive-menu
function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (): void => {
    setAnchorElNav(null);
  };

  const handleClickHome = (): void => {
    navigate('/');
  }

  const handleClickSettings = (): void => {
    navigate("/settings");
  }

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>

          {/* Default Toolbar/Buttons for wide enough windows */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button key="Home" onClick={handleClickHome} color='inherit'>
              Home
            </Button>
            <Button key="Settings" onClick={handleClickSettings} color='inherit'>
              Settings
            </Button>
          </Box>

          {/* Collapsed Menu, visible in narrow windows */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="navbar-menu-button"
              anchorEl={anchorElNav}
              keepMounted
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              <MenuItem key="Home" onClick={handleClickHome}>
                <Typography>Home</Typography>
              </MenuItem>
              <MenuItem key="Settings" onClick={handleClickSettings}>
                <Typography>Settings</Typography>
              </MenuItem>
            </Menu>
          </Box>

          {/* Moved profile related stuff to new component */}
          <ProfileDrawer />

        </Toolbar>
      </AppBar>
      {/* the toolbar element below creates an empty space between the real toolbar and board */}
      <Toolbar /> 
    </div>
  );
}

export default NavBar;