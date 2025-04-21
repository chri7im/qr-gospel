'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Language, messages } from '../lib/translations.ts';
import SuspenseWrapper from '../lib/SuspenseWrapper';

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

  const title = messages.questionnaireTitle[lang] ?? messages.questionnaireTitle.English;
  const options = messages.questionnaireOptions;

  return (
    <div className='w-full max-w-md h-screen flex flex-col items-center justify-center p-4'>
      <h1 className='text-xl font-bold mb-4 text-center'>{title}</h1>
      <div className='space-y-4 w-full'>
        {options.map((option) => {
          const label = option[lang] ?? option.English;
          const value = option.English.toLowerCase();
          const href =
            value === 'other'
              ? `/other?lang=${lang}&issue=${option.English}`
              : `/final?lang=${lang}&issue=${option.English}`;

          return (
            <Link key={option.English} href={href}>
              <button
                className='w-full p-3 rounded-lg bg-gray-200 hover:bg-blue-500 hover:text-white transition-colors'
                type='button'
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