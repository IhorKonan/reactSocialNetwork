const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

let initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likeCount: 12 },
        { id: 2, message: "Guitar HERO!!", likeCount: 25 },
        { id: 3, message: "It's my second post", likeCount: 11 },
        { id: 4, message: "It's my first post", likeCount: 16 }
      ],
      newPostText: 'You text',
      profile: null
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
        default: 
            return state;
        }
}

export const addPostActionCreater = () => ({ type: ADD_POST })
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const updateNewPostTextActionCreater = (text) => 
    ({ type: UPDATE_NEW_POST_TEXT, newText: text })

export default profileReducer;