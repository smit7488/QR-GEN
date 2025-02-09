"use client";

import { useEffect, useState } from "react";
import QRGenerator from "@/components/QRGenerator";
import SVGQRCode from "@/components/SVGQRCode";
import QRHolder from "@/components/QRHolder";
import Button from "@/components/Button";
import { Download } from "lucide-react";
import Nav from "@/components/Nav";

export default function Page() {
  const [qrData, setQrData] = useState("");
  const [uploadedSVG, setUploadedSVG] = useState<string | null>(null);
  const [qrColor, setQrColor] = useState("#000000"); // Default QR color
  const [borderRadius, setBorderRadius] = useState(10); // Default border radius
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Function to update QR color
  const handleColorChange = (color: string) => {
    setQrColor(color);
  };

  // Function to update Border Radius
  const handleBorderRadiusChange = (radius: number) => {
    setBorderRadius(radius);
  };

  const downloadSVG = () => {
    const svgElement = document.getElementById("qr-code");
    if (!svgElement) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "qrcode.svg";
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadPNG = async () => {
    if (!qrData) return;

    const svgElement = document.getElementById("qr-code");
    if (!svgElement) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);
    const encodedData = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgString)))}`;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = encodedData;

    img.onload = () => {
      setTimeout(() => {
        const exportScale = 3; // Scale factor for 900x900 PNG
        const baseSize = 300; // Base QR size in preview
        const size = baseSize * exportScale; // Scaled size for PNG export

        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.fillStyle = "white"; // Set white background
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Scale up the entire QR code proportionally
        ctx.drawImage(img, 0, 0, size, size);

        if (uploadedSVG) {
          const logo = new Image();
          logo.src = uploadedSVG;
          logo.crossOrigin = "anonymous";

          logo.onload = () => {
            const logoSize = size * 0.2; // 20% of the QR code size
            const paddingSize = logoSize * 1.3; // 30% larger for padding
            const logoX = (size - logoSize) / 2;
            const logoY = (size - logoSize) / 2;

            // Scale the border radius correctly
            const scaledBorderRadius = borderRadius * exportScale;

            // Draw background padding
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.roundRect(
              logoX - (paddingSize - logoSize) / 2,
              logoY - (paddingSize - logoSize) / 2,
              paddingSize,
              paddingSize,
              scaledBorderRadius
            );
            ctx.fill();

            // Draw logo
            ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);

            // Convert to PNG and trigger download
            const pngUrl = canvas.toDataURL("image/png");
            const a = document.createElement("a");
            a.href = pngUrl;
            a.download = "qrcode-900x900.png";
            a.click();
          };
        } else {
          // Convert to PNG and trigger download if no logo
          const pngUrl = canvas.toDataURL("image/png");
          const a = document.createElement("a");
          a.href = pngUrl;
          a.download = "qrcode-900x900.png";
          a.click();
        }
      }, 200);
    };

    img.onerror = (err) => {
      console.error("Error loading SVG for PNG conversion", err);
    };
  };

  return (
  
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-400 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <div className="absolute gradient w-full">
      <Nav />

      <div className="min-h-screen flex flex-col items-center p-4">
        <div className="container grid grid-cols-1 md:grid-cols-[2fr_1fr] bg-white dark:bg-gray-800 shadow-lg mt-24 p-6 md:p-8 rounded-lg border border-gray-200 dark:border-gray-700 gap-6">
          {/* Left Side (QR Generator Form) */}
          <div className="p-4 sm:p-6 md:p-8 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-700 rounded-lg">
            <QRGenerator
              onGenerate={setQrData}
              onUpload={setUploadedSVG}
              onColorChange={handleColorChange}
              onBorderRadiusChange={handleBorderRadiusChange}
            />
          </div>

          {/* Right Side (QR Code Display) */}
          <div className="flex flex-col items-center">
            <QRHolder className="dark:bg-gray-900 dark:border-gray-700">
              {isMounted && qrData ? (
                <SVGQRCode text={qrData} uploadedSVG={uploadedSVG} qrColor={qrColor} borderRadius={borderRadius} />
              ) : null}
            </QRHolder>

            {/* Download Buttons Below QRHolder */}
            {isMounted && qrData && (
              <div className="mt-4 flex gap-4">
                <Button onClick={downloadSVG} variant="secondary">
                  <div className="flex gap-2">
                    <Download size={18} /> <span className="text-sm">SVG</span>
                  </div>
                </Button>
                <Button onClick={downloadPNG} variant="secondary">
                  <div className="flex gap-2">
                    <Download size={18} /> <span className="text-sm">PNG</span>
                  </div>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
