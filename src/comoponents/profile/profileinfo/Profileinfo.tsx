import React, { ChangeEvent, useState } from 'react';
// @ts-ignore
import s from './Profileinfo.module.css'
// @ts-ignore
import imageAva from './../../../img/userlogo.png'
// @ts-ignore
import ProfileStatusWithHooks from './ProfileStatusWithHooks.tsx';
// @ts-ignore
import ProfileDataFormReduxForm from './ProfileDataForm.tsx';
// @ts-ignore
import { ProfileType, ContactsType } from '../../../types/types.ts';
// @ts-ignore
import Preloader from '../../common/Preloader/Preloader.tsx';




type PropsType = {
  profile: ProfileType | null
  status: string
  upDateStatus: (status: string) => void
  isOwner: boolean
  savePhoto: (file: File) => void
  saveProfile: (profile: ProfileType) => Promise<any>
}
const Profileinfo: React.FC<PropsType> = ({profile, status, upDateStatus, isOwner, savePhoto, saveProfile}) => {
  let [editMode, setEditMode] = useState(false);
  if(!profile){
    return <Preloader />
  }
  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files.length){
      savePhoto(e.target.files[0]);
    }
  }
  const onSubmit = (formData: ProfileType) => {
    //remove then
    saveProfile(formData).then(() => {
      setEditMode(false);
    })
  }
  return (
    <div>
      <div className={s.descriptionBlock}>
          <img src={profile.photos.small !== null ? profile.photos.small : imageAva} alt='ava' className={s.imgAva}></img>
          { isOwner && <input type={'file'} onChange={onMainPhotoSelected}/> }
          { editMode 
          ? <ProfileDataFormReduxForm initialValues={profile} onSubmit={onSubmit} profile={profile}/> 
          : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => {setEditMode(true)}}/>}
          <ProfileStatusWithHooks status={status} upDateStatus={upDateStatus}/>
      </div>
    </div>
  );
}
type ProfileDataPropsType = {
  profile: ProfileType
  isOwner: boolean
  goToEditMode: () => void
}
const ProfileData: React.FC<ProfileDataPropsType> = ({ profile, isOwner, goToEditMode }) => {
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
        <b>About me</b>: {profile.aboutMe}
      </div>
      <div>
        <b>Сontacts</b>: {
        Object
          .keys(profile.contacts)
          .map(key => {
        return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]} />
      })}
      </div>
    </div>
  )
}
type ContactsPropsType = {
  contactTitle: string
  contactValue: string
}
const Contact: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
    return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
  }

export default Profileinfo;