import React, { Suspense } from "react";
// @ts-ignore
import Preloader from "../comoponents/common/Preloader/Preloader.tsx";



export function withSuspens<WCP>(WrappedComponent: React.ComponentType<WCP>) {
    return (props: WCP) => {
        return <Suspense fallback={<div><Preloader /></div>}><WrappedComponent {...props} /></Suspense>
    }
}