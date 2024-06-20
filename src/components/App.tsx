import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Board from './Board';
import LoginPage from './LoginPage';
import NavBar from './NavBar';
import RegisterPage from './RegisterPage';
import SettingsMenu from './SettingsMenu';
import StartMenu from './StartMenu';

import './App.css';


const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <StartMenu />
      </>
    )
  },
  { // this is stupid but works
    path: '/home',
    element: (
      <>
        <StartMenu />
      </>
    )
  },
  {
    path: '/local',
    element: (
      <>
        <NavBar hideProfileDashboard />
        <Board />
      </>
    )
  },
  {
    path: '/online',
    element: (
      <>
        <NavBar />
        <Board loginRequired />
      </>
    )
  },
  {
    path: '/settings',
    element: (
      <>
        <NavBar />
        <SettingsMenu />
      </>
    )
  },
  {
    path: '/login',
    element: (
      <>
        <NavBar />
        <LoginPage />
      </>
    )
  },
  {
    path: '/register',
    element: (
      <>
        <NavBar />
        <RegisterPage />
      </>
    )
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
