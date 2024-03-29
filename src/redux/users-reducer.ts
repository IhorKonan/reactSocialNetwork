// @ts-ignore
import { BaseThunkType, InfernActionsTypes } from './redux-store.ts';
// @ts-ignore
import { UserType } from './../types/types.ts';
// @ts-ignore
import { usersAPI } from './../api/users-api.ts';
// @ts-ignore
import { updateObjectInArray } from "../utilits/object-helpers.ts";
import { Dispatch } from 'redux';
// @ts-ignore
import { APIResponseType } from '../api/api.ts';



let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>, //array of user ids
    filter: {
        term: '',
        friend: null as null | boolean
    }
}
const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/USERS/FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', { followed: true })
            }
        case 'SN/USERS/UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', { followed: false })
            }
        case 'SN/USERS/SET_USERS':
            return { ...state, users: action.users }
        case 'SN/USERS/SET_CURRENT_PAGE':
            return { ...state, currentPage: action.currentPage }
        case 'SN/USERS/SET_TOTAL_USERS_COUNT':
            return { ...state, totalUsersCount: action.count }
        case 'SN/USERS/SET_FILTER':
            return { ...state, filter: action.payload }
        case 'SN/USERS/TOGGLE_IF_FETCHING':
            return { ...state, isFetching: action.isFetching }
        case 'SN/USERS/TOGGLE_IF_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
}
export const actions = {
    followSuccess: (userId: number) => ({ type: 'SN/USERS/FOLLOW', userId } as const),
    unfollowSuccess: (userId: number) => ({ type: 'SN/USERS/UNFOLLOW', userId } as const),
    setUsers: (users: Array<UserType>) => ({ type: 'SN/USERS/SET_USERS', users } as const),
    setCurrentPage: (currentPage: number) => ({ type: 'SN/USERS/SET_CURRENT_PAGE', currentPage } as const),
    setTotalUsersCount: (totalUsersCount: number) => ({ type: 'SN/USERS/SET_TOTAL_USERS_COUNT', count: totalUsersCount } as const),
    setFilter: (filter: FilterType) => ({ type: 'SN/USERS/SET_FILTER', payload: filter } as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: 'SN/USERS/TOGGLE_IF_FETCHING', isFetching } as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({ type: 'SN/USERS/TOGGLE_IF_FOLLOWING_PROGRESS', isFetching, userId } as const)
}
export const requestUsers = (page: number, pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(page));
        dispatch(actions.setFilter(filter));
        let data = await usersAPI.getUsers(page, pageSize, filter.term, filter.friend);
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
    }
}
const _followUnfollowFlow = async (dispatch: Dispatch<ActionTypes>, 
                                    userId: number, 
                                    apiMethod: (userId: number) => Promise<APIResponseType>, 
                                    actionCreator: (userId: number) => ActionTypes) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId);
                                        
    if (response.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
}
export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
       await _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess);
    }
}
export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
       await _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess);
    }
}

export default usersReducer;

export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter
type ActionTypes = InfernActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionTypes>