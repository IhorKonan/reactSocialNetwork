// @ts-ignore
import { InfernActionsTypes } from './redux-store.ts';
// @ts-ignore
import { getAuthUserData } from './auth-reducer.ts';


let initialState = {
    initialized: false
}

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/APP/INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

export const actions = {
    initializedSuccsess: () => ({ type: 'SN/APP/INITIALIZED_SUCCESS' } as const)
}
export const initializeApp = () => (dispatch: any) => {

    let promise = dispatch(getAuthUserData());
    promise.then(() => {
        dispatch(actions.initializedSuccsess());
    });
}

export default appReducer;

export type InitialStateType = typeof initialState
type ActionsType = InfernActionsTypes<typeof actions>
