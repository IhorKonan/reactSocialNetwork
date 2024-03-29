import { createSelector } from 'reselect';
// @ts-ignore
import { AppStateType } from './redux-store.ts';
const getUsersSelector = (state: AppStateType) => {
    return state.usersPage.users;
}
export const getUsers = createSelector(getUsersSelector, 
    (users) => {
    return users.filter((u: any) => true);
})

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize;
}
export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount;
}
export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage;
}
export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching;
}
export const getFollowingProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress;
}
export const getUsersFilter = (state: AppStateType) => {
    return state.usersPage.filter;
}