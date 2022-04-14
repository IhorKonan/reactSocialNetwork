import React from 'react';
import s from './Profileinfo.module.css'
import imageAva from './../../../img/userlogo.png'
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import Preloader from '../../common/Preloader';

const Profileinfo = ({profile, status, upDateStatus}) => {
  if(!profile){
    return <Preloader />
  }
  return (
    <div>
      <div className={s.descriptionBlock}>
          <img src={profile.photos.small !== null ? profile.photos.small : imageAva} alt='ava' className={s.imgAva}></img>
          <ProfileStatusWithHooks status={status} upDateStatus={upDateStatus}/>
      </div>
    </div>
  );
}

export default Profileinfo;