import React from 'react';
import { reduxForm } from 'redux-form';
import { Field } from 'redux-form';
import { maxLengthCreator, required } from '../../utilits/validators/validators';
import { Textarea } from '../common/FormsControls/FormsControls';
import DialogsItem from './dialogItem/DialogsItem';
import s from './Dialogs.module.css';
import Message from './message/Message';

const Dialogs = (props) => {
    
    let state = props.dialogsPage

    let dialogsElements = state.dialogs.map(d => <DialogsItem name={d.name} key={d.id} id={d.id}/>);
    let messagesElements = state.messages.map(m => <Message message={m.message} key={m.id}/>);
    let newMessageBody = state.newMessageBody;

    let addNewMessage = (value) => {
        props.sendMessage(value.newMessageBody);
    }
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <AddMessageFormRedux onSubmit={addNewMessage} />
            </div>
        </div>
    );
}

const maxLenght100 = maxLengthCreator(100);

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}> 
            <div>
                <Field component={Textarea} name='newMessageBody' placeholder='Enter your message' validate={[required, maxLenght100]}/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}
const AddMessageFormRedux = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm);

export default Dialogs;