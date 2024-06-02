import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import axios from 'axios';
import { CreateUser } from '../../server/prisma/model.types';
  

// I didn't find a nice way to check if the response data is empty...
function isEmpty(obj: Record<string, unknown>): boolean {
    for (const property in obj) {
      return false;
    }
    return true;
}
  
function UserForm() {
    const navigate = useNavigate();

    const { handleSubmit, register, reset } = useForm<CreateUser>();

    const onSubmit = async (data: CreateUser) => {
        let response = await axios.post("/api/user", data);
        console.log(response.data);
        if(!isEmpty(response.data)){
            navigate("/home");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', gap: 5 , flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between',  gap: 5}} >
                    <label>Username</label>
                    <input {...register("username")} type="text" name="username"/>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 5}} >
                    <label>Profile Picture</label>
                    <input {...register("profile_picture")} type="text" name="profile_picture"/>
                </Box>

                <button type="submit">Submit</button>
            </Box>
        </form>
        
    );
}

export default UserForm;