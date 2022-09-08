import React from 'react';
import { connect } from 'react-redux';
// @ts-ignore
import { getUserProfile, getStatus, upDateStatus, savePhoto, saveProfile} from '../../redux/profile-reducer.ts';
// @ts-ignore
import Profile from './Profile.tsx';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';
// @ts-ignore
import { withAuthRedirect } from '../../hoc/withAuthRedirect.tsx';
// @ts-ignore
import { AppStateType } from '../../redux/redux-store.ts';
// @ts-ignore
import { ProfileType } from '../../types/types.ts';

type MapPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchPropsType = {
  getUserProfile: (userId: number) => void
  getStatus: (userId: number) => void
  upDateStatus: (status: string) => void
  savePhoto: (file: File) => void
  saveProfile: (profile: ProfileType) => Promise<any>
}
type PathParamsType = {
  userId: string
}
type PropsType = MapPropsType & MapDispatchPropsType & RouteComponentProps<PathParamsType>
class ProfileContainer extends React.Component<PropsType>{
  refreshProfile(){
    let userId: number | null = +this.props.match.params.userId;
    if(!userId){
      userId = this.props.authorizerUserId;
      if(!userId){
        this.props.history.push('/login');
      }
    }
    if(!userId){
      console.error('ID should exists in URI params or in state("authorizerUserId")');
    } else {
      this.props.getUserProfile(userId);
      this.props.getStatus(userId);
    }
    
  }
  componentDidMount() {
    this.refreshProfile()
  }
  componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
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

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizerUserId: state.auth.userId,
    isAuth: state.auth.isAuth 
})

export default compose<React.ComponentType>(
  connect(mapStateToProps, {getUserProfile, getStatus, upDateStatus, savePhoto, saveProfile}),
  withRouter,
  withAuthRedirect
)(ProfileContainer);