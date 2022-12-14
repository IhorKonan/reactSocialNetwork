import React from "react";
// @ts-ignore
import styles from "./users.module.css";
// @ts-ignore
import userPhoto from '../../img/userlogo.png'
import { NavLink } from "react-router-dom";
// @ts-ignore
import { UserType } from "../../types/types.ts";


type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}
let User: React.FC<PropsType> = ({ user, followingInProgress, unfollow, follow }) => {
    return (
        <div>
            <span>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small !== null ? user.photos.small : userPhoto} className={styles.usersPhoto} alt={"Your profile"} />
                    </NavLink>
                </div>
                <div>
                    {user.followed
                        ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => { unfollow(user.id) }}>Unfollow</button>
                        : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => { follow(user.id) }}>Follow</button>}
                </div>
            </span>
            <span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>
                <span>
                    <div>{'user.location.country'}</div>
                    <div>{'user.location.city'}</div>
                </span>
            </span>
        </div>
    )
}

export default User;