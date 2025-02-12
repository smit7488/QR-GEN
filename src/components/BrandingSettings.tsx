import { useState } from "react";
import { ChevronDown, Image as ImageIcon } from "lucide-react";
import CustomSlider from "./CustomSlider";
import FileUpload from "./FileUpload";

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
  const [borderRadius, setBorderRadius] = useState(10);
  const [qrColor, setQrColor] = useState("#000000");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="pt-6 w-full">
      <button
        className="w-full flex items-center justify-center gap-2 p-3 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-sm dark:shadow-md hover:bg-gray-100 dark:hover:bg-gray-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        <ImageIcon size={20} className="text-gray-700 dark:text-gray-300" />
        <span className="font-semibold text-gray-900 dark:text-gray-100">
          Branding & Settings
        </span>
        <ChevronDown
          size={18}
          className={`transform transition ${isOpen ? "rotate-180" : ""} text-gray-700 dark:text-gray-300`}
        />
      </button>

      {isOpen && (
        <div className="p-4 space-y-4">
          {/* File Upload */}
          <FileUpload onUpload={onUpload} />

          {/* Border Radius Slider */}
          <div>
            <label className="font-medium text-gray-900 dark:text-gray-100">
              Logo Background Border Radius
            </label>
            <CustomSlider
              min={0}
              max={30}
              value={borderRadius}
              onChange={(newRadius) => {
                setBorderRadius(newRadius);
                onBorderRadiusChange(newRadius);
              }}
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Radius: {borderRadius}px
            </p>
          </div>

          {/* QR Code Color Picker */}
          <div className="flex gap-2 items-center">
            <div className="flex flex-col w-auto">
              <label className="font-medium text-gray-900 dark:text-gray-100">
                QR Code Color
              </label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Selected: {qrColor}
              </p>
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
