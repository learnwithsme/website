import * as React from "react"

export const Content = ({ children, className }) =>
    <div className={`max-w-5xl mx-auto mt-7 ${className}`}>
        {children}
    </div>