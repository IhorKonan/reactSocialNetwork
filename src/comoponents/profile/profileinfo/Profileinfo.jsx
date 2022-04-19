import React, { useState } from 'react';
import s from './Profileinfo.module.css'
import imageAva from './../../../img/userlogo.png'
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import Preloader from '../../common/Preloader';
import ProfileDataFormReduxForm from './ProfileDataForm';

const Profileinfo = ({profile, status, upDateStatus, isOwner, savePhoto, saveProfile}) => {
  let [editMode, setEditMode] = useState(false);
  if(!profile){
    return <Preloader />
  }
  const onMainPhotoSelected = (e) => {
    if(e.target.files.length){
      savePhoto(e.target.files[0]);
    }
  }
  const onSubmit = (formData) => {
    saveProfile(formData).then(() => {
      setEditMode(false);
    })
  }

  return (
    <div>
      <div className={s.descriptionBlock}>
          <img src={profile.photos.small !== null ? profile.photos.small : imageAva} alt='ava' className={s.imgAva}></img>
          { isOwner && <input type={'file'} onChange={onMainPhotoSelected}/> }
          { editMode ? <ProfileDataFormReduxForm initialValues={profile} onSubmit={onSubmit} profile={profile}/> 
          : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => {setEditMode(true)}}/>}
          <ProfileStatusWithHooks status={status} upDateStatus={upDateStatus}/>
      </div>
    </div>
  );
}

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
  return (
    <div>
      {isOwner && <div><button onClick={goToEditMode}>edit</button></div>}
      <div>
        <b>Full name:</b> {profile.fullName}
      </div>
      <div>
        <b>Loking for a job:</b> {profile.lookingForAJob ? 'yes' : 'no'}
      </div>
      {profile.lookingForAJob &&
        <div>
          <b>My professional sklls:</b> {profile.lookingForAJobDescription}
        </div>
      }
      <div>
        <b>About me:</b> {profile.aboutMe}
      </div>
      <div>
        <b>Сontacts:</b> {Object.keys(profile.contacts).map(key => {
          return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
        })}
      </div>
    </div>
  )
}

const Contact = ({contactTitle, contactValue}) => {
    return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
  }

export default Profileinfo;