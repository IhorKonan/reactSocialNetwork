import React from 'react';
import { connect } from 'react-redux';
import { getUserProfile, getStatus, upDateStatus} from '../../redux/profile-reducer';
import Profile from './Profile';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

class ProfileContainer extends React.Component{
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if(!userId){
      userId = this.props.authorizerUserId;
      if(!userId){
        this.props.history.push('/login');
      }
    }
    this.props.getUserProfile(userId);
    this.props.getStatus(userId);
  }
  render() {
    
    return (
      <div>
        <Profile {...this.props} profile={this.props.profile} status={this.props.status} upDateStatus={this.props.upDateStatus}/>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizerUserId: state.auth.userId,
    isAuth: state.auth.isAuth 
})

export default compose(
  connect(mapStateToProps, {getUserProfile, getStatus, upDateStatus}),
  withRouter,
  // withAuthRedirect
)(ProfileContainer);