"use client";

import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Link from "next/link";

const languages = [
  { code: "ar", name: "Arabic", header: "اختر لغتك" },
  { code: "en", name: "English", header: "Please select your language" },
  { code: "fr", name: "French", header: "Choisis ta langue" },
  { code: "de", name: "German", header: "Wähl deine Sprache" },
  { code: "hi", name: "Hindi", header: "अपनी भाषा चुन" },
  { code: "it", name: "Italian", header: "Scegli la tua lingua" },
  { code: "ja", name: "Japanese", header: "言語を選んで" },
  { code: "ko", name: "Korean", header: "언어를 골라" },
  { code: "zh", name: "Mandarin", header: "选你的语言" },
  { code: "pt", name: "Portuguese", header: "Escolhe tua língua" },
  { code: "ru", name: "Russian", header: "Выбери свой язык" },
  { code: "es", name: "Spanish", header: "Elige tu idioma" },
  { code: "sw", name: "Swahili", header: "Chagua lugha yako" },
];

export default function Home() {
  const [selectedIndex, setSelectedIndex] = useState(1); // Start with English
  const y = useMotionValue(0);

  const handleDragEnd = () => {
    const newIndex = Math.round(y.get() / -50); // 50px per item
    setSelectedIndex(Math.max(0, Math.min(languages.length - 1, 1 - newIndex)));
  };

  return (
    <div className="w-full max-w-md h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-xl font-bold mb-4 text-center">
        {languages[selectedIndex].header}
      </h1>
      <div className="relative w-full h-40 overflow-hidden">
        <motion.div
          drag="y"
          dragConstraints={{ top: -50 * (languages.length - 1), bottom: 0 }}
          onDragEnd={handleDragEnd}
          style={{ y }}
          className="absolute w-full"
        >
          {languages.map((lang, index) => (
            <div
              key={lang.code}
              className={`h-12 flex items-center justify-center text-lg ${
                index === selectedIndex ? "text-black font-semibold" : "text-gray-400"
              }`}
              style={{ transform: `translateY(${index * 50}px)` }}
            >
              {lang.name}
            </div>
          ))}
        </motion.div>
      </div>
      <Link href={`/about?lang=${languages[selectedIndex].code}`}>
        <button className="mt-8 w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center">
          →
        </button>
      </Link>
    </div>
  );
}