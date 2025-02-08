import { useEffect, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import QRHolder from "@/components/QRHolder";

interface CanvasQRCodeProps {
  text: string;
  uploadedSVG: string | null;
}

export default function CanvasQRCode({ text, uploadedSVG }: CanvasQRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const downloadQR = () => {
    if (!canvasRef.current) return;

    const url = canvasRef.current.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "branded_qrcode.png";
    a.click();
  };

  return (
    <Card title="Generated QR Code">
      <QRHolder>
        <QRCodeCanvas ref={canvasRef} value={text} size={200} />
      </QRHolder>

      <Button onClick={downloadQR} variant="secondary">
        Download PNG
      </Button>
    </Card>
  );
}
