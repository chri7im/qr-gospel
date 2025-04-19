'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import Link from 'next/link';

const languages = [
  { code: 'ar', name: 'Arabic', header: 'اختر لغتك' },
  { code: 'en', name: 'English', header: 'Please select your language' },
  { code: 'fr', name: 'French', header: 'Choisis ta langue' },
  { code: 'de', name: 'German', header: 'Wähl deine Sprache' },
  { code: 'hi', name: 'Hindi', header: 'अपनी भाषा चुन' },
  { code: 'it', name: 'Italian', header: 'Scegli la tua lingua' },
  { code: 'ja', name: 'Japanese', header: '言語を選んで' },
  { code: 'ko', name: 'Korean', header: '언어를 골라' },
  { code: 'zh', name: 'Mandarin', header: '选你的语言' },
  { code: 'pt', name: 'Portuguese', header: 'Escolhe tua língua' },
  { code: 'ru', name: 'Russian', header: 'Выбери свой язык' },
  { code: 'es', name: 'Spanish', header: 'Elige tu idioma' },
  { code: 'sw', name: 'Swahili', header: 'Chagua lugha yako' },
];

export default function Home() {
  const [selectedIndex, setSelectedIndex] = useState(1); // Start with English
  const y = useMotionValue(0);

  const handleDragEnd = () => {
    const offset = y.get();
    const newIndex = Math.round(offset / -60);
    const clampedIndex = Math.max(0, Math.min(languages.length - 1, 1 - newIndex));
    setSelectedIndex(clampedIndex);
    y.set(-clampedIndex * 60);
  };

  useEffect(() => {
    y.set(-selectedIndex * 60);
  }, [selectedIndex, y]);

  return (
    <div className="w-full max-w-md h-screen flex flex-col items-center justify-center bg-gray-100 p-4 font-sans">
      <motion.h1
        key={languages[selectedIndex].header}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="text-2xl font-semibold text-gray-800 mb-6 text-center"
      >
        {languages[selectedIndex].header}
      </motion.h1>

      <div className="relative w-full h-48 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden">
        <div className="absolute top-1/2 left-0 right-0 h-12 bg-blue-100/50 -translate-y-1/2 z-0" />
        <motion.div
          drag="y"
          dragConstraints={{ top: -60 * (languages.length - 1), bottom: 0 }}
          dragElastic={0.2}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
          onDragEnd={handleDragEnd}
          style={{ y }}
          className="absolute w-full flex flex-col items-center"
        >
          {languages.map((lang, index) => {
            const distance = Math.abs(index - selectedIndex);
            const opacity = Math.max(0.3, 1 - distance * 0.4);
            const scale = Math.max(0.8, 1 - distance * 0.1);
            const translateY = index * 60;

            return (
              <motion.div
                key={lang.code}
                className={`h-12 flex items-center justify-center text-lg w-full ${
                  index === selectedIndex ? 'text-blue-600 font-semibold' : 'text-gray-500'
                }`}
                style={{ transform: `translateY(${translateY}px)` }}
                animate={{ opacity, scale }}
              >
                {lang.name}
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <Link href={`/about?lang=${languages[selectedIndex].code}`}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </Link>
    </div>
  );
}
