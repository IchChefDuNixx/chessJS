import Board from './Board';
import NavBar from './NavBar';
import StartMenu from './StartMenu';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './App.css';

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
        <Board />
      </>
    )
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
