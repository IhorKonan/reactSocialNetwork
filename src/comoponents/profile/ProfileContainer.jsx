import React from 'react';
import { connect } from 'react-redux';
import { getUserProfile, getStatus, upDateStatus, savePhoto, saveProfile} from '../../redux/profile-reducer';
import Profile from './Profile';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

class ProfileContainer extends React.Component{
  refreshProfile(){
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
  componentDidMount() {
    this.refreshProfile()
  }
  componentDidUpdate(prevProps) {
    if(this.props.match.params.userId !== prevProps.match.params.userId){
        this.refreshProfile()
    }
  }
  render() {
    
    return (
      <div>
        <Profile {...this.props} 
          profile={this.props.profile} status={this.props.status} 
          upDateStatus={this.props.upDateStatus} isOwner={!this.props.match.params.userId}
          savePhoto={this.props.savePhoto} saveProfile={this.props.saveProfile}/>
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
  connect(mapStateToProps, {getUserProfile, getStatus, upDateStatus, savePhoto, saveProfile}),
  withRouter,
  // withAuthRedirect
)(ProfileContainer);