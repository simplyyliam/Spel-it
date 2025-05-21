import React from "react";
import { HTMLAttributes } from "react";

export const SectionWrapper: React.FC<HTMLAttributes<HTMLDivElement>> = ({
    children, className, ...props 
}) => {
    return (
        <div className={`flex items-center justify-center w-screen h-screen ${className}`} {...props}>{children}</div>
    )
}