import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import axios from 'axios';
import { Login } from '../server/prisma/model.types';
  

function LoginForm() {
    const navigate = useNavigate();

    const { handleSubmit, register, reset } = useForm<Login>();

    const onSubmit = async (data: Login) => {
        axios.post("/api/user/login", {...data}).then(response => {
            // If login successful, store token and redirect to /home.
            sessionStorage.setItem("accessToken", response.data.accessToken);
            navigate("/home");
        }).catch((error) => {
            // Otherwise display response.data.message
            // TODO
        })
    };

    // TODO: Make form nice, this was just to get it working.
    // TODO: Add register button.
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', gap: 5 , flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between',  gap: 5}} >
                    <label >Username</label>
                    <input {...register("username")} type="text" name="username"/>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 5}} >
                    <label>Password</label>
                    <input {...register("password")} type="text" name="password"/>
                </Box>

                <button type="submit">Submit</button>
            </Box>
        </form>
    );
}

export default LoginForm;