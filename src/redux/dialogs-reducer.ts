// @ts-ignore
import { InfernActionsTypes } from "./redux-store.ts";

type DialogType = {
    id: number
    name: string
}
type MessageType = {
    id: number
    message: string
}
let initialState = {
    messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'How are you?' },
        { id: 3, message: 'Yo' },
        { id: 4, message: 'Hello' },
        { id: 5, message: 'Where you?' },
        { id: 6, message: 'How much?' },
    ] as Array<MessageType>,
    dialogs: [
        { id: 1, name: 'Ihor' },
        { id: 2, name: 'Sveta' },
        { id: 3, name: 'Viktor' },
        { id: 4, name: 'Andrey' },
        { id: 5, name: 'Katya' },
        { id: 6, name: 'Valery' },
    ] as Array<DialogType>
};


const dialogsReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/DIALOGS/SEND-MESSAGE':
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, { id: 7, message: body }],
            }
        default:
            return state;
    }
}

export const actions = {
    sendMessage: (newMessageBody: string) => ({ type: 'SN/DIALOGS/SEND-MESSAGE', newMessageBody } as const)
}


export default dialogsReducer;


export type InitialStateType = typeof initialState
type ActionTypes = InfernActionsTypes<typeof actions>