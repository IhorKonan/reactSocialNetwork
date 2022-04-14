import React from "react";
import { connect } from "react-redux";
import { follow, setCurrentPage, unfollow, toggleFollowingProgress, requestUsers } from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader";
import { compose } from "redux";
import { getTotalUsersCount, getUsers, getPageSize, getCurrentPage, getIsFetching, getFollowingProgress } from "../../redux/users-selectors";

class UsersContainerComponent extends React.Component {
    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.requestUsers(currentPage, pageSize)
    }
    onPageChanged = (pageNumber) => {
        const {pageSize} = this.props;
        this.props.requestUsers(pageNumber, pageSize)
    }
    render() {
        return <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            onPageChanged={this.onPageChanged}
            users={this.props.users}
            unfollow={this.props.unfollow}
            follow={this.props.follow}
            followingInProgress={this.props.followingInProgress} />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingProgress(state)
    }
}

export default compose(
    connect(mapStateToProps, { follow, unfollow, setCurrentPage, 
        toggleFollowingProgress, requestUsers })
)(UsersContainerComponent);
