import { combineReducers } from 'redux';
import postsReducer from './postsReducers';
import usersReducer from './usersReducer';

export default combineReducers({
  // replaceMe: () => 'hi there'
  posts: postsReducer,
  users: usersReducer
})