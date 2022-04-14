import { render } from '@testing-library/react';
import React, { PureComponent } from 'react';
import { Field } from 'redux-form';
import { reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../utilits/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControls';
import s from './MyPost.module.css'
import Post from './post/Post';

const MyPost = React.memo(props => {

  // shouldComponentUpdate(nextProps, nextState){
  //   return  nextProps != this.props || nextState != this.state;
  // 
    let postsElements = props.posts.map(p => <Post message={p.message} likeCount={p.likeCount} key={p.id} />)
    let newPostElement = React.createRef();

    let onAddPost = (values) => {
      debugger;
      props.addPost(values.newPostText);
    }
    return (
      <div className={s.postsBlocks}>
        <h3>My Posts</h3>
        <AddNewFormRedux onSubmit={onAddPost} />
        <div className={s.posts}>
          {postsElements}
        </div>
      </div>
    );
})

const maxLenght10 = maxLengthCreator(10);

const AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field name='newPostText' component={Textarea} placeholder='Enter your message' validate={[required, maxLenght10]} />
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  )
}

const AddNewFormRedux = reduxForm({form: 'profileAddNewPost'})(AddNewPostForm)

export default MyPost;