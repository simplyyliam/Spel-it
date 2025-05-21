import React, { HTMLAttributes } from "react";

export const Score: React.FC<HTMLAttributes<HTMLSpanElement>> = ({
    children, className, ...props
}) => {
    return (
        <span className={`${className}`} {...props}>{children}</span>
    )
}