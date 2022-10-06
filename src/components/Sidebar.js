import React from 'react'
import './Sidebar.css'
import { useStateprovider } from '../StateProvider'
import ListIcon from '@mui/icons-material/List';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import like from '../images/like.jpeg'

function Sidebar() {
  const [{ playlists }, dispatch] = useStateprovider();
  
  const changeplaylist = (id) => {
    dispatch({
      type: 'SETPLAYLIST_ID',
      selectedplaylistid: id,
    })
  }

  return (
    <div className='sidebar'>
      <div className="sidecon">
        <div className="ic1">
          <LibraryAddCheckIcon className='micons i1' />
          <p className='p'>Your Library</p>
        </div>
        <div className="ic1">
          <ListIcon className='micons i2' />
          <p className='p'>Create Playlist</p>
        </div>
        <div className="ic1">
          <img src={like} alt="" className='micons i3' />
          <p className='p'>Liked Songs</p>
        </div>
        <div className="blank"></div>
        <h4 className='ptit'>PLAYLISTS</h4>
        {playlists?.items?.map((playlist) => (
          <p className='playlist' onClick={() => changeplaylist(playlist.id)}>
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
