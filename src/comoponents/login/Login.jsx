import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { required } from "../../utilits/validators/validators";
import { createField, Input } from "../common/FormsControls/FormsControls";
import { login } from "../../redux/auth-reducer";
import { Redirect } from "react-router-dom";
import style from '../common/FormsControls/FormsControls.module.css';

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }
    if(props.isAuth){
        return <Redirect to={'/profile'} />
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
            
        </div>
    )
}
const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return (
            <form onSubmit={handleSubmit}>
                {createField("Email", "email", [required], Input)}
                {createField("Password", "password", [required], Input, {type: "password"})}
                {createField(null, "rememberMe", [], Input, {type: "checkbox"}, "remember me")}
                {captchaUrl && <img src={captchaUrl}/>}
                {captchaUrl && createField('Symbols from image', "captcha", [required], Input, {})}
                { error && <div className={style.formErrorSumary}>
                    { error }
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
const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)
const mapStateToProps = (state) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, {login} )(Login);