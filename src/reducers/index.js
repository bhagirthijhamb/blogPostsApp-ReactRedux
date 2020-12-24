import { combineReducers } from 'redux';
import postsReducer from './postsReducers';

export default combineReducers({
  // replaceMe: () => 'hi there'
  posts: postsReducer
})