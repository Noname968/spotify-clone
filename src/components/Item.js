import React from 'react'
import './Item.css'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { MoreHorizOutlined } from '@mui/icons-material';
import axios from 'axios';
import { useStateprovider } from '../StateProvider'

function Item({ track, index, added }) {
    const [{ user, token, isplaying, playstate }, dispatch] = useStateprovider();

    const playselected = async (
        context_uri,
        track_number
      ) => {
        const response = await axios.put(
          `https://api.spotify.com/v1/me/player/play`,
          {
            context_uri,
            offset: {
              position: track_number - 1,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.status === 204) {
          dispatch({ type: 'SET_PLAYING', isplaying : response.data });
          dispatch({ type: 'SET_PLAYSTATE', playstate: true });
        } else {
          dispatch({ type: 'SET_PLAYSTATE', playstate: true });
        }
      };
    return (
        <div className='item'>
            <div className="gridcon">
                <div>{index + 1}</div>
                <div className="iname">
                    <img src={track.album.images[2].url} alt="" className='imgtrack' />
                    <div className="det">
                        <div className='trackname' onClick={()=>playselected(track.album.uri,track.track_number)}>{track.name}</div>
                        {track.artists?.map((artist,i) => {
                            return (<span className="art">
                                {artist.name}{i < track.artists?.length - 1 ? "," : ""}
                            </span>)
                        })}
                    </div>
                </div>
                <div className='album'>{track.album.name}</div>
                <div className="dateconn">
                    <div className='date'>{added.split('T')[0]}</div>
                    <FavoriteBorderIcon className='smalllike' />
                </div>
                <div className="timeconn">
                    <div className='time'>{Math.floor(track.duration_ms / 60000)}:{Math.floor((track.duration_ms % 60000) / 1000).toFixed(0) < 10 ? '00' : '' + Math.floor((track.duration_ms % 60000) / 1000).toFixed(0)}</div>
                    <MoreHorizOutlined className='moretime'/>
                </div>
            </div>
        </div>
    )
}

export default Item
