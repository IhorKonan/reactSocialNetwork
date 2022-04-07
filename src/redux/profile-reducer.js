import { profileAPI, usersAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

let initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likeCount: 12 },
        { id: 2, message: "Guitar HERO!!", likeCount: 25 },
        { id: 3, message: "It's my second post", likeCount: 11 },
        { id: 4, message: "It's my first post", likeCount: 16 }
      ],
      newPostText: 'You text',
      profile: null,
      status: ''
};

const profileReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_POST:  {
            let newPost = {
            id: 5,
            message: state.newPostText,
            likeCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: '',
            }
        }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newText             
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        default: 
            return state;
        }
}

export const addPostActionCreater = () => ({ type: ADD_POST })
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({type: SET_STATUS, status})

export const updateNewPostTextActionCreater = (text) => 
    ({ type: UPDATE_NEW_POST_TEXT, newText: text })

export const getUserProfile = (userId) => (dispatch) => {
    usersAPI.getProfile(userId)
    .then(response => {
        dispatch(setUserProfile(response.data));
    });
}
export const getStatus = (userId) => (dispatch) => {
    profileAPI.getStatus(userId)
    .then(response => {
        dispatch(setStatus(response.data));
    });
}
export const upDateStatus = (status) => (dispatch) => {
    profileAPI.upDateStatus(status)
    .then(response => {
        if(response.data.resultCode === 0){
            dispatch(setStatus(status));
        }
    });
}

export default profileReducer;