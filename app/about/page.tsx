'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { t, Language } from '../lib/translations.ts';
import SuspenseWrapper from '../lib/SuspenseWrapper';

export default function About() {
  return (
    <SuspenseWrapper>
      <AboutContent />
    </SuspenseWrapper>
  );
}

function AboutContent() {
  const searchParams = useSearchParams();
  const lang = (searchParams.get('lang') || 'English') as Language;

  console.log('About prefix:', t('aboutPrefix', lang));
  console.log('About content:', t('aboutContent', lang));

  // Add Enter key listener to navigate to /questionnaire
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        console.log('Enter key pressed on About page, navigating to:', `/questionnaire?lang=${lang}`);
        window.location.href = `/questionnaire?lang=${lang}`;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [lang]); // Re-run effect if lang changes

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center p-4'>
      <p className='text-lg text-center whitespace-pre-wrap'>
        <span className='font-bold' style={{ fontWeight: 700 }}>
          {t('aboutPrefix', lang)}
        </span>{' '}
        {t('aboutContent', lang)}
      </p>
      <Link href={`/questionnaire?lang=${lang}`}>
        <button
          className='mt-6 px-6 py-2 bg-blue-500 text-white rounded-full'
          type='button'
        >
          {t('getItNowForFree', lang)}
        </button>
      </Link>
    </div>
  );
}