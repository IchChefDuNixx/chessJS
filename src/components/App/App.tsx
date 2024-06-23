import React, { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import LoginGuard from '../Authentication/LoginGuard';
import LoginPage from '../Authentication/LoginPage';
import RegisterPage from '../Authentication/RegisterPage';
import Board from '../ChessBoard/Board';
import NavBar from './NavBar';
import SettingsMenu from './SettingsMenu';
import StartMenu from './StartMenu';

import './App.css';


type Settings = {
  showTooltips: boolean,
  darkMode: boolean,
  gender: number[],
  human: number
}

const defaultSettings = {
  showTooltips: false,
  darkMode: false,
  gender: [40, 60],
  human: 50
}

const SettingsContext = React.createContext<{ settings?: Settings, setSettings?: (value: React.SetStateAction<Settings>) => void } >({});

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
        <NavBar />
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
  const [settings, setSettings] = useState(() => {
    const prevSettings = sessionStorage.getItem("settings");
    if (prevSettings) {
      // Get previous setting on page reload
      return JSON.parse(prevSettings);
    }
    // Initialize default settings on first load
    return defaultSettings;
  });

  useEffect(() => {
    // Persist settings in session storage for page reload
    sessionStorage.setItem("settings", JSON.stringify(settings));
  }, [settings])

  return(
    <SettingsContext.Provider value={{settings: settings, setSettings: setSettings}}>
      <RouterProvider router={router}/>
    </SettingsContext.Provider>
  );
}

export default App;
export { SettingsContext };
export type { Settings };
