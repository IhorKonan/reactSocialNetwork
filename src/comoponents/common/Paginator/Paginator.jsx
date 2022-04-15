import React, { useState } from "react";
import styles from "./Paginator.module.css";
import cn from 'classnames';


let Paginator = ({ currentPage, onPageChanged, totalItemsCount, pageSize, portionSize = 20 }) => {
    let pagesCount = Math.ceil( totalItemsCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    
    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNuber = portionNumber * portionSize;

    return (
        <div className={styles.paginator}>
            { portionNumber > 1 && <button onClick={() => { setPortionNumber(portionNumber - 1)}}>Prev</button> }
                {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNuber).map((p) => {
                    return <span className={cn({[styles.selectedPage] : currentPage === p}, styles.pageNumber)} 
                        key={p}
                        onClick={() => {
                            onPageChanged(p);
                        }}>{p}</span>
                })}
            { portionCount > portionNumber && <button onClick={() => { setPortionNumber(portionNumber + 1)}}>Next</button> }
        </div>
    )
}

export default Paginator;