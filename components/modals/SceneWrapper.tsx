import React from "react";
import { HTMLAttributes } from "react";

export const SceneWrapper: React.FC<HTMLAttributes<HTMLDivElement>> = ({
    children, className, ...props 
}) => {
    return (
        <div className={`flex items-center justify-center w-screen h-screen p-8 ${className}`} {...props}>{children}</div>
    )
}