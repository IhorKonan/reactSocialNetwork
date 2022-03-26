import React from 'react';
import { sendMessageCreator, updateNewMessageBodyCreater } from '../../redux/dialogs-reducer';
import StoreContext from '../../StoreContext';
import Dialogs from './Dialogs';


const DialogsContainer = () => {

    return <StoreContext.Consumer> 
        { (store) => {
            let state = store.getState().dialogsPage;
            let onSendMessageClick = () => {
                    store.dispatch(sendMessageCreator());
                }
            let onNewMessageChange = (body) => {
                    store.dispatch(updateNewMessageBodyCreater(body));
                }
            return <Dialogs updateNewMessageBody={onNewMessageChange} sendMessage={onSendMessageClick} dialogsPage={state}/>
        }} 
        </StoreContext.Consumer>
}

export default DialogsContainer;