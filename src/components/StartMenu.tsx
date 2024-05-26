import './StartMenu.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


function StartMenu() {
    const navigate = useNavigate();

    const [text, setText] = useState("Click me!");
    const test_server_connection = async function() {
        let response = await axios.get("/message");
        console.log(response);
        let new_text = response.data;
        console.log(new_text);
        setText(new_text);
    }

    return(
        <div className='container'>
            <button onClick={() => navigate('/play')}>
                Play
            </button>
            <button onClick={test_server_connection}>
                {text}
            </button>
        </div>
    );
}

export default StartMenu;