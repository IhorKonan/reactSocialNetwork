import React from 'react';
import { addPostActionCreater, updateNewPostTextActionCreater } from '../../../redux/profile-reducer';
import StoreContext from '../../../StoreContext';
import MyPost from './MyPost';

const MyPostContainer = (props) => {
  return (
    <StoreContext.Consumer> 
      { (store) => {
        let state = store.getState();
        let addPost = () => {
          store.dispatch(addPostActionCreater());
        }
        let onPostChange = (text) => {
          let action = updateNewPostTextActionCreater(text);
          store.dispatch(action);
        }
        return <MyPost updateNewPostText={onPostChange} addPost={addPost} posts={state.profilePage.posts} newPostText={state.profilePage.newPostText}/>
}}
</StoreContext.Consumer>
  );
}

export default MyPostContainer;