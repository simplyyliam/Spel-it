import React, { HTMLAttributes } from "react";

export const CustomCard: React.FC<HTMLAttributes<HTMLDivElement>> = ({
    children, className, ...props
}) => {
    return (
        <div className={`absolute top-20 left-10 border-1 border-black rounded-xl min-w-[5em] min-h-[2em] flex items-center justify-center ${className}`} {...props}>{children}</div>
    )
}