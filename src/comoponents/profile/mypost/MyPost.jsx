import React from 'react';
import s from './MyPost.module.css'
import Post from './post/Post';

const MyPost = () => {

  let postsDatas = [
    {id:1, message:'Hi, how are you?', likeCount: 12},
    {id:2, message:"Guitar HERO!!", likeCount: 25},
    {id:2, message:"It's my second post", likeCount: 11},
    {id:2, message:"It's my first post", likeCount: 16},
  ]
  let postsElements = postsDatas.map(p => <Post message={p.message} likeCount={p.likeCount} />)

  return (
    <div className={s.postsBlocks}>
      <h3>My Posts</h3>
      <div>
        <div>
          <textarea></textarea>
        </div>
        <div>
         <button>Add post</button>
        </div>
      </div>
      <div className={s.posts}>
        {postsElements}
      </div>
    </div>
  );
}

export default MyPost;