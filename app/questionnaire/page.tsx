'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Language, messages } from '../lib/translations.ts';
import SuspenseWrapper from '../lib/SuspenseWrapper';
import { trackConcern } from '../lib/analytics';

export default function Questionnaire() {
  return (
    <SuspenseWrapper>
      <QuestionnaireContent />
    </SuspenseWrapper>
  );
}

function QuestionnaireContent() {
  const searchParams = useSearchParams();
  const lang = (searchParams.get('lang') || 'English') as Language;
  const visitorId = searchParams.get('visitorId') || ''; // Pass visitorId via query parameter

  const title = messages.questionnaireTitle[lang] ?? messages.questionnaireTitle.English;
  const options = messages.questionnaireOptions;

  const handleOptionClick = (optionEnglish: string) => {
    // Track the selected concern before navigating
    fetch('/api/track-concern', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ visitorId, concern: optionEnglish }),
    }).catch((error) => console.error('Error tracking concern:', error));
  };

  return (
    <div className='w-full max-w-md h-screen flex flex-col items-center justify-center p-4'>
      <h1 className='text-xl font-bold mb-4 text-center'>{title}</h1>
      <div className='space-y-4 w-full'>
        {options.map((option) => {
          const label = option[lang] ?? option.English;
          const value = option.English.toLowerCase();
          const href =
            value === 'something else'
              ? `/other?lang=${lang}&issue=${option.English}`
              : `/final?lang=${lang}&issue=${option.English}`;

          return (
            <Link key={option.English} href={href}>
              <button
                className='w-full p-3 rounded-lg bg-gray-200 hover:bg-blue-500 hover:text-white transition-colors'
                type='button'
                onClick={() => handleOptionClick(option.English)}
              >
                {label}
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}