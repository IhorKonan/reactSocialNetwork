import React from "react";
import styles from "./users.module.css";



const Users = (props) => {
    if(props.users.length === 0){
        props.setUsers([
            { id: 1, photoUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', followed: true, fullName: 'Dmitry', status: 'I am full stack developer', location: { city: 'Kiev', country: 'Ukraine' } },
            { id: 2, photoUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', followed: false, fullName: 'Ihor', status: 'I am a boss this live', location: { city: 'Kharkiv', country: 'Ukraine' } },
            { id: 3, photoUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', followed: true, fullName: 'Vlad', status: 'I hate pop rock!', location: { city: 'Lviv', country: 'Ukraine' } },
            { id: 4, photoUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', followed: false, fullName: 'Marina', status: 'I love my car BMW', location: { city: 'Kherson', country: 'Ukraine' } },
        ]
        )
    }
    
    return (
        <div>
            {
                props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <img src={u.photoUrl} className={styles.usersPhoto} />
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => { props.unfollow(u.id) }}>Unfollow</button>
                                : <button onClick={() => { props.follow(u.id) }}>Follow</button>}
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{u.fullName}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{u.location.country}</div>
                            <div>{u.location.city}</div>
                        </span>
                    </span>
                </div>)
            }
        </div>
    )
}

export default Users;