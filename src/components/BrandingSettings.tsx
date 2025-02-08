"use client";

import { useState } from "react";
import { Upload, ChevronDown, Image as ImageIcon } from "lucide-react";

interface BrandingSettingsProps {
  onUpload: (file: string | null) => void;
  onBorderRadiusChange: (radius: number) => void;
  onColorChange: (color: string) => void;
}

export default function BrandingSettings({
  onUpload,
  onBorderRadiusChange,
  onColorChange,
}: BrandingSettingsProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null); // ✅ Added state for filename
  const [borderRadius, setBorderRadius] = useState(10);
  const [qrColor, setQrColor] = useState("#000000");
  const [isOpen, setIsOpen] = useState(false);

  // Handle File Upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Image = e.target?.result as string;
        setSelectedFile(base64Image);
        onUpload(base64Image);
      };
      reader.readAsDataURL(file);

      // Extract filename and extension
      setFileName(`${file.name} (${file.type.split("/")[1]})`);
    }
  };

  return (
    <div className="mt-6 border-t border-gray-300 pt-4 w-full">
      {/* Accordion Header */}
      <button
        className="w-full flex items-center justify-center gap-2 p-3 bg-white border rounded-lg shadow-sm hover:bg-gray-100 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <ImageIcon size={20} /> 
        <span className="font-semibold">Branding & Settings</span>
        <ChevronDown
          size={18}
          className={`transform transition ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Accordion Content */}
      {isOpen && (
        <div className="p-4 space-y-4">
          {/* File Upload */}
          <div className="flex flex-col gap-2">
            <label className="font-medium">Upload Logo</label>
            <label htmlFor="file-upload" className="btn btn-outline flex items-center gap-2 cursor-pointer">
              <Upload size={18} /> Upload (SVG/PNG/JPG)
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".svg,.png,.jpg,.jpeg"
              className="hidden"
              onChange={handleFileUpload}
            />

            {/* ✅ Display Filename & Extension */}
            {fileName && (
              <p className="text-sm text-gray-600">
                ✔ {fileName}
              </p>
            )}
          </div>

   {/* Border Radius Slider */}
<div>
  <label className="font-medium">Logo Background Border Radius</label>
  <input
    type="range"
    min="0"
    max="100"
    value={borderRadius}
    onChange={(e) => {
      const newRadius = parseInt(e.target.value);
      setBorderRadius(newRadius);
      onBorderRadiusChange(newRadius);
    }}
    className="w-full"
  />
  <p className="text-sm text-gray-600">Radius: {borderRadius}%</p>
</div>


          {/* QR Code Color Picker */}
          <div>
            <label className="font-medium">QR Code Color</label>
            <input
              type="color"
              value={qrColor}
              onChange={(e) => {
                setQrColor(e.target.value);
                onColorChange(e.target.value);
              }}
              className="w-full h-10 border"
            />
            <p className="text-sm text-gray-600">Selected: {qrColor}</p>
          </div>
        </div>
      )}
    </div>
  );
}
