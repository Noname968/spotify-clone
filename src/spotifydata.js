export const authEndpoint = "https://accounts.spotify.com/authorize";

const redirectUri = "http://localhost:3000/";

const clientId = "0cbb4c31f7474d67ac59b7351ede7cf6"

// const clientId = "8d659853ef86445784ca25c793e8f9b3"


const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
    "playlist-modify-private",
    "user-read-private",
];

export const gettoken=()=>{
    return window.location.hash.substring(1).split('&').reduce((initial,item)=>{
        let parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);
        return initial 
    },{})
}

export const loginurl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`