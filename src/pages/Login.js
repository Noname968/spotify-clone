import React from 'react'
import spotify from '../images/spotify.jpg'
import './Login.css'
import {loginurl} from '../spotifydata.js'

function Login() {
  return (
    <div className='login'>
      <img src={spotify} alt="" className='img1'/>
      <a href={loginurl} className='alogin'>Login In</a>
    </div>
  )
}

export default Login