import React from "react";
import './ProfileDrawer.css';
import { Avatar, Button, Divider, Drawer, FormControlLabel, FormGroup, Switch, Tooltip } from '@mui/material';

function ProfileDrawer() {
  const username: string = "IchChefDuNixx";

  const [isOpen, setIsOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  const toggleDrawer = (): void => {
    setIsOpen(!isOpen);
  }

  const handleChange = (): void => {
    setChecked(!checked);
  }

  return (
    <div>
      {/* Regular scenario */}
      <Tooltip title="Open Dashboard">
        <Button
          color="inherit"
          onClick={toggleDrawer}
          startIcon={<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />}
        >
          {username}
        </Button>
      </Tooltip>

      {/* Drawer opened */}
      <Drawer anchor="right" open={isOpen} onClose={toggleDrawer}>
        <div>
          Dashboard
        </div>
        <Divider/>
        <FormGroup>
          <FormControlLabel
            control={<Switch
                checked={checked}
                onChange={handleChange}
              />}
            label="test"
          />
        </FormGroup>
        <Divider/>
          more stats
      </Drawer>
    </div>
  );
}

export default ProfileDrawer;