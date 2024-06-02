/*import './StartMenu.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


function StartMenu() {
    const navigate = useNavigate();

    const [text, setText] = useState("Click me!");
    const test_server_connection = async function() {
        let response = await axios.get("/api/hello");
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
            <button onClick={() => navigate('/user/new')}>
                Create new User
            </button>      
            <button onClick={() => navigate('/game/new')}>
                Create new Game
            </button>  
        </div>
    );
}

export default StartMenu;*/


import './StartMenu2.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LottieView from 'lottie-react';
/*import animationBoard from '../assets/Animation-board.json'*/
import animationKnight from '../assets/Animation-knight.json'
import animationRook from '../assets/Animation - Rook.json'







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

    {/*return (
        <div className='container'>
            <div className='left-column'>
                <div className='card'>
                    <h1 className='title'>Super Duper Nice Chess</h1>
                    <button onClick={() => navigate('/play')}>
                        Play Local Game
                    </button>
                    <button onClick={() => navigate('/online')}>
                        Play Online Game
                    </button>
                    <button onClick={() => navigate('/login')}>
                        Login
                    </button>
                    <button onClick={test_server_connection}>
                        {text}
                    </button>
                </div>
            </div>
            <div className='right-column'>
                <div className='card'>
                    <Lottie animationData={animationData} />
                </div>
            </div>
        </div>
    



    );*/}
    
    
    
    // Create an array to determine positions of button containers
    /*const isButtonContainer = (index: number) => {
        return index >= 10 && index < 15;
    };

    return (
        <div className='container'>
            {Array.from({ length: 25 }).map((_, index) => (
                isButtonContainer(index) ? (
                    <div className='grid-item button-container' key={index}>
                        <button onClick={() => navigate('/play')}>
                            Play Local Game
                        </button>
                        <button onClick={() => navigate('/online')}>
                            Play Online Game
                        </button>
                        <button onClick={() => navigate('/login')}>
                            Login
                        </button>
                        <button onClick={test_server_connection}>
                            {text}
                        </button>
                    </div>
                    
                ) : (
                    <div className='grid-item' key={index}>
                        <Lottie animationData={animationData} />
                    </div>
                )
            ))}
        </div>
    );*/

    // Define an array of logos to use
    const logo1 = animationKnight;
    const logo2 = animationRook;
    const logo3 = animationKnight;
    const logo4 = animationRook;

    const logos = [logo1, logo2, logo3, logo4, logo1, logo2, logo3, logo4, logo1, logo2, logo3, logo4, logo1, logo2, logo3, logo4];

    // Create an array to determine positions of button containers
    const isButtonContainer = (index: number) => {
        return index >= 10 && index < 15;
    };

    return (
        <div className='container'>
            {Array.from({ length: 25 }).map((_, index) => (
                isButtonContainer(index) ? (
                    <div className='grid-item' key={index}>
                        {index === 11 && <button onClick={() => navigate('/play')}>Play Local Game</button>}
                        {index === 13 && <button onClick={() => navigate('/online')}>Play Online Game</button>}
                        {index === 12 && <button onClick={() => navigate('/login')}>Login</button>}
                        {index === 10 && <button onClick={test_server_connection}>Test Server</button>}
                        {index === 14 && <button onClick={() => navigate('/another')}>Settings</button>}
                    </div>
                ) : (
                    <div className='grid-item' key={index}>
                        <LottieView animationData={logos[index % logos.length]}/>
                        {/*<img src={logos[index % logos.length]} alt="Chess Logo" className='logo' />*/}
                    </div>
                )
            ))}
        </div>
    );


}

export default StartMenu;