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
  const [fileName, setFileName] = useState<string | null>(null);
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
    <div className="mt-6 border-t-gray-300 border-gray-300 dark:border-gray-700 pt-6 w-full">
      {/* Accordion Header */}
      <button
        className="w-full flex items-center justify-center gap-2 p-3 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-sm dark:shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <ImageIcon size={20} className="text-gray-700 dark:text-gray-300" />
        <span className="font-semibold text-gray-900 dark:text-gray-100">Branding & Settings</span>
        <ChevronDown
          size={18}
          className={`transform transition ${isOpen ? "rotate-180" : ""} text-gray-700 dark:text-gray-300`}
        />
      </button>

      {/* Accordion Content */}
      {isOpen && (
        <div className="p-4 space-y-4">
          {/* File Upload */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-900 dark:text-gray-100">Upload Logo</label>
            <label
              htmlFor="file-upload"
              className="btn btn-outline flex items-center gap-2 cursor-pointer border dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-600"
            >
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
              <p className="text-sm text-gray-600 dark:text-gray-400">
                ✔ {fileName}
              </p>
            )}
          </div>

          {/* Border Radius Slider */}
          <div>
            <label className="font-medium text-gray-900 dark:text-gray-100">Logo Background Border Radius</label>
            <input
              type="range"
              min="0"
              max="30"
              value={borderRadius}
              onChange={(e) => {
                const newRadius = parseInt(e.target.value);
                setBorderRadius(newRadius);
                onBorderRadiusChange(newRadius);
              }}
              className="w-full accent-blue-500 dark:accent-blue-400"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">Radius: {borderRadius}px</p>
          </div>

          {/* QR Code Color Picker */}
          <div className="flex gap-2 items-center">
            <div className="flex flex-col w-auto">
              <label className="font-medium text-gray-900 dark:text-gray-100">QR Code Color</label>
              <p className="text-sm text-gray-600 dark:text-gray-400">Selected: {qrColor}</p>
            </div>
            <input
              type="color"
              value={qrColor}
              onChange={(e) => {
                setQrColor(e.target.value);
                onColorChange(e.target.value);
              }}
              className="h-10 w-10 border dark:border-gray-600 rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  );
}
