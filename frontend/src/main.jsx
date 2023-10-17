import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ExpenseProvider from './context/ExpenseProvider.jsx'
import {AuthContextProvider} from './context/AuthContext'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ExpenseProvider>
        <App />
      </ExpenseProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
