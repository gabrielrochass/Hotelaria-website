// importar o app.js e colocar dentro de react.strictMode
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './global.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
