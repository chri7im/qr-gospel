'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { t, Language } from '../../lib/translations.ts';

export default function Other() {
  const searchParams = useSearchParams();
  const lang = (searchParams.get('lang') || 'English') as Language;
  const [customIssue, setCustomIssue] = useState('');

  return (
    <div className="w-full max-w-md h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-xl font-bold mb-4 text-center">{t('otherPrompt', lang)}</h1>
      <input
        type="text"
        value={customIssue}
        onChange={(e) => setCustomIssue(e.target.value)}
        className="w-full p-2 border rounded-lg mb-4"
        placeholder="Enter your issue"
      />
      {customIssue && (
        <Link href={`/final?lang=${lang}&issue=${customIssue}`}>
          <button className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center" type="button">
            →
          </button>
        </Link>
      )}
    </div>
  );
}
