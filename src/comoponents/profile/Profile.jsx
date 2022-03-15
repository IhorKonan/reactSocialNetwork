import React from 'react';
import MyPost from './mypost/MyPost';
import s from './Profile.module.css'

const Profile = () => {
  return (
    <div>
      <div>
        <img src='https://i.pinimg.com/originals/5a/d4/7a/5ad47aae12355d55c86bcb408d88ba08.jpg' alt='back' className={s.img}></img>
      </div>
      <div>
        ava+discr
      </div>
      <MyPost />
    </div>
  );
}

export default Profile;