import React from 'react';
//@ts-ignore
import s from './../Dialogs.module.css';

type PropsType = {
    message: string
}
const Message: React.FC<PropsType> = (props) => {
    return (
        <div className={s.messege}>{props.message}</div>
    );
}

export default Message;