import React, { HTMLAttributes } from "react";

export const PauseArea: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={`flex flex-col items-center justify-center w-auto h-auto  ${className}`} {...props}>
        {children}
    </div>
  );
};
