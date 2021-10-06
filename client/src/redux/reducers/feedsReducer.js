
import { ADD_FEED, DELETE_FEED, FEEDS_LOADING, UPDATE_FEED, GET_FEEDS } from '../actions/types';

const initialState = {
    feeds: [],
    feedsLoading: false,
}

const feedReducer = (state = initialState, action ) =>{
    switch (action.type) {
        case FEEDS_LOADING:
            return{
                ...state,
                feedsLoading: true
            }
        case GET_FEEDS:
            return{
                ...state,
                feeds: action.payload.feeds,
                feedsLoading: false
            }
        case ADD_FEED:
            return{
                ...state,
                feeds: [action.payload.feed,...state.feeds]
            }
        case DELETE_FEED:
            return{
                ...state,
                feeds: state.feeds.filter(feed => feed.id !== action.payload)
            }
        case UPDATE_FEED:
            return{
                ...state,
                feeds: action.payload.feeds
            }
        default:
            return state;

    }
}

export default feedReducer;
