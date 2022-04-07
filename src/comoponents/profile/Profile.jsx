import React from 'react';
import Preloader from '../common/Preloader';
import MyPostContainer from './mypost/MyPostContainer';
import Profileinfo from './profileinfo/Profileinfo';

const Profile = (props) => {
  if(!props.profile){
    return <Preloader />
  }
  return (
    <div>
      <Profileinfo profile={props.profile} status={props.status} upDateStatus={props.upDateStatus}/>
      <MyPostContainer />
    </div>
  );
}

export default Profile;