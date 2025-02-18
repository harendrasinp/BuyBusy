import "./index.css"
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ToastContainer,Bounce} from 'react-toastify';
import UserContextProvider from './userContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <UserContextProvider>
        <App/>
    </UserContextProvider>
    <ToastContainer
      position="top-right"
      autoClose={1500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition={Bounce}
    />
  </>
);


