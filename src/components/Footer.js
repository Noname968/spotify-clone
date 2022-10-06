import React, { useEffect } from 'react'
import './Footer.css'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatIcon from '@mui/icons-material/Repeat';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { Slider, Grid } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import DevicesIcon from '@mui/icons-material/Devices';
import QueueIcon from '@mui/icons-material/Queue';
import { useStateprovider } from '../StateProvider'
import axios from 'axios'
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';

function Footer() {
  const [{ user, token, isplaying, playstate }, dispatch] = useStateprovider();

  useEffect(() => {
    const getCurrentTrack = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.data !== "") {
        dispatch({ type: 'SET_PLAYING', isplaying: response.data });
      } else {
        dispatch({ type: 'SET_PLAYING', isplaying: null });
      }
    };
    getCurrentTrack();
  }, [token, dispatch, isplaying]);

  const changestate = async () => {
    const state = playstate ? "pause" : "play";
    await axios.put(
      `https://api.spotify.com/v1/me/player/${state}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    dispatch({
      type: 'SET_PLAYSTATE',
      playstate: !playstate,
    });
  };

  const changetrack = async (type) => {
    await axios.post(
      `https://api.spotify.com/v1/me/player/${type}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    dispatch({ type: 'SET_PLAYSTATE', playstate: true });
  }

  return (
    <div className='footer'>
      <div className="left">
        <img src={isplaying?.item?.album?.images[0].url} alt="" className="logo" />
        <div className="songinfo">
          <h5>{isplaying?.item?.name}</h5>
          <div className="footarti">
            {isplaying?.item?.artists?.map((artist, i) => {
              return (<span className='footartist'>
                {artist.name}{i < isplaying?.item?.artists?.length - 1 ? "," : ""}
              </span>)
            })}
          </div>
        </div>
      </div>
      <div className="center">
        <div className="ctop">
          <ShuffleIcon className='licon1' />
          <SkipPreviousIcon className='licon2' onClick={() => changetrack("previous")} />
          {playstate ? <PauseCircleFilledIcon fontSize="large" className='cicon' onClick={changestate} /> :
            <PlayCircleFilledWhiteIcon fontSize="large" className='cicon' onClick={changestate} />
          }
          <SkipNextIcon className='ricon1' onClick={() => changetrack("next")} />
          <RepeatIcon className='ricon2' />
        </div>
        <div className="cbottom">
          <p className='btime'>0:00</p>
          <Grid container >
              <Slider className='timeslider' aria-label="Small" size="small" />
            </Grid>
          <p className='btime'>{Math.floor(isplaying?.item?.duration_ms / 60000)}:{Math.floor((isplaying?.item?.duration_ms % 60000) / 1000).toFixed(0) < 10 ? '00' : '' + Math.floor((isplaying?.item?.duration_ms % 60000) / 1000).toFixed(0)}</p>
        </div>
      </div>
      <div className="right">
        <div className="gridd">
          <Grid container spacing={2} className='gridco'>
            <Grid item>
              <QueueIcon className='rlicon' fontSize='medium' />
            </Grid>
            <Grid item>
              <DevicesIcon className='rcicon' />
            </Grid>
            <Grid item>
              <VolumeUpIcon className='rricon' />
            </Grid>
            <Grid item xs>
              <Slider className='slidericon' aria-label="Small" size="small" defaultValue={100} max={100}/>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  )
}

export default Footer
