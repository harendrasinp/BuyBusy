

import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import { Navbar } from './Component/Navbar';
import { Home } from './pages/Home';
import { Orders } from './pages/Orders';
import { Cart } from './pages/Cart';
import { Login } from './pages/LoginPage';
import { Signup } from './pages/Signup';
import { ProtectedRout } from './Component/Protected';
function App() {

  const router = createBrowserRouter([
    {
      path: "/", element: <Navbar />,
      children: [
        { index: true, element:<Home/>},
        {path:"Orders",element:<ProtectedRout><Orders/></ProtectedRout>},
        {path:"Cart",element:<ProtectedRout><Cart/></ProtectedRout>},
        {
          path: "Login",
          children: [
            { index: true, element: <Login/> },
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

