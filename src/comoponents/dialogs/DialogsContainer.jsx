import React from 'react';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { sendMessageCreator, updateNewMessageBodyCreater } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';


let mapStateToProps = (state) => {
    return {
      dialogsPage: state.dialogsPage,
    }
  }
let mapDispatchToProps = (dispatch) => {
    return { 
        sendMessage: () => {
            dispatch(sendMessageCreator());
        },
        updateNewMessageBody: (body) => {
            dispatch(updateNewMessageBodyCreater(body));
        }
    }
 }

 let AuthRedirectComponent = withAuthRedirect(Dialogs);


const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);

export default DialogsContainer;