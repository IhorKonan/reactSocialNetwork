import React from 'react';
import MyPost from './mypost/MyPost';
import s from './Profile.module.css'
import Profileinfo from './profileinfo/Profileinfo';

const Profile = (props) => {
  return (
    <div>
      <Profileinfo />
      <MyPost posts={props.profilePage.posts} newPostText={props.profilePage.newPostText} addPost={props.addPost} updateNewPostText={props.updateNewPostText}/>
    </div>
  );
}

export default Profile;