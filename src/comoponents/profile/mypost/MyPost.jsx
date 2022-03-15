import React from 'react';
import s from './MyPost.module.css'
import Post from './post/Post';

const MyPost = () => {
  return (
    <div>
      <div>
        <textarea></textarea>
        <button>Add post</button>
      </div>
      <Post message='Hi, how are you?' likeCount='0' />
      <Post message="It's my first post" likeCount='23' />
    </div>
  );
}

export default MyPost;