// import React from 'react';
// import ReactDOM from 'react-dom/client'; // Updated import
// import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root')); // Create root
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);