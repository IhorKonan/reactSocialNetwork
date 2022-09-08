// @ts-ignore
import { InfernActionsTypes , BaseThunkType} from './redux-store.ts';
// @ts-ignore
import { secutiryAPI } from './../api/security-api.ts';
// @ts-ignore
import { authAPI } from './../api/auth-api.ts';
import { FormAction, stopSubmit } from 'redux-form';
// @ts-ignore
import { ResultCodesEnum, ResultCodeForCaptcha } from '../api/api.ts';



let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    captchaUrl: null as string | null
};


const authReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/AUTH/SET_USER_DATA':
        case 'SN/AUTH/GET_CAPTCHA_URL_SUCCES':
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'SN/AUTH/SET_USER_DATA', payload: { userId, email, login, isAuth }
    } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({ type: 'SN/AUTH/GET_CAPTCHA_URL_SUCCES', payload: { captchaUrl } } as const)
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let meData = await authAPI.me();
    if (meData.resultCode === ResultCodesEnum.Success) {
        let { id, login, email } = meData.data;
        dispatch(actions.setAuthUserData(id, email, login, true));
    }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe, captcha);
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(getAuthUserData());
        } else {
            if(data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired){
                dispatch(getCaptchaUrl());
            }
            let message = data.messages.length > 0 ? data.messages[0] : 'Some error';
            dispatch(stopSubmit('login', {_error: message}));
        }
}
export const logout = (): ThunkType  => async (dispatch) => {
    let response = await authAPI.logout()
        if (response.data.resultCode === 0) {
            dispatch(actions.setAuthUserData(null, null, null, false))
        }
}
export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const data = await secutiryAPI.getCaptchaUrl()
    const captchaUrl = data.url
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}


export default authReducer;

export type InitialStateType = typeof initialState
type ActionTypes = InfernActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionTypes | FormAction>