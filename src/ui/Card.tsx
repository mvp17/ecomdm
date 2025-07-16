import React, { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={cn("bg-white rounded-lg shadow p-4", className)}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardProps> = ({ children, className }) => {
  return <div className={cn("border-b pb-2 mb-2", className)}>{children}</div>;
};

export const CardTitle: React.FC<CardProps> = ({ children, className }) => {
  return <h2 className={cn("text-lg font-semibold", className)}>{children}</h2>;
};

export const CardContent: React.FC<CardProps> = ({ children, className }) => {
  return <div className={cn("text-gray-700", className)}>{children}</div>;
};
