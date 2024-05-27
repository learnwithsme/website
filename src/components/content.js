import * as React from "react"

/**
 *  Any text content, so that it will be neatly responsive.
 * @param {{
 *  children,
 *  className: string
 * }} 
 */
export const Content = ({ 
    children, 
    className = '' 
}) =>
    <div className={`max-w-5xl mx-auto mt-7 ${className}`}>
        {children}
    </div>