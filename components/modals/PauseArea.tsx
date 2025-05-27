import React, { HTMLAttributes } from "react";

export const PauseArea: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-8 items-center justify-center w-auto h-auto rotate-15 relative left-10 top-5  ${className}`} {...props}>
        {children}
    </div>
  );
};
