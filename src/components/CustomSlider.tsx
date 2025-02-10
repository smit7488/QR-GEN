import React from "react";
import { Range } from "react-range";

interface CustomSliderProps {
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
}

export default function CustomSlider({
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
}: CustomSliderProps) {
  return (
    <div className="relative w-full flex flex-col items-center gap-2">
      <Range
        values={[value]}
        step={step}
        min={min}
        max={max}
        onChange={(values) => onChange(values[0])} // Updates borderRadius
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className="relative w-full h-2 rounded-lg bg-gray-300 dark:bg-gray-700 mt-2 mb-2"
            style={{
              background: `linear-gradient(to right, #6b0296 ${(value - min) / (max - min) * 100}%,rgb(157, 160, 165) ${(value - min) / (max - min) * 100}%)`,
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            className="w-5 h-5 rounded-full shadow-md cursor-pointer border 
  border-gray-400 dark:border-gray-100 bg-[var(--slider-thumb-color)] dark:bg-gray-300 
  shadow-[0px_2px_6px_rgba(0,0,0,0.3)] dark:shadow-[0px_2px_6px_rgba(255,255,255,0.3)]"  
            style={{
           
              boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.3)",
            }}
          />
        )}
      />
   
    </div>
  );
}
