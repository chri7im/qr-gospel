'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  motion, useMotionValue, useTransform, useSpring,
} from 'framer-motion';
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
  const springY = useSpring(y, { stiffness: 300, damping: 30 }); // Smooth scrolling
  const itemHeight = 40; // Height of each language item in pixels
  const visibleItems = 5; // Number of visible items in the wheel
  const totalHeight = languages.length * itemHeight;

  // Transform scroll position to select the closest language
  const selectedIndex = useTransform(springY, (value) => {
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

  // Handle wheel scrolling for desktop
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY * 0.5; // Adjust scroll sensitivity
      const newY = Math.min(0, Math.max(-totalHeight + itemHeight * visibleItems, y.get() - delta));
      y.set(newY);
    };

    const wheelElement = wheelRef.current;
    if (wheelElement) {
      wheelElement.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (wheelElement) {
        wheelElement.removeEventListener('wheel', handleWheel);
      }
    };
  }, [y]);

  // Snap to nearest item on drag end
  const handleDragEnd = () => {
    const currentY = y.get();
    const nearestIndex = Math.round(-currentY / itemHeight);
    const snapY = -nearestIndex * itemHeight;
    y.set(snapY);
  };

  // Debugging: Log rendering
  useEffect(() => {
    console.log('Home component rendered, selectedLanguage:', selectedLanguage);
  }, [selectedLanguage]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <div
        className="relative w-80 h-[200px] bg-white rounded-lg shadow-lg overflow-hidden"
        style={{ perspective: 1000 }}
      >
        {/* Gradient mask for fade effect */}
        <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-white to-transparent z-10" />
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent z-10" />
        {/* Fixed highlight */}
        <div className="absolute inset-x-0 top-[80px] h-10 bg-blue-100 border-y border-blue-300 z-0" />
        <motion.div
          ref={wheelRef}
          className="flex flex-col items-center"
          style={{ y: springY }}
          drag="y"
          dragConstraints={{ top: -(totalHeight - itemHeight * visibleItems), bottom: 0 }}
          dragElastic={0.1}
          dragMomentum
          onDragEnd={handleDragEnd}
        >
          {languages.map((lang, index) => (
            <motion.div
              key={lang}
              className="w-full h-10 flex items-center justify-center text-lg font-medium text-gray-800"
              style={{
                transform: `translateZ(${(selectedIndex.get() - index) * -20}px)`,
                opacity: Math.abs(selectedIndex.get() - index) <= 2 ? 1 : 0.5,
                scale: selectedIndex.get() === index ? 1.1 : 1,
                transition: 'opacity 0.2s, scale 0.2s',
              }}
            >
              {t('chooseLanguagePrompt', lang)}
            </motion.div>
          ))}
        </motion.div>
      </div>
      <h2 className="text-xl font-bold mt-4">{t('chooseLanguagePrompt', selectedLanguage)}</h2>
      <Link href={`/about?lang=${selectedLanguage}`}>
        <button
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full disabled:opacity-50"
          type="button"
          disabled={!selectedLanguage}
        >
          Next
        </button>
      </Link>
    </div>
  );
}
