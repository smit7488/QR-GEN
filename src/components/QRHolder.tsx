import DefaultQR from "@/components/DefaultQR";

interface QRHolderProps {
  children?: React.ReactNode;
}

export default function QRHolder({ children }: QRHolderProps) {
  return (
    <div className="qr-holder">
      {children ? children : <DefaultQR />}
    </div>
  );
}
