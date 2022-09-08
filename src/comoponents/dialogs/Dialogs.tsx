import React from 'react';
// @ts-ignore
import { InitialStateType } from '../../redux/dialogs-reducer.ts';
// @ts-ignore
import AddMessageForm from './addMessageForm/AddMessageForm.tsx';
// @ts-ignore
import DialogsItem from './dialogItem/DialogsItem.tsx';
// @ts-ignore
import s from './Dialogs.module.css';
// @ts-ignore
import Message from './message/Message.tsx';


type OwnProps = {
    dialogsPage: InitialStateType
    sendMessage: (messageText: string) => void
}
export type NemMessageFormValuesType = {
    newMessageBody: string
}

const Dialogs: React.FC<OwnProps> = (props) => {
    
    let state = props.dialogsPage

    let dialogsElements = state.dialogs.map(d => <DialogsItem name={d.name} key={d.id} id={d.id}/>);
    let messagesElements = state.messages.map(m => <Message message={m.message} key={m.id}/>);

    let addNewMessage = (value: NemMessageFormValuesType) => {
        props.sendMessage(value.newMessageBody);
    }
  
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <AddMessageForm onSubmit={addNewMessage} />
            </div>
        </div>
    );
}

export default Dialogs;