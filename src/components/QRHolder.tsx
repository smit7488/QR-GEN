interface QRHolderProps {
  children?: React.ReactNode; // Allows QR Code to be placed inside
}

export default function QRHolder({ children }: QRHolderProps) {
  return (
    <div className="qr-holder">
      {children ? children : <div className="placeholder">QR Code will appear here</div>}
    </div>
  );
}
