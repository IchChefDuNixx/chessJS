import { useNavigate } from 'react-router-dom';

import './StartMenu.css';


function StartMenu() {
    const navigate = useNavigate();

    return(
        <div className='container'>
            <button onClick={() => navigate('/play')}>
                Play
            </button>
            <button >
                Something else
            </button>
        </div>
    );
}

export default StartMenu;