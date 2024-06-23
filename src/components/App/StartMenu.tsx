import axios from "axios";
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import animationKnight from '../../assets/Animation-knight.json';
import animationRook from '../../assets/Animation-rook.json';
import './StartMenu.css';


function StartMenu() {
    const navigate = useNavigate();
    const [text, setText] = useState("Test server");

    const logos = [animationKnight, animationRook];
    const lottieRefs = Array.from({ length: 25 }, () => useRef<LottieRefCurrentProps>(null));

    useEffect(() => {
        lottieRefs.forEach((ref) => {
            if (ref.current) {
                ref.current?.setSpeed(0.4);
                ref.current?.goToAndPlay(90, true);
            }
        });
    }, [lottieRefs]);

    const test_server_connection = async function() {
        try {
            const response = await axios.get("/api/hello");
            console.log(response);
            const new_text = response.data;
            console.log(new_text);
            setText(new_text);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Function to determine positions of button containers
    const isButtonContainer = (index: number) => index >= 10 && index < 15;

    return (
        <div className='container'>
            {Array.from({ length: 25 }).map((_, index) => (
                <div className='grid-item' key={index}>
                    {isButtonContainer(index) && (
                        <>
                            {index === 10 && <button onClick={test_server_connection}>{text}</button>}
                            {index === 11 && <button onClick={() => navigate('/local')}>Local Game</button>}
                            {index === 13 && <button onClick={() => navigate('/online')}>Online Game</button>}
                            {index === 12 && <button onClick={() => navigate('/login')}>Login</button>}
                            {index === 14 && <button onClick={() => navigate('/settings')}>Settings</button>}
                        </>
                    )}
                    {!isButtonContainer(index) && (
                        <Lottie
                            lottieRef={lottieRefs[index]}
                            animationData={logos[index % logos.length]}
                            style={{ width: '100px', height: '100px' }} // Set your preferred size

                        />
                    )}
                </div>
            ))}
        </div>
    );
}

export default StartMenu;
