import React, { useEffect, useState } from 'react'
import './Body.css'
import biglike from '../images/biglike.png'
import { useStateprovider } from '../StateProvider'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { MoreHorizOutlined } from '@mui/icons-material';
import Item from './Item';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function Body() {
  const [{ user, liked }, dispatch] = useStateprovider();

  return (
    <div className='body'>
      <div className="banner">
        <img src={liked?.images ? liked.images[0].url : biglike} alt="" className="biglike" />
        <div className="infotext">
          <strong>PLAYLIST</strong>
          <h1>{liked?.name}</h1>
          <div className="userinfo">
            <img src={user?.images[0].url} alt="" className='userimg' />
            <p className="name">{user?.display_name}</p>
            <span className="blanka"></span>
            <p className='total'>{liked?.tracks?.total} songs</p>
          </div>
        </div>
      </div>
      <div className="i">
        <div className="play">
          <PlayCircleFilledWhiteIcon fontSize='inherit' className='playb' />
        </div>
        <MoreHorizOutlined fontSize='inherit' className='more' />
      </div>
      <div className="gridcont">
        <div>#</div>
        <div>TITLE</div>
        <div>ALBUM</div>
        <div>DATE ADDED</div>
        <div><AccessTimeIcon/> </div>
      </div>
      <div className="songs">
        {liked?.tracks?.items?.map((item, index) => (
          <Item track={item.track} added={item.added_at} index={index} />
        ))}
      </div>
    </div>
  )
}

export default Body
