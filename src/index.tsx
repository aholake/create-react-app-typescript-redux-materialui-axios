import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './config/store';
import Notifier from './modules/notifier/Notifier';
import setupAxiosInterceptors from './config/axios-interceptor';

setupAxiosInterceptors();
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store()}>
      <ThemeProvider theme={createMuiTheme()}>
        <SnackbarProvider>
          <App />
          <Notifier />
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
