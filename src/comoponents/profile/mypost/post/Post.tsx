import React from 'react';
//@ts-ignore
import s from './Post.module.css'

type PropsType = {
  message: string
  likeCount: number
}
const Post: React.FC<PropsType> = (props) => {
  return (
    <div>
      <div>
        <div className={s.item}>
          <img src='https://www.pngitem.com/pimgs/m/560-5603874_product-image-logo-avatar-minimalist-flat-line-hd.png' alt='#'></img>
          {props.message}
        </div>
        <span>like</span> {props.likeCount}
      </div>
    </div>
  );
}

export default Post;