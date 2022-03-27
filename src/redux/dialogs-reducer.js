const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
    messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'How are you?' },
        { id: 3, message: 'Yo' },
        { id: 4, message: 'Hello' },
        { id: 5, message: 'Where you?' },
        { id: 6, message: 'How much?' },
      ],
      dialogs: [
        { id: 1, name: 'Ihor' },
        { id: 2, name: 'Sveta' },
        { id: 3, name: 'Viktor' },
        { id: 4, name: 'Andrey' },
        { id: 5, name: 'Katya' },
        { id: 6, name: 'Valery' },
      ],
      newMessageText: ''
};

const dialogsReducer = (state = initialState, action) => {
    switch(action.type){
        case UPDATE_NEW_MESSAGE_BODY:
            return {
                ...state,
                newMessageBody: action.body
            }
        case SEND_MESSAGE:
            let body = state.newMessageBody;
            return {
                ...state,
                newMessageBody: '',
                messages: [...state.messages, {id: 7, message: body}]
            }
        default: 
            return state;
    }
}

export const sendMessageCreator = () => ({ type: SEND_MESSAGE })
export const updateNewMessageBodyCreater = (body) => 
    ({ type: UPDATE_NEW_MESSAGE_BODY, body: body })


export default dialogsReducer;