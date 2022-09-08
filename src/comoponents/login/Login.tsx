import React from "react";
import { connect } from "react-redux";
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


type MapStateToPropsType = {
    captchaUrl: string | null
    isAuth: boolean
}
type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}
type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>

type LoginFormOwnProps = {
    captchaUrl: string | null
}
const Login: React.FC<MapStateToPropsType & MapDispatchPropsType> = (props) => {
    const onSubmit = (formData: LoginFormValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }
    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />

        </div>
    )
}
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
const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({ form: 'login' })(LoginForm)

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, { login })(Login);