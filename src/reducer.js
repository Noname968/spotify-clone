
export const initialstate = {
    user: null,
    playlists: [],
    liked:[],
    isplaying: null,
    item: null,
    token: null,
    selectedplaylistid: '2QIgh5GtpIwzzMMlkMzBDB',
    playstate : false
}

function reducer(state, action) {
    // console.log(action);
    switch (action.type) {
        case 'SET_USER':
            return ({
                ...state,
                user: action.user,
            });
        case 'SET_TOKEN':
            return ({
                ...state,
                token: action.token,
            });
        case 'SET_PLAYLISTS':
            return ({
                ...state,
                playlists: action.playlists,
            })
        case 'SET_FAV':
            return ({
                ...state,
                liked: action.liked,
            })
        case 'SETPLAYLIST_ID':
            return ({
                ...state,
                selectedplaylistid: action.selectedplaylistid,
            })
        case 'SET_PLAYING':
            return ({
                ...state,
                isplaying : action.isplaying
            })
        case 'SET_PLAYSTATE' :
            return ({
                ...state,
                playstate : action.playstate
            })
        default:
            return state;
    }
}

export default reducer
