// @ts-ignore
import preloader from './../../../img/preloader.gif'
import React from "react";
// @ts-ignore
import styles from './Preloader.module.css'


let Preloader: React.FC = () =>{
    return (
        <div>
           <img src={preloader} className={styles.reloader} alt='preloader'/>
        </div>
    )
}

export default Preloader;