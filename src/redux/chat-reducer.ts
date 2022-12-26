import { Dispatch } from 'redux';
// @ts-ignore
import { InfernActionsTypes , BaseThunkType} from './redux-store.ts';
import { FormAction } from 'redux-form';
// @ts-ignore
import { ChatMessageApiType, StatusType, chatApi } from '../api/chat-api.ts';
import { v1 } from 'uuid'




type ChatMessageType = ChatMessageApiType & {id: string}
let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
}


const chatReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/CHAT/MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map(m => ({...m, id: v1() }))].filter((m, index, array) => index >= array.length - 100)
            }
        case 'SN/CHAT/STATUS_CHANGED':
            return {
                ...state,
                status: action.payload.status
            }
        default:
            return state;
    }
}

export const actions = {
    messagesReceived: (messages: ChatMessageApiType[]) => ({
        type: 'SN/CHAT/MESSAGES_RECEIVED', payload: { messages }
    } as const),
    statusChanged: (status: StatusType) => ({
        type: 'SN/CHAT/STATUS_CHANGED', payload: { status }
    } as const)
}
let _newMessageHandler: ((messages: ChatMessageApiType[]) => void) | null = null
const newMessageHandlerCreater = (dispatch: Dispatch) => {
    if(_newMessageHandler === null) {
        _newMessageHandler = (messages: ChatMessageApiType[]) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessageHandler
}
let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreater = (dispatch: Dispatch) => {
    if(_statusChangedHandler === null) {
        _statusChangedHandler = (status: StatusType) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _statusChangedHandler
}
export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatApi.start()
    chatApi.subscribe('message-received', newMessageHandlerCreater(dispatch))
    chatApi.subscribe('status-changed', statusChangedHandlerCreater(dispatch))
}
export const stoptMessagesListening = (): ThunkType => async (dispatch) => {
    chatApi.unsubscribe('message-received', newMessageHandlerCreater(dispatch))
    chatApi.unsubscribe('status-changed', statusChangedHandlerCreater(dispatch))
    chatApi.stop()
}
export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatApi.sendMessage(message)
}



export default chatReducer;

export type InitialStateType = typeof initialState
type ActionTypes = InfernActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionTypes | FormAction>