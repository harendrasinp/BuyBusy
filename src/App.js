import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import { Navbar } from './Component/Navbar';
import { Home } from './pages/Home';
import { Orders } from './pages/Orders';
import { Cart } from './pages/Cart';
import { Login } from './pages/LoginPage';
import { Signup } from './pages/Signup';
import { useState } from 'react';

function App() {
 const[isLoggedIn,setIsLoggedIn]=useState(false)
  const router = createBrowserRouter([
    {
      path: "/", element: <Navbar />,
      children: [
        { index: true, element:<Home/>},
        {path:"Orders",element:<Orders/>},
        {path:"Cart",element:<Cart/>},
        {
          path: "Login",
          children: [
            { index: true, element: <Login setIsLoggedIn={setIsLoggedIn} /> },
            { path: "signup", element: <Signup /> }
          ]
        },
      ]
    }
  ])
  return (
    <RouterProvider router={router} />
  );
}
export default App;

