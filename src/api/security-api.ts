// @ts-ignore
import { instance } from './api.ts';


type GetCaptchaUrlResponseType = {
    url: string
}
export const secutiryAPI = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaUrlResponseType>('security/get-captcha-url').then(res => res.data)
    }
}