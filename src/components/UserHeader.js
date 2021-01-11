import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from './../actions'

class UserHeader extends React.Component {
  // We dont want userHeader to fetch its own data
  // componentDidMount(){
  //   this.props.fetchUser(this.props.userId)
  // }
  render() {
    // const user = this.props.users.find(user => user.id === this.props.userId)
    const { user } = this.props

    if(!user) {
      return null;
      // return <div>Loading...</div>
    }
    return (
      <div className="header">
        {user.name}
      </div>
    )
  }
}

// rather than finding the apropriate user inside the component, we find it inside the mapStateToProps
const mapStateToProps = (state, ownProps) => {
  // console.log(state)
  // return { users: state.users }
  return { user: state.users.find(user => user.id === ownProps.userId) }
}

// export default connect(null, { fetchUser })(UserHeader);
export default connect(mapStateToProps, { fetchUser })(UserHeader);