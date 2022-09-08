import React from 'react';
// @ts-ignore
import { ProfileType } from '../../types/types.ts';
// @ts-ignore
import Preloader from '../common/Preloader/Preloader.tsx';
// @ts-ignore
import MyPostContainer from './mypost/MyPostContainer.tsx';
// @ts-ignore
import Profileinfo from './profileinfo/Profileinfo.tsx';

type PropsType = {
  profile: ProfileType | null
  status: string
  upDateStatus: (status: string) => void
  isOwner: boolean
  savePhoto: (file: File) => void
  saveProfile: (profile: ProfileType) => Promise<any>
}
const Profile: React.FC<PropsType> = (props) => {
  if(!props.profile){
    return <Preloader />
  }
  return (
    <div>
      <Profileinfo profile={props.profile} 
          status={props.status} 
          upDateStatus={props.upDateStatus} 
          isOwner={props.isOwner}
          saveProfile={props.saveProfile}
          savePhoto={props.savePhoto}/>
      <MyPostContainer />
    </div>
  );
}

export default Profile;