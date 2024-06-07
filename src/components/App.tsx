import Board from './Board';
import NavBar from './NavBar';
import SettingsMenu from './SettingsMenu';
import StartMenu from './StartMenu';
import LoginForm from './LoginForm';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <StartMenu/>
      </>
    )
  },
  { // this is stupid but works
    path: '/home',
    element: (
      <>
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
    path: '/login',
    element: (
      <>
        <NavBar />
        <LoginForm/>
      </>
    )
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
