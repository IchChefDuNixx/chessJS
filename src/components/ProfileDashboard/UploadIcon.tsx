import axios from "axios";
import { Avatar, IconButton, Tooltip} from '@mui/material';
import React, { useContext } from "react";

import { SettingsContext } from "../App/App";
import { checkLogin } from "../Authentication/LoginGuard"
import { ProfileData } from "./ProfileDashboard";


interface Props {
    profileData: ProfileData,
    setProfileData: (value: React.SetStateAction<ProfileData>) => void
}

function UploadIcon( { profileData, setProfileData } : Props) {
    const { settings } = useContext(SettingsContext);
    
	const confirmLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		const loggedIn = await checkLogin()
		if (!loggedIn) {
			console.log("not logged in");
			e.preventDefault()	// prevent opening upload window
		} else {
			console.log("logged in")
		}
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
					.catch(() => console.log("Database update failed!"));
			})
			.catch(() => console.log("Image upload failed!"));
	};

    return(
		<Tooltip title={settings?.showTooltips ? "Upload Profile Picture" : ""}>
			<IconButton onClick={confirmLogin} >
				<label htmlFor="image-upload">
					<Avatar sx={{minHeight: "100px", minWidth: "100px" }} alt="" src={profileData.profile_picture} />
				</label>
				<input id="image-upload" type="file" accept="image/*" hidden onChange={handleUpload} />
			</IconButton>
		</Tooltip>
    );
}

export default UploadIcon;
