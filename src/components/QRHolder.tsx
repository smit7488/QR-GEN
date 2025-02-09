import { ReactNode } from "react";
import DefaultQR from "@/components/DefaultQR";

interface QRHolderProps {
  children: ReactNode;
  className?: string; // Allow custom classes
}

export default function QRHolder({ children, className = "" }: QRHolderProps) {
  return (
    <div className={`qr-holder ${className}`}>
       {children ? children : <DefaultQR />}
    </div>
  );
}

