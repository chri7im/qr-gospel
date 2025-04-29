'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { WheelPicker } from './lib/WheelPicker';
import { Language, t } from './lib/translations.ts';

// Helper to generate a simple visitor ID
const generateVisitorId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export default function Home() {
  const languages: Language[] = [
    'Arabic',
    'English',
    'Farsi',
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

  // Default to English
  const defaultLanguage: Language = 'English';
  const defaultIndex = languages.indexOf(defaultLanguage);

  const [selectedLanguage, setSelectedLanguage] = useState<Language>(defaultLanguage);
  const [selectedIndex, setSelectedIndex] = useState<number>(defaultIndex);
  const [isSelecting, setIsSelecting] = useState(false);
  const [visitorId, setVisitorId] = useState<string | null>(null); // Initialize as null

  const router = useRouter();
  const wheelRef = useRef<HTMLDivElement>(null);

  // Generate visitorId on the client side only
  useEffect(() => {
    const id = generateVisitorId();
    setVisitorId(id);
    console.log('Generated visitorId:', id);
  }, []);

  // Track visitor once visitorId is available
  useEffect(() => {
    if (visitorId) {
      fetch('/api/track-visitor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visitorId }),
      }).catch((error) => console.error('Error tracking visitor:', error));
    }
  }, [visitorId]);

  // Map languages to their native names for the wheel items
  const items = languages.map((lang) => t('languageNames', lang as Language));

  // Handle selection change
  const handleChange = (index: number) => {
    console.log('WheelPicker onChange triggered:', index, 'Previous index:', selectedIndex);
    setIsSelecting(true);
    setSelectedLanguage(languages[index]);
    setSelectedIndex(index);
    console.log('Selected language:', languages[index], 'Index:', index);

    setTimeout(() => {
      setIsSelecting(false);
    }, 200);
  };

  // Handle click on the WheelPicker container to navigate
  const handleClick = () => {
    if (!isSelecting && visitorId) {
      console.log('WheelPicker clicked, navigating to:', `/about?lang=${selectedLanguage}`);
      fetch('/api/track-language', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visitorId, language: selectedLanguage }),
      })
        .then(() => router.push(`/about?lang=${selectedLanguage}&visitorId=${visitorId}`))
        .catch((error) => console.error('Error tracking language selection:', error));
    }
  };

  // Handle Enter key press at the document level
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log('Document key pressed:', e.key, 'Target:', e.target);
      if (e.key === 'Enter' && visitorId) {
        e.preventDefault();
        console.log('Enter key pressed, navigating to:', `/about?lang=${selectedLanguage}`);
        fetch('/api/track-language', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ visitorId, language: selectedLanguage }),
        })
          .then(() => router.push(`/about?lang=${selectedLanguage}&visitorId=${visitorId}`))
          .catch((error) => console.error('Error tracking language selection:', error));
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedLanguage, router, visitorId]);

  // Focus the WheelPicker container on mount
  useEffect(() => {
    if (wheelRef.current) {
      console.log('Focusing WheelPicker container');
      wheelRef.current.focus();
    }
  }, []);

  // Track language selection when clicking the "Next" button
  const handleNextClick = () => {
    if (visitorId) {
      fetch('/api/track-language', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visitorId, language: selectedLanguage }),
      }).catch((error) => console.error('Error tracking language selection:', error));
    }
  };

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center p-4 bg-gray-100'>
      <style jsx>{`
        .wheel-container:focus,
        .wheel-container *:focus {
          outline: none !important;
          border: none !important;
          box-shadow: none !important;
        }
      `}</style>
      <h1 className='text-xl font-bold mb-4 text-center'>
        {t('chooseLanguagePrompt', selectedLanguage)}
      </h1>
      <div
        ref={wheelRef}
        className='relative wheel-container'
        tabIndex={0}
        onClick={handleClick}
      >
        <WheelPicker
          items={items}
          visibleCount={5}
          itemHeight={40}
          onChange={handleChange}
          selectedIndex={selectedIndex}
        />
      </div>
      <div className='mt-12 z-20'>
        {/* Only render the Link when visitorId is available to avoid hydration mismatch */}
        {visitorId ? (
          <Link href={`/about?lang=${selectedLanguage}&visitorId=${visitorId}`}>
            <button
              className='px-6 py-2 bg-blue-500 text-white rounded-full disabled:opacity-50'
              type='button'
              disabled={!selectedLanguage}
              onClick={handleNextClick}
            >
              {t('nextButton', selectedLanguage)}
            </button>
          </Link>
        ) : (
          <button
            className='px-6 py-2 bg-blue-500 text-white rounded-full disabled:opacity-50'
            type='button'
            disabled={true}
          >
            {t('nextButton', selectedLanguage)}
          </button>
        )}
      </div>
    </div>
  );
}