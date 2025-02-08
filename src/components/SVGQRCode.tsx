import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import QRHolder from "@/components/QRHolder";

interface SVGQRCodeProps {
  text: string;
  uploadedSVG: string | null;
}

export default function SVGQRCode({ text, uploadedSVG }: SVGQRCodeProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const downloadQR = () => {
    const svgElement = document.getElementById("qr-code");
    if (!svgElement) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "branded_qrcode.svg";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card title="Generated QR Code">
      <QRHolder>
        <QRCodeSVG id="qr-code" value={text} size={200} />
        {uploadedSVG && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white rounded-full shadow-lg p-2">
              <img src={uploadedSVG} alt="Logo" className="w-10 h-10" />
            </div>
          </div>
        )}
      </QRHolder>

      <Button onClick={downloadQR} variant="secondary">
        Download SVG
      </Button>
    </Card>
  );
}
