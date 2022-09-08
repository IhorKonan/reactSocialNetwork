import React from "react";
import { FC } from "react";
// @ts-ignore
import { UserType } from "../../types/types.ts";
// @ts-ignore
import Paginator from "../common/Paginator/Paginator.tsx";
// @ts-ignore
import User from "./User.tsx";

type PropsType = {
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    totalUsersCount: number
    pageSize: number
    users: Array<UserType>
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

let Users: FC<PropsType> = ({ currentPage, onPageChanged, totalUsersCount, pageSize, users, ...props }) => {
    return (
        <div>
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalItemsCount={totalUsersCount} pageSize={pageSize} />
            <div>
                {
                    users.map(u => <User key={u.id} user={u} followingInProgress={props.followingInProgress} unfollow={props.unfollow} follow={props.follow} />
                )}
            </div>
        </div>
    )
}

export default Users;