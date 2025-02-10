"use client";

import { useState } from "react";
import { Upload, ChevronDown, Image as ImageIcon } from "lucide-react";
import CustomSlider from "./CustomSlider";

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
  const [sliderValue, setSliderValue] = useState(50);
  const [uploadedSVG, setUploadedSVG] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log("📂 Selected File:", file.name, "Type:", file.type);

    const reader = new FileReader();

    if (file.type === "image/svg+xml") {
      console.log("✅ Detected SVG. Reading as text...");
      reader.onload = (e) => {
        if (!e.target?.result) {
          console.error("🚨 SVG FileReader failed");
          return;
        }
        const svgText = e.target.result as string;

        console.log("🔍 SVG Content Read:", svgText.substring(0, 100) + "...");

        // Store raw SVG text
        setUploadedSVG(svgText);
        setUploadedImage(null); // Ensure no image base64 is stored
        onUpload(svgText); // Pass to parent component
      };
      reader.readAsText(file); // Read SVG as text
    } else if (file.type.startsWith("image/")) {
      console.log("📸 Detected PNG/JPG. Converting to Base64...");
      reader.onload = (e) => {
        if (!e.target?.result) {
          console.error("🚨 Image FileReader failed");
          return;
        }
        const base64Image = e.target.result as string;

        console.log("🖼️ Base64 Image:", base64Image.substring(0, 50) + "...");

        // Store base64 image
        setUploadedImage(base64Image);
        setUploadedSVG(null); // Ensure no SVG is stored
        onUpload(base64Image); // Pass to parent component
      };
      reader.readAsDataURL(file); // Convert PNG/JPG to Base64
    } else {
      console.error("🚨 Unsupported file format:", file.type);
    }
  };

  return (
    <div className="pt-6 w-full">
      {/* Accordion Header */}
      <button
        className="w-full flex items-center justify-center gap-2 p-3 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-sm dark:shadow-md hover:bg-gray-100 dark:hover:bg-gray-600"
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
              className={`btn btn-outline flex items-center gap-2 cursor-pointer
                border dark:border-gray-600 text-gray-700 dark:text-gray-300
                hover:border-gray-700 hover:text-gray-800 dark:hover:border-white dark:hover:text-white`}
            >
              <Upload size={18} /> Upload (SVG)
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
            <CustomSlider
              min={0}
              max={30}
              value={borderRadius}
              onChange={(newRadius) => {
                setBorderRadius(newRadius);
                onBorderRadiusChange(newRadius);
              }}
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
