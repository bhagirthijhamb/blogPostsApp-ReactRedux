import jsonPlaceholder from '../apis/jsonPlaceholder';

// defining a function that will return a function
export const fetchPosts1 =  () => {
  return async function(dispatch, getState){
    const response = await jsonPlaceholder.get('/posts');
    // with redux-thunk, dont return tha action object 
    // instead dacc the dispatch
    // return {
    //   type: 'FETCH_POSTS',
    //   payload: response
    // }
    dispatch({ type: 'FETCH_POSTS', payload: response.data })
  }
}

export const fetchPosts =  () => async dispatch => {
    const response = await jsonPlaceholder.get('/posts');

    dispatch({ type: 'FETCH_POSTS', payload: response.data })
}

export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);
  dispatch({ type: 'FETCH_USER', payload: response.data })
}