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
  const [processedSVG, setProcessedSVG] = useState<string | null>(null);
  const [scaleFactor, setScaleFactor] = useState(1);

  useEffect(() => {
    setIsMounted(true);

    if (uploadedSVG) {
      let svgContent = uploadedSVG;

      // ✅ Remove XML declaration if present
      if (svgContent.startsWith("<?xml")) {
        console.warn("🚨 Removing XML Declaration from SVG...");
        svgContent = svgContent.replace(/<\?xml.*?\?>\n?/, "");
      }

      // ✅ Extract the `viewBox` and calculate scaling factor
      const viewBoxMatch = svgContent.match(/viewBox=["']([\d.\s]+)["']/);
      if (viewBoxMatch) {
        const [minX, minY, width, height] = viewBoxMatch[1].split(" ").map(Number);

        if (width && height) {
          const maxDimension = Math.max(width, height);
          const targetSize = 48; // ✅ Target logo size
          const calculatedScale = targetSize / maxDimension;

          console.log("🔍 Detected viewBox:", viewBoxMatch[1]);
          console.log("📏 Original Size:", width, "x", height);
          console.log("📐 Scale Factor:", calculatedScale);

          setScaleFactor(calculatedScale);
        }
      }

      // ✅ Extract SVG inner contents (remove outer <svg> wrapper)
      const svgInnerMatch = svgContent.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
      if (svgInnerMatch) {
        setProcessedSVG(svgInnerMatch[1]); // ✅ Store just the inner contents
      } else {
        console.error("🚨 Failed to extract inner SVG contents");
      }
    }
  }, [uploadedSVG]);

  if (!isMounted) return null;

  const qrSize = 300; // QR Code Size
  const logoMaxSize = 48; // ✅ Max logo size
  const paddingSize = logoMaxSize * 1.3; // ✅ Make padding slightly larger than logo

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

          {/* Background Padding (Centered White Box) */}
          {processedSVG && (
            <rect
              x={(qrSize - paddingSize) / 2}
              y={(qrSize - paddingSize) / 2}
              width={paddingSize}
              height={paddingSize}
              rx={borderRadius}
              fill="white"
            />
          )}

          {/* ✅ Embed SVG Properly & Fully Centered with Scaling */}
          {processedSVG && (
            <g
              transform={`translate(${(qrSize - logoMaxSize) / 2}, ${(qrSize - logoMaxSize) / 2}) scale(${scaleFactor})`}
              dangerouslySetInnerHTML={{ __html: processedSVG }}
            />
          )}
        </svg>
      </div>
    </Card>
  );
}
