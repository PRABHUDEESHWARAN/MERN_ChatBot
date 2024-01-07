import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createTheme } from '@mui/material'
import { ThemeProvider } from '@emotion/react'
import {BrowserRouter} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx'
import {Toaster} from "react-hot-toast"
import axios from "axios";
axios.defaults.baseURL="http://localhost:5050/api/v1";
axios.defaults.withCredentials=true;
//theme for mui

const theme= createTheme({
  typography:{fontFamily:"Roboto Slab,serif",allVariants:{color:"white"}}
})
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Toaster position='top-right'/>
        <App />
      </ThemeProvider>
    </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
)
