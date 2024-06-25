import axios from "axios";
import { Avatar, Button, Divider, Drawer, List, ListItem, ListItemText, Tooltip, Typography } from '@mui/material';
import React from "react";

import LogoutButton from "../Authentication/LogoutButton";
import ProfileGameHistory from "./ProfileGameHistory";
import ProfileStatisticsTable from "./ProfileStatisticsTable";
import UploadIcon from "./UploadIcon";


type PlayHistory = {
    id: number, 
    timestamp: string, 
    opponent: string, 
    victory: boolean
};

type ProfileData = {
    username: string;
    registered: string;
    profile_picture: string;
    play_history: PlayHistory[]
};

type ProfileStatistics = {
	games_played: number,
	games_won: number,
	winrate: number
}

function ProfileDashboard() {
	const [isOpen, setIsOpen] = React.useState(false);

	const [profileData, setProfileData] = React.useState<ProfileData>({
		username: "",
		registered: "",
		profile_picture: "",
		play_history: [{id: 0, timestamp: "-", opponent: "-", victory: false}]
	});

	const [profileStatistics, setProfileStatistics] = React.useState<ProfileStatistics>({
		games_played: 0,
		games_won: 0,
		winrate: 0.0,
	});

	const toggleDrawer = (): void => {
		setIsOpen(!isOpen);
	};

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
		}).catch(() => {})
	}, [isOpen]);
	
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
							<Typography variant="h4" sx={{ paddingRight: 2}}> Profile Statistics </Typography>
							<Typography variant="h5" sx={{ paddingBottom: 1}}>{ profileData.username }</Typography>
						</ListItemText>
						<UploadIcon profileData={profileData} setProfileData={setProfileData}/>
					</ListItem>
				</List>
		
				<ProfileStatisticsTable profileData={profileData} profileStatistics={profileStatistics} />

				<Divider sx={{ padding: 2 }}/>

				<Typography variant="h5" sx={{ padding: 1, alignSelf: "center" }}> Previous Games </Typography>
				<ProfileGameHistory profileData={profileData} />

				<LogoutButton/>
			</Drawer>
		</div>
	);
}

export default ProfileDashboard;
export type { PlayHistory, ProfileData, ProfileStatistics };
