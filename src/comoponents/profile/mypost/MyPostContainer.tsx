import { connect } from 'react-redux';
// @ts-ignore
import { actions } from '../../../redux/profile-reducer.ts';
// @ts-ignore
import { AppStateType } from '../../../redux/redux-store.ts';

// @ts-ignore
import MyPostMemorized, {MapPropsType, DispatchPropsType} from './MyPost.tsx';


const mapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts,
  } 
}
const MyPostContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {
  addPost: actions.addPostActionCreater
})(MyPostMemorized);

export default MyPostContainer;