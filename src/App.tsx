import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Login from './login.tsx';
import Home from './home.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/home',
    element: <Home />
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;
