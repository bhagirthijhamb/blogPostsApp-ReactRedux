import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from  './../actions';

class PostList extends React.Component {
  componentDidMount(){
    this.props.fetchPosts();
  }
  render(){
    console.log(this.props.posts)
    return(
      <div>
        Post List
      </div>
    )
  }
}

// Every single time our reducers run, mapStateToProps will be called again
// we will return a new object with property posts
// this object will show up as the props object in our component
const mapStateToProps = state => {
  return { posts: state.posts }
}

// export default connect(null, { fetchPosts: fetchPosts }) (PostList);
export default connect(mapStateToProps, { fetchPosts: fetchPosts }) (PostList);

// In the console, we have two console logs
// Whne our application is first loaded up in the rowser,all or our reducers run one initial time
// it will run with some action type that will not match with any ation type ,so we return our default state value of an empty array []
// SO when oura pp first boots up, out state object that has a posts property and that post property will have this empty array []
// Aftr all our reducers run, the react side of our aplication is going to be rendered one time on the screeen
// So the post list component will be displayed on the screen one time. During this one time the render method id called and that will invoke the  console log of this.props.posts and we see empty array, the first tiem our app is rendered on the screen.
// Immediately  after the PostList shows up o the screen, the componentDidMount() is called, we runn api call and
// In he reducer when it returns an new state with nw action.payload, redux tell react to rerender itseld.