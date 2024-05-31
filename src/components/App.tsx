import Board from './Board';
import NavBar from './NavBar';
import SettingsMenu from './SettingsMenu';
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
  },
  {
    path: '/settings',
    element: (
      <SettingsMenu/>
    )
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
