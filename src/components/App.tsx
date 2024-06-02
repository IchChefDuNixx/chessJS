import Board from './Board';
import NavBar from './NavBar';
import SettingsMenu from './SettingsMenu';
import StartMenu from './StartMenu';
import UserForm from './Forms/UserForm';
import GameForm from './Forms/GameForm';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <NavBar />
        <StartMenu/>
      </>
    )
  },
  { // this is stupid but works
    path: '/home',
    element: (
      <>
        <NavBar />
        <StartMenu/>
      </>
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
  },
  {
    path: '/settings',
    element: (
      <>
        <NavBar />
        <SettingsMenu/>
      </>
    )
  },
  {
    path: '/user/new',
    element: (
      <UserForm/>
    )
  },
  {
    path: '/game/new',
    element: (
      <GameForm/>
    )
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
