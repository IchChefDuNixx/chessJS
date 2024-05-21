import Board from './Board';
import NavBar from './NavBar';
import StartMenu from './StartMenu';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './App.css';


// get this from chess model later
const initialBoard = [
  "rook_b", "knight_b", "bishop_b", "king_b", "queen_b", "bishop_b", "knight_b", "rook_b",
  "pawn_b", "pawn_b", "pawn_b", "pawn_b", "pawn_b", "pawn_b", "pawn_b", "pawn_b",
  "", "", "", "", "", "", "", "",
  "", "", "", "", "", "", "", "",
  "", "", "", "", "", "", "", "",
  "", "", "", "", "", "", "", "",
  "pawn_w", "pawn_w", "pawn_w", "pawn_w", "pawn_w", "pawn_w", "pawn_w", "pawn_w",
  "rook_w", "knight_w", "bishop_w", "king_w", "queen_w", "bishop_w", "knight_w", "rook_w"
];


const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <StartMenu/>
    )
  },
  {
    path: '/play',
    element: (
      <>
        <NavBar />
        <Board initialBoard={initialBoard} />
      </>
    )
  }
]);

// function App() {

//   return(
//     <>
//       <NavBar />
//       <Board initialBoard={initialBoard} />
//     </>
//   );
// }

function App() {
  return <RouterProvider router={router} />;
}

export default App;
