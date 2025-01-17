import Lottie from 'lottie-react';
import { useState, useEffect } from 'react';

import animationKnight from '../../assets/Animation-knight.json';
import animationBoard from '../../assets/Animation-board.json';
import animationRook from '../../assets/Animation-rook.json';


const generateRandomPosition = () => {
  const top = Math.floor(Math.random() * 80) + 5;

  const getValidLeft = (top: number) => {
    let left;
    if (top >= 20 && top <= 70) {
      do {
        left = Math.floor(Math.random() * 90) + 5;
      } while (left >= 30 && left <= 70); // Ensure left is not between 30 and 70
    } else {
      left = Math.floor(Math.random() * 90) + 5;
    }
    return left;
  };

  const left = getValidLeft(top);

  return { top: `${top}%`, left: `${left}%` };
};

interface AnimationProps {
  figure?: "board" | "knight" | "rook";
}

function RandomLogo ({ figure = "knight" }: AnimationProps) {
  const [positions, setPositions] = useState(() => [generateRandomPosition()]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPositions((prevPositions) => [...prevPositions, generateRandomPosition()]);
    }, 1000); // Add new position every second

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const animations = {
    "board": animationBoard,
    "knight": animationKnight,
    "rook": animationRook,
  };

  return (
    <>
      {positions.map((position, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: position.top,
            left: position.left,
            width: '100px', // Adjust size as needed
            height: '100px',
            pointerEvents: 'none', // Ensures the logos don't interfere with form inputs
          }}
        >
          <Lottie
            animationData={animations[figure]}
            style={{ width: '100%', height: '100%' }} // Ensure Lottie animation fills the container
            loop={false}
          />
        </div>
      ))}
    </>
  );
};

export default RandomLogo;
