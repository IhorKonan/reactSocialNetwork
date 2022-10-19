import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { InjectedFormProps, reduxForm } from "redux-form";
// @ts-ignore
import { required } from "../../utilits/validators/validators.ts";
// @ts-ignore
import { createField, Input, GetStringKeys } from "../common/FormsControls/FormsControls.tsx";
// @ts-ignore
import { login } from "../../redux/auth-reducer.ts";
import { Redirect } from "react-router-dom";
// @ts-ignore
import style from '../common/FormsControls/FormsControls.module.css';
// @ts-ignore
import { AppStateType } from "../../redux/redux-store.tsx";







const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({ handleSubmit, error, captchaUrl }) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginFormValuesTypeKeys>("Email", "email", [required], Input)}
            {createField<LoginFormValuesTypeKeys>("Password", "password", [required], Input, { type: "password" })}
            {createField<LoginFormValuesTypeKeys>(null, "rememberMe", [], Input, { type: "checkbox" }, "remember me")}
            {captchaUrl && <img src={captchaUrl} alt='login'/>}
            {captchaUrl && createField<LoginFormValuesTypeKeys>('Symbols from image', "captcha", [required], Input, {})}
            {error && <div className={style.formErrorSumary}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
            <div>
                Данные тестового аккаунта:
                Email: free@samuraijs.com
                Password: free
            </div>
        </form>
    )
}
type LoginFormOwnProps = {
    captchaUrl: string | null
}
type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({ form: 'login' })(LoginForm)


export const Login: React.FC = () => {
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    
    const dispatch = useDispatch()

    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }
    if (isAuth) {
        return <Redirect to={'/profile'} />
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />

        </div>
    )
}
