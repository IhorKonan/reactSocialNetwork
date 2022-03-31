import preloader from './../../img/preloader.gif';
import React from "react";
import styles from './Preloader.module.css'

let Preloader = () =>{
    return (
        <div>
           <img src={preloader} className={styles.reloader}/>
        </div>
    )
}

export default Preloader;