// @ts-ignore
import { APIResponseType } from './api.ts';
// @ts-ignore
import { ProfileType, PhotosType } from './../types/types.ts';
// @ts-ignore
import { instance } from './api.ts';



type SavePhotoResponseDataType = {
    photos: PhotosType
}

export const profileAPI = {
    getProfile(userId: number){
        return instance.get<ProfileType>(`profile/` + userId).then(res => res.data)
    },
    getStatus(userId: number){
        return instance.get<string>('profile/status/' + userId).then(res => res.data)
    },
    upDateStatus(status: string){
        return instance.put<APIResponseType>('profile/status/', { status }).then(res => res.data)
    },
    savePhoto(photoFile: File){
        let formData = new FormData();
        formData.append('image', photoFile)
        return instance.put<APIResponseType<SavePhotoResponseDataType>>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data)
    },
    saveProfile(profile: ProfileType){
        return instance.put<APIResponseType>('profile', profile ).then(res => res.data)
    }

}