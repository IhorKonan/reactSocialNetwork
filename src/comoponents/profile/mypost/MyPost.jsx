import React from 'react';
import { addPostActionCreater, updateNewPostTextActionCreater } from '../../../redux/profile-reducer';
import s from './MyPost.module.css'
import Post from './post/Post';

const MyPost = (props) => {

  let postsElements = props.posts.map(p => <Post message={p.message} likeCount={p.likeCount} />)
  let newPostElement = React.createRef();

  let addPost = () => {
    props.dispatch(addPostActionCreater());
  }

  let onPostChange = () => {
    let text = newPostElement.current.value;
    props.dispatch(updateNewPostTextActionCreater(text));
  }

  return (
    <div className={s.postsBlocks}>
      <h3>My Posts</h3>
      <div>
        <div>
          <textarea ref={newPostElement} value={props.newPostText} onChange={onPostChange}></textarea>
        </div>
        <div>
         <button onClick={ addPost }>Add post</button>
        </div>
      </div>
      <div className={s.posts}>
        {postsElements}
      </div>
    </div>
  );
}

export default MyPost;