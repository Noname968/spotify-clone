import React from 'react'
import './Home.css'
import Sidebar from '../components/Sidebar'
import Body from '../components/Body'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'


function Home({spotify}) {
  return (
    <div className='home'>
      <Navbar spotify={spotify}/>
      <div className="con1">
        <Sidebar />
        <Body />
      </div>
      <Footer/>
    </div>
  )
}

export default Home
