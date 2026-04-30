import './bootstrap'; // Laravel's bootstrap (keep this at the very top)

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App'; 

// Look at what was imported in Figma's main.tsx and copy those CSS imports here.
// It will likely look something like this:
import './styles/tailwind.css'; 
import './styles/globals.css';
import './styles/theme.css';
import './styles/fonts.css';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);