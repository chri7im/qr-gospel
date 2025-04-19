"use client";

import React, { useState } from "react";
// ⬇︎ Import Next.js dynamic
import dynamic from "next/dynamic";

// Dynamically import the Picker, disabling SSR
const Picker = dynamic(() => import("react-mobile-picker"), {
  ssr: false,
});

type LanguageWheelProps = {
  items: string[];
  selectedItem: string;
  onChange: (newValue: string) => void;
};

export default function LanguageWheel({
  items,
  selectedItem,
  onChange,
}: LanguageWheelProps) {
  const [valueGroups, setValueGroups] = useState<{ language: string }>({
    language: selectedItem,
  });

  const optionGroups = {
    language: items,
  };

  // Called whenever user scrolls to a new item in the wheel
  const handleChange = (name: string, value: string) => {
    setValueGroups({ ...valueGroups, [name]: value });
    onChange(value);
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      {/* Now it won't be SSR'd, preventing ReactCurrentDispatcher errors */}
      <Picker
        optionGroups={optionGroups}
        valueGroups={valueGroups}
        onChange={handleChange}
        height={150}
        itemHeight={30}
      />
    </div>
  );
}
