import React, { useEffect } from "react";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import { FilterType, requestUsers } from "../../redux/users-reducer.ts";
// @ts-ignore
import { getTotalUsersCount, getCurrentPage, getPageSize, getUsersFilter, getUsers, getFollowingProgress } from "../../redux/users-selectors.ts";
// @ts-ignore
import Paginator from "../common/Paginator/Paginator.tsx";
// @ts-ignore
import User from "./User.tsx";
// @ts-ignore
import UsersSearchForm from "./UsersSearchForm.tsx";

type PropsType = {}

export const Users: FC<PropsType> = (props) => {
    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingProgress)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [])

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }
    const follow = (userId: number) => {
        dispatch(follow(userId))
    }
    const unfollow = (userId: number) => {
        dispatch(unfollow(userId))
    }
    return (
        <div>
            <div>
                <UsersSearchForm onFilterChanged={onFilterChanged}/>
            </div>
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalItemsCount={totalUsersCount} pageSize={pageSize} />
            <div>
                {
                    users.map(u => <User key={u.id} user={u} followingInProgress={followingInProgress} unfollow={unfollow} follow={follow} />
                    )}
            </div>
        </div>
    )
}
