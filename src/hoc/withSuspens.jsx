import React, { Suspense } from "react";
import Preloader from "../comoponents/common/Preloader";


export const withSuspens = (Component) => {
    return (props) => {
        return <Suspense fallback={<div><Preloader /></div>}><Component {...props} /></Suspense>
    }
}