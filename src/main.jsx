import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { applyAdLanding } from './lib/adLanding.js';
import './styles/index.css';

// Before the router reads the URL, not after. Redirecting from inside a route
// would mount the home page first — the visitor would see it flash, and its
// hero image and 3D scene would start downloading over the connection the real
// landing page needs.
applyAdLanding();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
