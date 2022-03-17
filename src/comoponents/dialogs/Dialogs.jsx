import React from 'react';
import DialogsItem from './dialogItem/DialogsItem';
import s from './Dialogs.module.css';
import Message from './message/Message';

const Dialogs = (props) => {

    let dialogsData = [
        {id:1, name:'Ihor'},
        {id:2, name:'Sveta'},
        {id:3, name:'Viktor'},
        {id:4, name:'Andrey'},
        {id:5, name:'Katya'},
        {id:6, name:'Valery'},
    ]
    let messageseData = [
        {id:1, message:'Hi'},
        {id:2, message:'How are you?'},
        {id:3, message:'Yo'},
        {id:4, message:'Hello'},
        {id:5, message:'Where you?'},
        {id:6, message:'How much?'},
    ]
    
    let dialogsElements = dialogsData.map(d => <DialogsItem name={d.name} id={d.id}/>);
    let messagesElements = messageseData.map(m => <Message message={m.message} />)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
        </div>
    );
}

export default Dialogs;