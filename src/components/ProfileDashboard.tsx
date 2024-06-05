import React from "react";
import './ProfileDashboard.css';
import { Avatar, Button, Divider, Drawer, List, ListItem, ListItemText, Tooltip, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from "axios";

const columns: GridColDef[] = [
  { field: 'timestamp', headerName: 'Timestamp', type: "string",
    valueGetter: (value: string): Date => new Date(value),
    valueFormatter: (value: Date) => value.toLocaleString()
  },
  { field: 'opponent', headerName: 'Opponent', type: "string"},
  { field: 'victory', headerName: 'Victory', type: "boolean"},
];

function ProfileDashboard() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [profileData, setProfileData] = React.useState({
    username: "",
    registered: "",
    profile_picture: "",
    play_history: [{id: 0, timestamp: "-", opponent: "-", victory: false}]
  });
  const [profileStatistics, setProfileStatistics] = React.useState({
    games_played: 0,
    games_won: 0,
    winrate: 0.0,
  });

  const toggleDrawer = (): void => {
    setIsOpen(!isOpen);
  };

  // initialize values at mount
  // TODO: Make User dynamic, maybe get as prop from parent
  const username = "Ananas";

  React.useEffect(() => {
    axios.get(`/api/user/${username}/profile`).then(response => {
      const data = response.data;
      setProfileData(data);

      const games_played: number = data.play_history.length;
      const games_won: number = data.play_history.filter((obj: { victory: boolean }) => obj.victory).length;
      const winrate: number = Math.round(100*(games_won / games_played));
      setProfileStatistics({games_played, games_won, winrate});
    });
  }, []); // <- This empty array is SUPER important

  return (
    <div>
      {/* Default closed drawer */}
      <Tooltip title="Open Dashboard">
        <Button
          color="inherit"
          onClick={toggleDrawer}
          startIcon={<Avatar alt="" src={profileData.profile_picture} />}
        >
          <Typography>{profileData.username}</Typography>
        </Button>
      </Tooltip>

      {/* Drawer opened */}
      <Drawer anchor="right" open={isOpen} onClose={toggleDrawer}>
        <Typography variant="h5" sx={{ pl: 1, pt: 1 }}>Profile Statistics ({profileData.username})</Typography>
        <List>
          <ListItem disablePadding>
            <ListItemText inset primary={
              "Registered: " + new Date(profileData.registered).toLocaleDateString()
            }/>
          </ListItem>
          <ListItem disablePadding>
            <ListItemText inset primary={
              "Games played: " + profileStatistics.games_played
            }/>
          </ListItem>
          <ListItem disablePadding>
            <ListItemText inset primary={
              `Games won: ${profileStatistics.games_won} (${profileStatistics.winrate}%)`
            }/>
          </ListItem>
        </List>
        <Divider sx={{padding:1}}/>
        <Typography variant="h5" sx={{ padding: 1 }}>Previous Games</Typography>
        <DataGrid
          rows={profileData.play_history}
          columns={columns}
          density="compact"
          autosizeOnMount
          hideFooterSelectedRowCount
        />
      </Drawer>
    </div>
  );
}

export default ProfileDashboard;
