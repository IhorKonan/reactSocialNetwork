import React from 'react';
// @ts-ignore
import { FieldValidatorType } from '../../../utilits/validators/validators.ts';
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from "redux-form";
// @ts-ignore
import styles from './FormsControls.module.css';


type FormControlPropsType = {
    meta: WrappedFieldMetaProps
    children: React.ReactNode
}

const FormControl: React.FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {
    const showError = touched && error;
    return (
        <div className={styles.formControl + " " + ( showError ? styles.error : '' )} >
            <div>
                {children}
            </div>
            { showError && <span>{error}</span>}
        </div>
    )
}


export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    // const {input, meta, child, ...restProps} = props;
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
}
export const Input: React.FC<WrappedFieldProps> = (props) => {
    // const {input, meta, child, ...restProps} = props;
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}
export function createField<FormsKeysType extends string>(placeholder: string, 
                            name: FormsKeysType, 
                            validators: Array<FieldValidatorType>, 
                            component: React.FC<WrappedFieldProps>, 
                            props = {}, text = '')  {
    return (
    <div>
        <Field placeholder={placeholder} name={name} validate={validators} component={component} {...props}/> {text}
    </div> 
)};

export type GetStringKeys<T> = Extract<keyof T, string>