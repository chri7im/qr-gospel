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
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('English');
  const [selectedIndex, setSelectedIndex] = useState<number>(languages.indexOf('English')); // Track selected index
  const [isSelecting, setIsSelecting] = useState(false); // Track if a selection change is in progress
  const [visitorId] = useState<string>(generateVisitorId()); // Generate visitor ID on mount

  const router = useRouter();
  const wheelRef = useRef<HTMLDivElement>(null);

  // Track visitor on mount
  useEffect(() => {
    fetch('/api/track-visitor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ visitorId }),
    }).catch((error) => console.error('Error tracking visitor:', error));
  }, [visitorId]);

  // Map languages to their translated "chooseLanguagePrompt" strings
  const items = languages.map((lang) => t('chooseLanguagePrompt', lang));

  // Handle selection change
  const handleChange = (index: number) => {
    console.log('WheelPicker onChange triggered:', index, 'Previous index:', selectedIndex);
    setIsSelecting(true); // Mark that a selection change is in progress
    setSelectedLanguage(languages[index]);
    setSelectedIndex(index);
    console.log('Selected language:', languages[index], 'Index:', index);

    // Reset isSelecting after a short delay to allow click handler to differentiate
    setTimeout(() => {
      setIsSelecting(false);
    }, 200);
  };

  // Handle click on the WheelPicker container to navigate
  const handleClick = () => {
    if (!isSelecting) {
      // Only navigate if not in the middle of a selection change
      console.log('WheelPicker clicked, navigating to:', `/about?lang=${selectedLanguage}`);
      // Track language selection before navigating
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
      if (e.key === 'Enter') {
        e.preventDefault();
        console.log('Enter key pressed, navigating to:', `/about?lang=${selectedLanguage}`);
        // Track language selection before navigating
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
    fetch('/api/track-language', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ visitorId, language: selectedLanguage }),
    }).catch((error) => console.error('Error tracking language selection:', error));
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
      <div
        ref={wheelRef}
        className='relative wheel-container'
        tabIndex={0} // Keep the wheel focusable
        onClick={handleClick} // Add click handler for navigation
      >
        <WheelPicker
          items={items}
          visibleCount={5}
          itemHeight={40}
          onChange={handleChange}
        />
      </div>
      <div className='mt-12 z-20'>
        <Link href={`/about?lang=${selectedLanguage}`}>
          <button
            className='px-6 py-2 bg-blue-500 text-white rounded-full disabled:opacity-50'
            type='button'
            disabled={!selectedLanguage}
            onClick={handleNextClick} // Track language selection on button click
          >
            ➔
          </button>
        </Link>
      </div>
    </div>
  );
}