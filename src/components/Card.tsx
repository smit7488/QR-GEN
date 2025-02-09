import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string; // ✅ Added className prop
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  );
}
