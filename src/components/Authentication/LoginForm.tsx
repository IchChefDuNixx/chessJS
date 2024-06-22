import axios from 'axios';
import { Box, Button } from '@mui/material';
import { useRef, useState, useContext } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';

import { SettingsContext, Settings } from '../App/App';
import Popup from '../App/Popup'

import { UserSettings, Login } from '../../server/prisma/model.types';


interface Props {
    action: "login" | "register"
}

function convertSettingsFormat(settings: UserSettings): Settings {
    return {
      showTooltips: settings.showTooltips,
      darkMode: settings.darkMode,
      gender: [settings.gender_min, settings.gender_max],
      human: settings.human
    }
  }

function LoginForm( { action } : Props) {
    const navigate = useNavigate();
    const location = useLocation();

    const {settings, setSettings} = useContext(SettingsContext);

    const boxRef = useRef<HTMLElement>();
    const [popupOpen, setPopupOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState("No message");

    const { handleSubmit, register, reset } = useForm<Login>();

    const onSubmit = async (data: Login) => {
        axios.post(`/api/user/${action}`, {...data}).then(async response => {
            // Login or register was successful

            // Store token and username
            sessionStorage.setItem("accessToken", response.data.accessToken);
            sessionStorage.setItem("username", data.username);

            // Put user settings into app context
            if (settings && setSettings){
                const config = {headers: {"Authorization": `Bearer ${sessionStorage.accessToken}`}};  // authentication
                await axios.get('/api/user/settings', config)
                    .then((response) => {
                        const userSettings =  response.data;
                        setSettings(convertSettingsFormat(userSettings));
                    })
                    .catch(() => {
                        console.log("Something went wrong fetching user settings");
                    });
            }
            // Navigate to previous page
            location.pathname === `/${action}` ? navigate(-1) : navigate(0);   // else case comes from using loginGuard

        }).catch((error) => {
            // Otherwise display response.data.message
            if (error.response) {
                setPopupOpen(true);
                setPopupMessage(error.response.data.message);
            }
        })
    };

    const toggleLoginRegister = (): void => {
        if (action === "login") {
            navigate("/register", {replace: true});
        } else {
            navigate("/login", {replace: true});
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <Box
                ref={ boxRef }
                sx={{
                    display: 'flex',
                    gap: 5,
                    // padding: 1,
                    flexDirection: 'column',
                    backgroundColor: '#216f7d',
                    borderRadius: '10px', // Adjust the radius as needed
                    margin: 5, // Adjust the margin as needed
                    height: '250px',
                    justifyContent: 'center',
                    width: '350px',
                }}>

                <Box sx={{ display: 'flex', justifyContent: 'space-around', gap: 5 }} >
                    <label> Username </label>
                    <input {...register("username")} type="text" name="username" autoFocus={sessionStorage.username ? false : true} defaultValue={sessionStorage.username} />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-around', gap: 5 }} >
                    <label> Password </label>
                    <input {...register("password")} type="password" name="password" autoFocus={sessionStorage.username ? true : false}/>
                </Box>

                <Box sx={{ height: "22%", display: 'flex', flexDirection: 'column', paddingRight: 1, paddingLeft: 1, gap: 0 }}>
                    <button type="submit">{action.toLocaleUpperCase()}</button>
                    <Button
                        size='small'
                        onClick={ toggleLoginRegister }
                        sx={{ color: "#adaca6", alignSelf: 'end', paddingRight: 2, paddingTop: 0, fontSize: 12 }}>
                        {action === 'login' ? "register instead" : "back to login"}
                    </Button>
                </Box>
            </Box>
            <Popup boxRef={boxRef} open={popupOpen} message={popupMessage}/>
        </form>
    );
}

export default LoginForm;
