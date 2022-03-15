import React from 'react';
import s from './Dialogs.module.css';

const Dialogs = (props) => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <div className={s.dialog + ' ' + s.active}>Ihor</div>
                <div className={s.dialog}>Sveta</div>
                <div className={s.dialog}>Viktor</div>
                <div className={s.dialog}>Andrey</div>
                <div className={s.dialog}>Katya</div>
            </div>
            <div className={s.messages}>
                <div className={s.messege}>Hi</div>
                <div className={s.messege}>How are you ?</div>
                <div className={s.messege}>Yo</div>
            </div>
        </div>
    );
}

export default Dialogs;