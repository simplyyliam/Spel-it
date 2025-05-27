import React, { HTMLAttributes } from "react";

export const PauseMenu: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={`absolute flex items-center justify-center bg-BG text-text border-border border-[1.5px] w-[45em] h-[70em] -left-30 -rotate-15  ${className}`} {...props}>
        {children}
    </div>
  );
};
