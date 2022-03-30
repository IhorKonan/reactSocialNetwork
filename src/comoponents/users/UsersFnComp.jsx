// import * as axios from "axios";
// import React from "react";
// import styles from "./users.module.css";
// import userPhoto from '../../img/userlogo.png'



// const Users = (props) => {
//     let getUsers = () => {
//         if(props.users.length === 0){
//             axios.get('https://social-network.samuraijs.com/api/1.0/users').then(respons => {
//                 props.setUsers(respons.data.items);
//             });
//         }
//     }
    
//     // [
//     //     { id: 1, photoUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', followed: true, fullName: 'Dmitry', status: 'I am full stack developer', location: { city: 'Kiev', country: 'Ukraine' } },
//     //     { id: 2, photoUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', followed: false, fullName: 'Ihor', status: 'I am a boss this live', location: { city: 'Kharkiv', country: 'Ukraine' } },
//     //     { id: 3, photoUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', followed: true, fullName: 'Vlad', status: 'I hate pop rock!', location: { city: 'Lviv', country: 'Ukraine' } },
//     //     { id: 4, photoUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', followed: false, fullName: 'Marina', status: 'I love my car BMW', location: { city: 'Kherson', country: 'Ukraine' } },
//     // ]
//     return (
//         <div>
//             <button onClick={getUsers}>Get Users</button>
//             {
//                 props.users.map(u => <div key={u.id}>
//                     <span>
//                         <div>
//                             <img src={ u.photos.small !== null ? u.photos.small : userPhoto } className={styles.usersPhoto} />
//                         </div>
//                         <div>
//                             {u.followed
//                                 ? <button onClick={() => { props.unfollow(u.id) }}>Unfollow</button>
//                                 : <button onClick={() => { props.follow(u.id) }}>Follow</button>}
//                         </div>
//                     </span>
//                     <span>
//                         <span>
//                             <div>{u.name}</div>
//                             <div>{u.status}</div>
//                         </span>
//                         <span>
//                             <div>{'u.location.country'}</div>
//                             <div>{'u.location.city'}</div>
//                         </span>
//                     </span>
//                 </div>)
//             }
//         </div>
//     )
// }

// export default Users;