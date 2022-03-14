import React from 'react';
// import s from './MyPost.module.css'
import Post from './post/Post';

const MyPost = () => {
  return (
    <div>
      <div>
        <textarea></textarea>
        <button>send</button>
        <button>remove</button>
      </div>
      <Post />
    </div>
  );
}

export default MyPost;