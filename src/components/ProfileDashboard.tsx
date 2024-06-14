import React from "react";
import './ProfileDashboard.css';
import { Avatar, Button, Divider, Drawer, IconButton, List, ListItem, ListItemText, Table, TableBody, TableCell, TableRow, Tooltip, Typography } from '@mui/material';
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

	const handleUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
		if (!e.target.files) return;

		const file = e.target.files[0]
		const config = {headers: {"Authorization": `Bearer ${sessionStorage.accessToken}`}};  // authentication

		axios.postForm("/api/user/upload", { "image": file }, config)
			.then(response => {
				const profile_picture = response.data.profile_picture;
				console.log(`Upload successful: ${profile_picture}`);

				// update profile picture locally
				setProfileData({...profileData, profile_picture: profile_picture});	// setState() is asynchronous, threw me for a loop

				// update profile picture in database
				axios.put("api/user", { data: {profile_picture: profile_picture} }, config)
					.catch(error => console.log("Database update failed!"));
			})
			.catch(error => console.log("Image upload failed!"));
	}

	// initialize values at mount
	React.useEffect(() => {
		const config = {headers: {"Authorization": `Bearer ${sessionStorage.accessToken}`}};  // authentication

		axios.get(`/api/user/profile`, config).then(response => {
			const data = response.data;
			setProfileData(data);

			const games_played: number = data.play_history.length;
			const games_won: number = data.play_history.filter((obj: { victory: boolean }) => obj.victory).length;
			const winrate: number = games_played ? Math.round(100*(games_won / games_played)) : 0;

			setProfileStatistics({games_played, games_won, winrate});
		}).catch((error) => {})
	}, []); // <- This empty array is SUPER important

	// Defines sx for profileData table.
	const tableCellSx = { borderBottom: "none", paddingBottom: 0, paddingTop: 0, width: "50%" }

	return (
		<div>
			{/* Default closed drawer */}
			<Tooltip title="Open Dashboard">
				<Button
					color="inherit"
					onClick={toggleDrawer}
					startIcon={<Avatar alt="" src={profileData.profile_picture}/>}
				>
					<Typography>{profileData.username}</Typography>
				</Button>
			</Tooltip>

			{/* Drawer opened */}
			<Drawer anchor="right" open={isOpen} onClose={toggleDrawer}>

				<List sx={{ paddingLeft: 2}}>
					<ListItem>
						<ListItemText>
							<Typography variant="h4" sx={{ paddingRight: 2}}>Profile Statistics</Typography>
							<Typography variant="h5" sx={{ paddingBottom: 1}}>{ profileData.username }</Typography>
						</ListItemText>
						<IconButton >
							<label htmlFor="image-upload">
								<Avatar sx={{minHeight: "100px", minWidth: "100px" }} alt="" src={profileData.profile_picture} />
							</label>
							<input id="image-upload" type="file" accept="image/*" hidden onChange={handleUpload} />
						</IconButton>
					</ListItem>
				</List>

				<Table>
					<TableBody>
						<TableRow>
							<TableCell sx={ tableCellSx } align="right">Registered:</TableCell>
							<TableCell sx={ tableCellSx } align="left">{new Date(profileData.registered).toLocaleDateString()}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell sx={ tableCellSx } align="right">Games played:</TableCell>
							<TableCell sx={ tableCellSx } align="left">{profileStatistics.games_played}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell sx={ tableCellSx } align="right">Games won:</TableCell>
							<TableCell sx={ tableCellSx } align="left">{`${profileStatistics.games_won} (${profileStatistics.winrate}%)`}</TableCell>
						</TableRow>
					</TableBody>
				</Table>

				<Divider sx={{ padding: 2 }}/>
				<Typography variant="h5" sx={{ padding: 1, alignSelf: "center" }}>Previous Games</Typography>
				<DataGrid
					rows={profileData.play_history}
					columns={columns}
					density="compact"
					autosizeOnMount
					hideFooterSelectedRowCount
					sx={{ paddingLeft: 2, paddingRight: 2 }}
				/>

			</Drawer>
		</div>
	);
}

export default ProfileDashboard;
