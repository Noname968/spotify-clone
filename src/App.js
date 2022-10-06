import { useEffect } from 'react';
import './App.css';
import Login from './pages/Login';
import { gettoken } from './spotifydata.js'
import SpotifyWebApi from 'spotify-web-api-js';
import Home from './pages/Home';
import { useStateprovider } from './StateProvider'

const spotify = new SpotifyWebApi();

function App() {
  const [{ user, token, liked, selectedplaylistid }, dispatch] = useStateprovider();

  useEffect(() => {
    const hash = gettoken();
    window.location.hash = "";
    const Token = hash.access_token;
    if (Token) {
      dispatch({
        type: 'SET_TOKEN',
        token: Token
      })
      spotify.setAccessToken(Token);

      spotify.getMe().then((user) => {
        dispatch({
          type: 'SET_USER',
          user: user
        })
      })
      spotify.getUserPlaylists().then((playlist) => {
        dispatch({
          type: 'SET_PLAYLISTS',
          playlists: playlist
        });
      })
      // spotify.getPlaylist(selectedplaylistid).then((response)=>{
      //   dispatch({
      //     type: 'SET_FAV',
      //     liked: response,
      //   });
      // })
    }
  }, [selectedplaylistid,dispatch,token,liked])

  // console.log("", liked);

  return (
    <div className='app'>
      {token ? <Home spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;
