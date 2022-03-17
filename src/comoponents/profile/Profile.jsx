import React from 'react';
import MyPost from './mypost/MyPost';
import s from './Profile.module.css'
import Profileinfo from './profileinfo/Profileinfo';

const Profile = () => {
  return (
    <div>
      <Profileinfo />
      <MyPost />
    </div>
  );
}

export default Profile;