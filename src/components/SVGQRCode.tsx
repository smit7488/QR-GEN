"use client";

import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import Card from "@/components/Card";

interface SVGQRCodeProps {
  text: string;
  uploadedSVG: string | null;
  qrColor: string;
  borderRadius: number;
}

export default function SVGQRCode({ text, uploadedSVG, qrColor, borderRadius }: SVGQRCodeProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const qrSize = 200; // Size of the QR code
  const logoSize = qrSize * 0.2; // 25% of QR code size
  const paddingSize = logoSize * 1.3; // 30% larger than the logo

  return (
    <Card>
      <div className="relative flex justify-center items-center">
        <svg
          id="qr-code"
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${qrSize} ${qrSize}`}
          width={qrSize}
          height={qrSize}
        >
          {/* QR Code */}
          <QRCodeSVG value={text} size={qrSize} fgColor={qrColor} />

          {/* Logo Background & Image */}
          {uploadedSVG && (
            <>
              {/* Background padding for the logo */}
              <rect
                x={(qrSize - paddingSize) / 2}
                y={(qrSize - paddingSize) / 2}
                width={paddingSize}
                height={paddingSize}
                rx={borderRadius}
                fill="white"
              />
              {/* Logo Image */}
              <image
                href={uploadedSVG}
                x={(qrSize - logoSize) / 2}
                y={(qrSize - logoSize) / 2}
                width={logoSize}
                height={logoSize}
              />
            </>
          )}
        </svg>
      </div>
    </Card>
  );
}
