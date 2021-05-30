import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';

ReactDOM.render(
  <React.StrictMode>
      <SnackbarProvider
      
          anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
          }}
      >
    <Router>
      <Routes />
      <div style={{margin: 100}}></div>
    </Router>

    {/* <App /> */}
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
