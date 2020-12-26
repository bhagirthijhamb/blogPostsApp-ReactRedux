import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

// defining a function that will return a function
export const fetchPosts1 =  () => {
  // the problem with async-await was that 
  // with a syncronous action creator it causes us to return a request object instead of a action
  // but once we have redux-thunk, the asyn-await syntax here is only going to modify the  return values of the inner function
  // we can return or not return somthing from the inner function
  // its only what we return from the outer function, the action creator that we are concerned about.
  // with redux-thunk we can use async-await
  return async function(dispatch, getState){
    const response = await jsonPlaceholder.get('/posts');
    // from inside the inner function that is returned
    // when using redux-thunk, we do not need to return an action object
    // if we are returning a function and if we want to dispatch an action, we will instead call the dispatch function manually with the action we are trying to dispatch.
    // instead call the dispatch
    // return {
    //   type: 'FETCH_POSTS',
    //   payload: response
    // }
    dispatch({ type: 'FETCH_POSTS', payload: response.data })
  }
}

// dispatch so that we can dispatch our own actions inside here
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  // we have to make sure that when we call fetchPosts action creator, it still has some action to dispatch at  the end of the day
  // we have to make sure when we call fetchPosts action creator, whatever action creator, function it returns gets dispatched as well
  // so when we call fetchPosts, we ahev to pass the reslt of calling that into dispatch fucntion
  // so we are now kind of manually dispatching the result of calling the action creator

  // we call fetchPosts() that will invoke tha function, that will return the inner function
  // so we will dispatch a function (dispatch(fetchPosts() means dispatch(returned value of caling fetchPosts() which is a function))). Remember whenever we dispatch a function, redux-thunk is going to pick it up and automatically invoke it.
  // so redux-think will invoke the inner funciton and pass in dispatch  along with getState as the arguments.
  // So then the inner function is goin to make a request to the the api to get the post
  // and then its going to dispath its own actions internally and start the entire process of updating our reducers.
  // So whenever we call an action creator from inside of an action creator, we need to make asure we dispatch the result of calling the action creator.

  // console.log('About to fetched posts!')
  // wait before moving on to the next step
  await dispatch(fetchPosts());
  // console.log('fetched posts!')
  console.log(getState().posts);
  const userIds = _.uniq(_.map(getState().posts, 'userId'));
  console.log(userIds);
  userIds.forEach(id => dispatch(fetchUser(id)));

  // _.chain(getState().posts).map('userId').uniq().forEach(id => dispatch(fetchUser(id))).value()
}

// function() {
//   return function(){

//   }
// }

// we are defining a function that is going to return a function
export const fetchPosts =  () => async dispatch => {
    const response = await jsonPlaceholder.get('/posts');

    dispatch({ type: 'FETCH_POSTS', payload: response.data })
}

export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);
  dispatch({ type: 'FETCH_USER', payload: response.data })
}