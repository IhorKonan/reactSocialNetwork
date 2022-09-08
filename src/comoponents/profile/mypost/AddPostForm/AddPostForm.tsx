import React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";   
// @ts-ignore
import { maxLengthCreator, required } from "../../../../utilits/validators/validators.ts";
// @ts-ignore
import { createField, GetStringKeys, Input } from '../../../common/FormsControls/FormsControls.tsx';

const maxLenght10 = maxLengthCreator(10);
type PropsOwnType = {

}
export type AddPostFormValuesType = {
    newPostText: string
}
type AddPostFormValuesKeys = GetStringKeys<AddPostFormValuesType>

const AddPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsOwnType> & PropsOwnType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<AddPostFormValuesKeys>("Enter your message", "newPostText", [required, maxLenght10], Input)}
                {/* <Field name="newPostText" component={Textarea} placeholder='Enter your message' validate={[required, maxLenght10]} /> */}
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

export default reduxForm<AddPostFormValuesType, PropsOwnType>({form: 'profile-add-post'})(AddPostForm)