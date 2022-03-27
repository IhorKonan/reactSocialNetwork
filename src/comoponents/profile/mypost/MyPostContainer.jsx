import { connect } from 'react-redux';
import { addPostActionCreater, updateNewPostTextActionCreater } from '../../../redux/profile-reducer';
import MyPost from './MyPost';


let mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText
  }
}
let mapDispatchToProps = (dispatch) => {
  return {
    addPost: () => {
      dispatch(addPostActionCreater());
    },
    updateNewPostText: (text) => {
      dispatch(updateNewPostTextActionCreater(text));
    }
  }
}

const MyPostContainer = connect(mapStateToProps, mapDispatchToProps)(MyPost);

export default MyPostContainer;