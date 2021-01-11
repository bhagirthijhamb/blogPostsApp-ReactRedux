import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts, fetchPostsAndUsers } from  './../actions';
import UserHeader from './UserHeader';

class PostList extends React.Component {
  componentDidMount(){
    // this.props.fetchPosts();
    this.props.fetchPostsAndUsers();
  }

  renderList () {
    return this.props.posts.map(post => {
      return(
        <div className="item" key={post.id}>
          <i className="large middle aligned icon user" />
          <div className="content">
            <div className="description">
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
            <UserHeader userId={post.userId} />
          </div>
        </div>
      )
    })
  }
  render(){
    // console.log(this.props.posts)
    return(
      <div className="ui relaxed divided list">
        {this.renderList()}
      </div>
    )
  }
}

// Every single time our reducers run, mapStateToProps will be called again
// we will return a new object with property posts
// this object will show up as the props object in our component
const mapStateToProps = state => {
  // console.log(state)

  return { posts: state.posts }
}

// export default connect(null, { fetchPosts: fetchPosts }) (PostList);
export default connect(mapStateToProps, { fetchPosts: fetchPosts, fetchPostsAndUsers }) (PostList);

// In the console, we have two console logs
// When our application is first loaded up in the browser, all or our reducers run one initial time
// it will run with some action type that will not match with any ation type ,so we return our default state value of an empty array []
// SO when our app first boots up, our state object that has a posts property and that post property will have this empty array []
// After all our reducers run, the react side of our aplication is going to be rendered one time on the screeen
// So the post list component will be displayed on the screen one time. During this one time the render method is called and that will invoke the  console log of this.props.posts and we see empty array, the first time our app is rendered on the screen.
// Immediately  after the PostList shows up o the screen, the componentDidMount() is called, we run api call and
// In the reducer when it returns an new state with new action.payload, redux tell react to rerender itself. The PostList is rendered to the screen a second time, mapStateToProps is called second time, we get a new value of state.posts