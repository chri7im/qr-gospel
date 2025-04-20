'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { t, Language, messages } from '../lib/translations.ts';
import SuspenseWrapper from '../lib/SuspenseWrapper.tsx';

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
  const [selected, setSelected] = useState('');

  const title = t('questionnaireTitle', lang);
  const options = messages.questionnaireOptions;

  return (
    <div className="w-full max-w-md h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-xl font-bold mb-4 text-center">{title}</h1>
      <div className="space-y-4 w-full">
        {options.map((option) => (
          <button
            key={option.English}
            onClick={() => setSelected(option.English)}
            className={`w-full p-3 rounded-lg ${
              selected === option.English ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            type="button"
          >
            {option[lang] ?? option.English}
          </button>
        ))}
      </div>
      {selected && (
        <Link
          href={
            selected.toLowerCase() === 'other'
              ? `/other?lang=${lang}&issue=${selected}`
              : `/final?lang=${lang}&issue=${selected}`
          }
        >
          <button className="mt-8 w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center" type="button">
            →
          </button>
        </Link>
      )}
    </div>
  );
}
