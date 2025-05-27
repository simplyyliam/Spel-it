import React, { HTMLAttributes } from "react";

export const PasueWrapper: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={`flex items-center justify-center w-screen h-screen absolute bg-black/35 backdrop-blur-sm ${className}`} {...props}>
        {children}
    </div>
  );
};
