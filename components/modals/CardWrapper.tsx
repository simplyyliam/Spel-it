import React, { HTMLAttributes } from "react";

export const CardWrapper: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={`bg-primary text-BG shadow-xl p-3 border-border border-[1.5px] rounded-lg mb-4  ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
