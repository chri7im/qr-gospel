'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Language, t } from './lib/translations.ts';

export default function Home() {
  const languages: Language[] = [
    'Arabic',
    'English',
    'French',
    'German',
    'Hindi',
    'Italian',
    'Japanese',
    'Korean',
    'Mandarin',
    'Portuguese',
    'Russian',
    'Spanish',
    'Swahili',
  ];
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('English');
  const wheelRef = useRef<HTMLDivElement>(null);

  // Motion value for scroll position
  const y = useMotionValue(0);
  const itemHeight = 48; // Height of each language item in pixels
  const visibleItems = 3; // Number of visible items in the wheel
  const totalHeight = languages.length * itemHeight;

  // Transform scroll position to select the closest language
  const selectedIndex = useTransform(y, (value) => {
    const index = Math.round(-value / itemHeight);
    return Math.max(0, Math.min(languages.length - 1, index));
  });

  // Update selected language based on scroll
  useEffect(() => {
    const unsubscribe = selectedIndex.onChange((index) => {
      setSelectedLanguage(languages[index]);
      console.log('Selected language:', languages[index]); // Debugging
    });
    return () => unsubscribe();
  }, [selectedIndex, languages]);

  // Debugging: Log rendering
  useEffect(() => {
    console.log('Home component rendered, selectedLanguage:', selectedLanguage);
  }, [selectedLanguage]);

  // Snap to nearest item on drag end
  const handleDragEnd = () => {
    const currentY = y.get();
    const nearestIndex = Math.round(-currentY / itemHeight);
    const snapY = -nearestIndex * itemHeight;
    y.set(snapY);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-6">{t('chooseLanguagePrompt', selectedLanguage)}</h1>
      <div
        className="relative w-80 h-[144px] overflow-hidden flex items-center justify-center bg-gray-200 rounded-lg"
        style={{ perspective: 1000 }}
      >
        <motion.div
          ref={wheelRef}
          className="flex flex-col items-center"
          style={{ y }}
          drag="y"
          dragConstraints={{ top: -(totalHeight - itemHeight * visibleItems), bottom: 0 }}
          dragElastic={0.1}
          dragMomentum
          onDragEnd={handleDragEnd}
        >
          {languages.map((lang, index) => (
            <motion.div
              key={lang}
              className="w-full h-12 flex items-center justify-center text-lg font-medium"
              style={{
                opacity: selectedIndex.get() === index ? 1 : 0.5,
                scale: selectedIndex.get() === index ? 1.2 : 1,
                transition: 'opacity 0.2s, scale 0.2s',
              }}
            >
              {t('chooseLanguagePrompt', lang)}
            </motion.div>
          ))}
        </motion.div>
      </div>
      <Link href={`/about?lang=${selectedLanguage}`}>
        <button
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-full disabled:opacity-50"
          type="button"
          disabled={!selectedLanguage}
        >
          Next
        </button>
      </Link>
    </div>
  );
}
