import React, { HTMLAttributes } from "react";

export const ResultCard: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={`flex items-center justify-center text-6xl rounded-xl w-[250px] h-[260px] shadow-2xl shadow-black/35 border-border border-2 relative ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const ResultTitle: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  style,
  ...props
}) => {
  return (
    <div
      className={`text-xl absolute bottom-0 w-full h-12 rounded-b-lg flex items-center justify-center bg-primary text-secondary ${className}`}
      {...props}
      style={{
        boxShadow: `
           0px -14px 30px -8px rgba(0, 0, 0, 0.4)
            `,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
