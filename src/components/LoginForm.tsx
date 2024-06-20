import axios from 'axios';
import { Box, Button, Typography } from '@mui/material';
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { type Login } from '../server/prisma/model.types';
import Popup from './Popup'


function LoginForm( { action } : {action: "login" | "register" }) {
    const navigate = useNavigate();

    const boxRef = useRef<HTMLElement>();
    const [popupOpen, setPopupOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState("No message");
0

    const { handleSubmit, register, reset } = useForm<Login>();

    const onSubmit = async (data: Login) => {
        axios.post(`/api/user/${action}`, {...data}).then(response => {
            // If login|register successful, store token and redirect to /home.
            sessionStorage.setItem("accessToken", response.data.accessToken);
            navigate("/home");
        }).catch((error) => {
            // Otherwise display response.data.message
            if (error.response) {
                console.log(error.response.data.message);
                setPopupOpen(true);
                setPopupMessage(error.response.data.message);
            }
        })
    };

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
                    <label>Username</label>
                    <input {...register("username")} type="text" name="username" autoFocus />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-around', gap: 5 }} >
                    <label>Password</label>
                    <input {...register("password")} type="text" name="password" />
                </Box>

                <Box sx={{ height: "22%", display: 'flex', flexDirection: 'column', paddingRight: 1, paddingLeft: 1, gap: 0 }}>
                    <button type="submit">{action.toLocaleUpperCase()}</button>
                    <Button 
                        size='small' 
                        onClick={() => navigate("/register")}
                        sx={{ color: "#adaca6", alignSelf: 'end', paddingRight: 2, paddingTop: 0, fontSize: 12 }}>
                        {action === 'login' ? "register instead" : ""}
                    </Button>
                </Box>
            </Box>
            <Popup boxRef={boxRef} open={popupOpen} message={popupMessage}/>
        </form>
    );
}

export default LoginForm;
