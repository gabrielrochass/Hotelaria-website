import React from 'react'
import NavBar from '../Compartilhado/navbar.js'
import './style.css'

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <div className='main'>
        <h2>Home Page</h2>
        <p>Welcome to the Home Page</p>
      </div>
    </div>
  )
}

export default HomePage
