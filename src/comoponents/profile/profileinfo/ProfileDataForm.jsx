import React from "react";
import { reduxForm } from "redux-form";
import s from './Profileinfo.module.css'
import { createField, Input, Textarea } from "../../common/FormsControls/FormsControls";
import styles from './../../common/FormsControls/FormsControls.module.css';



const ProfileDataForm = ({ handleSubmit, profile, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div><button>Save</button></div>
            {error && <div className={styles.formErrorSumary}>{error}</div>}
            <div>
                <b>Full name:</b> {createField("Full name", 'fullName', [], Input)}
            </div>
            <div>
                <b>Loking for a job:</b> {createField("", 'lookingForAJob', [], Input, {type: 'checkbox'})}
            </div>
            <div>
                <b>My professional sklls:</b> {createField("My professional skills", 'lookingForAJobDescription', [], Textarea)}
            </div>
            <div>
                <b>About me:</b> {createField("About me", 'aboutMe', [], Textarea)}
            </div>
            <div>
                <b>Сontacts:</b> {Object.keys(profile.contacts).map(key => {
                    return <div ley={key} className={s.contact}>
                        <b>{key}: {createField(key, 'contacts.' + key, [], Input)}</b>
                    </div>
                })}
            </div>
        </form>
    )
}

const ProfileDataFormReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm);

export default ProfileDataFormReduxForm;