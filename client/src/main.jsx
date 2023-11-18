import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.jsx';
import { AuthContextProvider } from './context/AuthContext.jsx';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import "./style.css";
import "leaflet/dist/leaflet.css";
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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
