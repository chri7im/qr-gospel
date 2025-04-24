'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { t, Language } from '../lib/translations.ts';
import SuspenseWrapper from '../lib/SuspenseWrapper';

export default function Other() {
  return (
    <SuspenseWrapper>
      <OtherContent />
    </SuspenseWrapper>
  );
}

function OtherContent() {
  const searchParams = useSearchParams();
  const lang = (searchParams.get('lang') || 'English') as Language;
  const issue = searchParams.get('issue') || 'Something else';
  const visitorId = searchParams.get('visitorId') || '';
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Track the user-entered concern before navigating
    fetch('/api/track-other-concern', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ visitorId, description }),
    })
      .then(() => {
        // Navigate to /final with the description as a query parameter
        window.location.href = `/final?lang=${lang}&issue=${issue}&description=${encodeURIComponent(description)}&visitorId=${visitorId}`;
      })
      .catch((error) => console.error('Error tracking other concern:', error));
  };

  return (
    <div className='w-full max-w-md h-screen flex flex-col items-center justify-center p-4'>
      <h1 className='text-xl font-bold mb-4 text-center'>{t('otherPrompt', lang)}</h1>
      <form onSubmit={handleSubmit} className='w-full flex flex-col items-center'>
        <input
          type='text'
          className='w-full p-2 border rounded-lg mb-4'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={t('enterYourIssuePrompt', lang)}
          required
        />
        <button
          type='submit'
          className='w-12 h-12 flex items-center justify-center bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors'
        >
          ➔
        </button>
      </form>
    </div>
  );
}