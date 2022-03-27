const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likeCount: 12 },
        { id: 2, message: "Guitar HERO!!", likeCount: 25 },
        { id: 3, message: "It's my second post", likeCount: 11 },
        { id: 4, message: "It's my first post", likeCount: 16 }
      ],
      newPostText: 'You text'
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
        default: 
            return state;
        }
}

export const addPostActionCreater = () => ({ type: ADD_POST })
export const updateNewPostTextActionCreater = (text) => 
    ({ type: UPDATE_NEW_POST_TEXT, newText: text })

export default profileReducer;