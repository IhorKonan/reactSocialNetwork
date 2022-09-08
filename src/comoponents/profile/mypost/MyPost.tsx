import React from 'react';


// @ts-ignore
import PostType from '../../../types/types.ts';
// @ts-ignore
import AddPostForm, { AddPostFormValuesType } from './AddPostForm/AddPostForm.tsx';
// @ts-ignore
import s from './MyPost.module.css'
// @ts-ignore
import Post from './post/Post.tsx'


export type MapPropsType = {
  posts: Array<PostType>

}
export type DispatchPropsType = {
  addPost: (newPostText: string) => void
}
const MyPost: React.FC<MapPropsType & DispatchPropsType> = (props) => {
  let postsElements = [...props.posts]
    .reverse()
    .map(p => <Post message={p.message} likeCount={p.likeCount} key={p.id} />)
  let onAddPost = (values: AddPostFormValuesType) => {
    props.addPost(values.newPostText);
  }
  return (
    <div className={s.postsBlocks}>
      <h3>My Posts</h3>
      <AddPostForm onSubmit={onAddPost} />
      <div className={s.posts}>
        {postsElements}
      </div>
    </div>
  )
}
const MyPostMemorized = React.memo(MyPost);

export default MyPostMemorized;