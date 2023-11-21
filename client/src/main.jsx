import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.jsx';
import { AuthContextProvider } from './context/AuthContext.jsx';
import { Provider as AlertProvider } from 'react-alert';
import { disableReactDevTools } from '@fvilers/disable-react-devtools'
import AlertTemplate from 'react-alert-template-basic';
import "./style.css";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/images/marker-icon.png";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const options = {
  position: 'top center',
  timeout: 3000,
  offset: '35px',
  transition: 'fade',
  type: 'success'
}

if(process.env.NODE_ENV === 'production') disableReactDevTools();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
