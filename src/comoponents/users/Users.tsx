import React, { useEffect } from "react";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
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
import * as queryString from 'query-string'
// @ts-ignore
import { UserType } from "../../types/types.ts";


type PropsType = {}

type QueryParamsType = {term?: string, page?: string, friend?: string}

export const Users: FC<PropsType> = (props) => {
    const users: UserType = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter: QueryParamsType = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingProgress)

    const dispatch = useDispatch()
    const history = useHistory()
    
    useEffect(() => {
        const parsed: QueryParamsType = queryString.parse(history.location.search.substring(1))

        let actualPage = currentPage
        let actualFilter = filter as FilterType

        if(!!parsed.page) actualPage = Number(parsed.page)
        if(!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}
        switch(parsed.friend) {
            case 'null':
                actualFilter = {...actualFilter, friend: null}
                break
            case 'true':
                actualFilter = {...actualFilter, friend: true}
                break
            case 'false':
                actualFilter = {...actualFilter, friend: false}
                break
        }
        // if(!!parsed.friend) actualFilter = {...actualFilter, friend: parsed.friend === "null" ? null : parsed.friend === 'true' ? true : false}
         
        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [])
    useEffect(() => {
        const query: QueryParamsType = {}
        if(!!filter.term) query.term = filter.term
        if(filter.friend !== null) query.friend = String(filter.friend)
        if(currentPage !== 1) query.page = String(currentPage)
        history.push({
            pathname: '/developers',
            search: queryString.stringify(query)
            // `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
        })
    }, [filter, currentPage])

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
