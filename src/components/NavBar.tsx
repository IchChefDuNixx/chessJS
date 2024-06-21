import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import ProfileDrawer from './ProfileDashboard/ProfileDashboard';
import './NavBar.css';


interface NavBarProps {
  hideProfileDashboard?: boolean;
}

// see https://mui.com/material-ui/react-app-bar/#app-bar-with-responsive-menu
function NavBar({ hideProfileDashboard = false}: NavBarProps) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (): void => {
    setAnchorElNav(null);
  };

  return (
    <div>
      <AppBar sx={{ bgcolor: "#216f7d" }}position="fixed">
        <Toolbar className='toolbar'>

          {/* Default Toolbar/Buttons for wide enough windows */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button key="Home" onClick={() => navigate("/home")} color='inherit'>
              <Typography>Home</Typography>
            </Button>
            <Button key="Settings" onClick={() => navigate("/settings")} color='inherit'>
              <Typography>Settings</Typography>
            </Button>
            <Button key="Login" onClick={() => navigate("/login")} color='inherit'>
              <Typography>Login</Typography>
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
              <MenuItem key="Home" onClick={() => navigate("/home")}>
                <Typography>Home</Typography>
              </MenuItem>
              <MenuItem key="Settings" onClick={() => navigate("/setting")}>
                <Typography>Settings</Typography>
              </MenuItem>
            </Menu>
          </Box>

          {/* Moved profile-related stuff to new component */}
          {/* Render based on hideProfileDashboard */}
          {!hideProfileDashboard && <ProfileDrawer />}

        </Toolbar>
      </AppBar>
      {/* the toolbar element below creates an empty space between the real toolbar and board */}
      <Toolbar /> 
    </div>
  );
}

export default NavBar;
