import React from 'react';
import MyPostContainer from './mypost/MyPostContainer';
import s from './Profile.module.css'
import Profileinfo from './profileinfo/Profileinfo';

const Profile = (props) => {
  return (
    <div>
      <Profileinfo />
      <MyPostContainer store={props.store}/>
    </div>
  );
}

export default Profile;