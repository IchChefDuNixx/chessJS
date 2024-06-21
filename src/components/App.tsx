import React, { useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import LoginGuard from './Authentication/LoginGuard';
import LoginPage from './Authentication/LoginPage';
import RegisterPage from './Authentication/RegisterPage';
import Board from './ChessBoard/Board';
import NavBar from './NavBar';
import SettingsMenu from './SettingsMenu';
import StartMenu from './StartMenu';

import './App.css';


export type Settings = {
  showTooltips: boolean,
  darkMode: boolean,
  gender: number[],
  human: number
}

export const SettingsContext = React.createContext<{ settings?: Settings, setSettings?: (value: React.SetStateAction<Settings>) => void } >({});

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
      <LoginGuard>
        <NavBar />
        <Board loginRequired />
      </LoginGuard>
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
        <NavBar hideProfileDashboard/>
        <LoginPage />
      </>
    )
  },
  {
    path: '/register',
    element: (
      <>
        <NavBar hideProfileDashboard/>
        <RegisterPage />
      </>
    )
  }
]);

function App() {
  const [settings, setSettings] = useState({
    showTooltips: false,
    darkMode: false,
    gender: [40, 60],
    human: 50
  });

  return(
    <SettingsContext.Provider value={{settings: settings, setSettings: setSettings}}>
      <RouterProvider router={router}/>
    </SettingsContext.Provider>
  );
}

export default App;
