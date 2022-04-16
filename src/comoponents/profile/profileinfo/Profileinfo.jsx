import React from 'react';
import s from './Profileinfo.module.css'
import imageAva from './../../../img/userlogo.png'
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import Preloader from '../../common/Preloader';

const Profileinfo = ({profile, status, upDateStatus, isOwner, savePhoto}) => {
  if(!profile){
    return <Preloader />
  }
  const onMainPhotoSelected = (e) => {
    if(e.target.files.length){
      savePhoto(e.target.files[0]);
    }
  }
  return (
    <div>
      <div className={s.descriptionBlock}>
          <img src={profile.photos.small !== null ? profile.photos.small : imageAva} alt='ava' className={s.imgAva}></img>
          { isOwner && <input type={'file'} onChange={onMainPhotoSelected}/> }
          <ProfileStatusWithHooks status={status} upDateStatus={upDateStatus}/>
      </div>
    </div>
  );
}

export default Profileinfo;