'use client';

import { useState } from 'react';
import Link from 'next/link';
import { WheelPicker } from './lib/WheelPicker';
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

  // Map languages to their translated "chooseLanguagePrompt" strings
  const items = languages.map((lang) => t('chooseLanguagePrompt', lang));

  // Handle selection change
  const handleChange = (index: number) => {
    setSelectedLanguage(languages[index]);
    console.log('Selected language:', languages[index], 'Index:', index);
  };

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center p-4 bg-gray-100'>
      <div className='relative'>
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
          >
            Next
          </button>
        </Link>
      </div>
    </div>
  );
}