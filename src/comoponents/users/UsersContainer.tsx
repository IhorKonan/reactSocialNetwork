import React from "react";
import { connect } from "react-redux";
// @ts-ignore
import { follow, unfollow, requestUsers, FilterType } from "../../redux/users-reducer.ts";
// @ts-ignore
import Users from "./Users.tsx";
// @ts-ignore
import Preloader from "../common/Preloader/Preloader.tsx";
import { compose } from "redux";
// @ts-ignore
import { getTotalUsersCount, getPageSize, getCurrentPage, getIsFetching, getFollowingProgress, getUsers, getUsersFilter } from "../../redux/users-selectors.ts";
// @ts-ignore
import { UserType } from "../../types/types.ts";
// @ts-ignore
import { AppStateType } from "../../redux/redux-store.ts";



type MapStateToPropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UserType>
    followingInProgress: Array<number>
    filter: FilterType
}
type MapDispatchPropsType = {
    getUsers: (currentPage: number, pageSize: number, filter: FilterType) => void
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}
type OwnPropsType = {
    pageTitle: string
}
type PropsType = MapStateToPropsType & MapDispatchPropsType & OwnPropsType

class UsersContainerComponent extends React.Component<PropsType> {
    componentDidMount() {
        const {currentPage, pageSize, filter} = this.props;
        this.props.getUsers(currentPage, pageSize, filter);
    }
    onPageChanged = (pageNumber: number) => {
        const {pageSize, filter} = this.props;
        this.props.getUsers(pageNumber, pageSize, filter)
    }
    onFilterChanged = (filter: FilterType) => {
        const {pageSize} = this.props;
        this.props.getUsers(1, pageSize, filter)
    }
    render() {
        return <>
        <h2>{this.props.pageTitle}</h2>
        {this.props.isFetching ? <Preloader /> : null}
        <Users pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            onPageChanged={this.onPageChanged}
            onFilterChanged={this.onFilterChanged}
            users={this.props.users}
            unfollow={this.props.unfollow}
            follow={this.props.follow}
            followingInProgress={this.props.followingInProgress}
            totalUsersCount={this.props.totalUsersCount} />
        </>
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingProgress(state),
        filter: getUsersFilter(state)
    }
}

export default compose(
    connect<MapStateToPropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, { follow, unfollow, getUsers: requestUsers })
)(UsersContainerComponent);
