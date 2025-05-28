import { HTMLAttributes } from "react"



export const SignBoard: React.FC<HTMLAttributes<HTMLDivElement>> = ({
    children, className, ...props
}) => {
    return (
        <div className={`bg-secondary text-xl text-primary border-border border-2 rounded-md ${className}`} {...props}>{children}</div>
    )
}