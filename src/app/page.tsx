"use client";

import { useEffect, useState } from "react";
import QRGenerator from "@/components/QRGenerator";
import BuildQRCode from "@/components/BuildQRCode";
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
    const svgElement = document.getElementById("qr-code");
    if (!svgElement) return;

    // Convert SVG to XML string
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);

    // Create a Blob from the SVG string
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    // Create an Image element
    const img = new Image();
    img.crossOrigin = "anonymous"; // Helps prevent tainted canvas issues
    img.src = url;

    img.onload = () => {
      const size = 900; // Fixed output size
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Fill background with white
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw the SVG image onto the canvas
      ctx.drawImage(img, 0, 0, size, size);

      // Convert to PNG and trigger download
      const pngUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = pngUrl;
      a.download = "qrcode.png";
      a.click();

      // Cleanup URL object
      URL.revokeObjectURL(url);
    };

    img.onerror = (err) => {
      console.error("Error loading SVG for PNG conversion:", err);
    };
  };

  return (
    <div className="min-h-screen">
      <div className="gradient w-full fixed"></div>
      <Nav />

      <div className="min-h-screen flex flex-col items-center p-4">
        <div className="container grid grid-cols-1 md:grid-cols-[2fr_1fr] bg-white dark:bg-gray-800 shadow-lg mt-24 mb-24 p-6 md:p-8 rounded-lg border border-gray-200 dark:border-gray-700 gap-6">
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
            <QRHolder className="bg-gray-300 border-gray-500 dark:bg-gray-900 dark:border-gray-700">
              {isMounted && qrData ? (
                <BuildQRCode
                  text={qrData}
                  uploadedSVG={uploadedSVG}
                  qrColor={qrColor}
                  borderRadius={borderRadius}
                />
              ) : null}
            </QRHolder>

            {/* Download Buttons Below QRHolder */}
            {isMounted && qrData && (
              <div className="mt-4 flex gap-4">
                <Button onClick={downloadSVG} variant="primary">
                  <div className="flex gap-2">
                    <Download size={18} />{" "}
                    <span className="text-sm">Download QR Code (SVG)</span>
                  </div>
                </Button>
                <div>
                  <Button onClick={downloadPNG} variant="secondary">
                    <div className="flex gap-2">
                      <Download size={18} />{" "}
                      <span className="text-sm">PNG</span>
                    </div>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
