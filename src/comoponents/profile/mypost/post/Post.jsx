import React from 'react';
import s from './Post.module.css'

const Post = () => {
  return (
    <div>
      <div>
        <div className={s.item}>
          <img src='https://www.pngitem.com/pimgs/m/560-5603874_product-image-logo-avatar-minimalist-flat-line-hd.png' alt='#'></img>
          post1
        </div>
      </div>
    </div>
  );
}

export default Post;