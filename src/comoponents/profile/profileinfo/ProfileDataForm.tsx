import React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
// @ts-ignore
import s from './Profileinfo.module.css'
// @ts-ignore
import { createField, Input, Textarea } from "../../common/FormsControls/FormsControls.tsx";
// @ts-ignore
import styles from './../../common/FormsControls/FormsControls.module.css';
// @ts-ignore
import { ProfileType } from "../../../types/types.ts";
// @ts-ignore
import { GetStringKeys } from "../../common/FormsControls/FormsControls.tsx";


type PropsType = {
    profile: ProfileType
}
type ProfileTypeKeys = GetStringKeys<ProfileType>
const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({ handleSubmit, profile, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div><button>Save</button></div>
            {error && <div className={styles.formErrorSumary}>{error}</div>}
            <div>
                <b>Full name:</b> {createField<ProfileTypeKeys>("Full name", 'fullName', [], Input)}
            </div>
            <div>
                <b>Loking for a job:</b> {createField<ProfileTypeKeys>("", 'lookingForAJob', [], Input, {type: 'checkbox'})}
            </div>
            <div>
                <b>My professional sklls:</b> {createField<ProfileTypeKeys>("My professional skills", 'lookingForAJobDescription', [], Textarea)}
            </div>
            <div>
                <b>About me:</b> {createField<ProfileTypeKeys>("About me", 'aboutMe', [], Textarea)}
            </div>
            <div>
                <b>Сontacts:</b> {Object.keys(profile.contacts).map(key => {
                    return <div key={key} className={s.contact}>
                        {/* todo: create some  */}
                        <b>{key}: {createField(key, 'contacts.' + key, [], Input)}</b>
                    </div>
                })}
            </div>
        </form>
    )
}

const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({form: 'edit-profile'})(ProfileDataForm);

export default ProfileDataFormReduxForm;