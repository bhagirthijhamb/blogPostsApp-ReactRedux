export default (state = [], action) => {
  // if(action.type === 'FETCH_POSTS'){
  //   return action.payload
  // }

  // // to make sure we dont't return undefined from a reducer
  // return state;

  switch(action.type){
    case 'FETCH_POSTS':
      return action.payload;
    default:
      return state;
  }
}