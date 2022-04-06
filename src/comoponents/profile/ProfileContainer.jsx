import React from 'react';
import { connect } from 'react-redux';
import { getUserProfile } from '../../redux/profile-reducer';
import Profile from './Profile';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';

class ProfileContainer extends React.Component{
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if(!userId){
      userId = 2;
    }
    this.props.getUserProfile(userId);
  }
  render() {
    
    return (
      <div>
        <Profile {...this.props} profile={this.props.profile}/>
      </div>
    );
  }
}
let AuthRedirectComponent = withAuthRedirect(ProfileContainer);

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
})

let WhitUrlDataContainerComponent = withRouter(AuthRedirectComponent);

export default connect(mapStateToProps, {getUserProfile})(WhitUrlDataContainerComponent);