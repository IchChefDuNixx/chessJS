import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import axios from 'axios';
import { CreateGame } from '../../server/prisma/model.types';
  

// I didn't find a nice way to check if the response data is empty...
function isEmpty(obj: Record<string, unknown>): boolean {
    for (const property in obj) {
      return false;
    }
    return true;
}
  
function GameForm() {
    const navigate = useNavigate();

    const { handleSubmit, register, reset } = useForm<CreateGame>();

    const onSubmit = async (data: CreateGame) => {
        let response = await axios.post("/api/games", data);
        console.log(response.data);
        if(!isEmpty(response.data)){
            navigate("/home");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', gap: 5 , flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between',  gap: 5}} >
                    <label>ID Player 1</label>
                    <input {...register("player1Id")} type="number" name="player1Id"/>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 5}} >
                    <label>ID Player 2</label>
                    <input {...register("player2Id")} type="number" name="player2Id"/>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 5}} >
                    <label>ID Winner</label>
                    <input {...register("winnerID")} type="number" name="winnerID"/>
                </Box>

                <button type="submit">Submit</button>
            </Box>
        </form>
        
    );
}

export default GameForm;