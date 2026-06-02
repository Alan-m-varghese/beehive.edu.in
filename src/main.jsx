import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { DbProvider } from './context/DbContext.jsx';

ReactDOM.createRoot(document.getElementById('app-root')).render(
  <React.StrictMode>
    <DbProvider>
      <App />
    </DbProvider>
  </React.StrictMode>
);
// Make our app instance available globally for debugging/inspection (similar to vanilla setup)
window.ReactAppMounted = true;
