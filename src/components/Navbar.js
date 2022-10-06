import React,{useEffect} from 'react'
import './Navbar.css'
import spotify from '../images/spotify.png'
import HomeIcon from '@mui/icons-material/Home';
import { SearchOutlined } from '@mui/icons-material';
import { useStateprovider } from '../StateProvider'
import { useState } from 'react';
import axios from 'axios';

function Navbar() {
  const [search,setsearch] = useState([]);
  const [{ user,token,selectedplaylistid}, dispatch] = useStateprovider();

  useEffect(() => {
    const getinitialplaylist = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${selectedplaylistid}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      )
      dispatch({ type: 'SET_FAV', liked:response.data });
      };
    getinitialplaylist();
  }, [token, dispatch, selectedplaylistid]);

  const handlesearch = async(e)=>{
    const api = await fetch('https://api.spotify.com/v1/search?q=' + e.target.value + '&type=track'+ '&access_token='+ token)
    const data =await api.json()
    // console.log(data);
    setsearch(data)
  }

  return (
    <div className='navbar'>
      <div className="logocon">
        <img src={spotify} alt="" className='spotifylogo' />
      </div>
      <div className="midcon">
        <a href='/' className="ahome">
          <HomeIcon className='homelogo'/>
        </a>
        <form className="input">
          <SearchOutlined className='searchicon'/>
          <input type="text" name="" id="" placeholder="What do you want to listen to?"  className='inputsearch' onChange={handlesearch}/>
        </form>
      </div>
      <div className="avatarcon">
        <img src={user?.images[0]?.url} alt='' className='avataricon'/>
      </div>
    </div>
  )
}

export default Navbar
