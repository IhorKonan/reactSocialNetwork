import React from 'react';
import s from './Profileinfo.module.css'

const Profileinfo = (props) => {
  return (
    <div>
      <div>
        <img src='https://i.pinimg.com/originals/5a/d4/7a/5ad47aae12355d55c86bcb408d88ba08.jpg' alt='back' className={s.img}></img>
      </div>
      <div className={s.descriptionBlock}>
          <img src={props.profile.photos.large}></img>
      </div>
    </div>
  );
}

export default Profileinfo;