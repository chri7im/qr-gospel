'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { t, Language } from '../lib/translations.ts';
import SuspenseWrapper from '../lib/SuspenseWrapper.tsx';

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

  return (
    <div className="w-full max-w-md h-screen flex flex-col items-center justify-center p-4">
      <p className="text-lg text-center mb-8">{t('about', lang)}</p>
      <Link href={`/questionnaire?lang=${lang}`}>
        <button className="px-6 py-2 bg-blue-500 text-white rounded-full" type="button">
          Get it now for free
        </button>
      </Link>
    </div>
  );
}
