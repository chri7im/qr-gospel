'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { t, Language, messages } from '../lib/translations.ts';
import SuspenseWrapper from '../lib/SuspenseWrapper';

export default function Final() {
  return (
    <SuspenseWrapper>
      <FinalContent />
    </SuspenseWrapper>
  );
}

function FinalContent() {
  const searchParams = useSearchParams();
  const lang = (searchParams.get('lang') || 'English') as Language;
  const issue = searchParams.get('issue')?.toLowerCase() || 'fear';
  const description = searchParams.get('description') || '';
  const visitorId = searchParams.get('visitorId') || '';
  const [message, setMessage] = useState('');

  // Map for normalizing issue names to filenames (for fetching only)
  const issueKeyMap: { [key: string]: string } = {
    'شعور بالذنب': 'guilt',
    'feelings of guilt': 'guilt',
    'sentiments de culpabilité': 'guilt',
    'Schuldgefühle': 'guilt',
    'अपराध बोध': 'guilt',
    'sensi di colpa': 'guilt',
    '罪悪感': 'guilt',
    '죄책感': 'guilt',
    '内疚感': 'guilt',
    'sentimentos de culpa': 'guilt',
    'чувство вины': 'guilt',
    'sentimientos de culpa': 'guilt',
    'hisia za hatia': 'guilt',
  };

  // Use issueKeyMap for fetching, but keep original issue for rendering
  const issueForFetch = issue === 'something else' ? 'something-else' : (issueKeyMap[issue] || issue);

  // Find the translated issue name from questionnaireOptions using the original issue
  const issueIndex = messages.questionnaireOptions.findIndex(
    (opt) => opt.English.toLowerCase() === issue.toLowerCase()
  );
  const translatedIssue =
    issueIndex !== -1
      ? messages.questionnaireOptions[issueIndex][lang] ?? messages.questionnaireOptions[issueIndex].English
      : issue;

  // Use description for "Something else", otherwise use translatedIssue
  const issueForOpening = issue === 'something else' && description
    ? decodeURIComponent(description)
    : translatedIssue;

  const opening = t('finalOpening', lang).replace('[issue]', issueForOpening);
  console.log('Opening text:', opening);

  // Load the concern message dynamically
  useEffect(() => {
    const loadMessage = async () => {
      try {
        // Normalize case for language and issue to match file names
        const langNormalized = lang.charAt(0).toUpperCase() + lang.slice(1).toLowerCase();
        const issueNormalized = issueForFetch.toLowerCase().replace(/\s+/g, '-'); // Keep hyphen replacement for fetching
        const url = `/concerns/${langNormalized}/${issueNormalized}.html`;
        console.log('Lang:', lang, 'Normalized lang:', langNormalized);
        console.log('Issue:', issue, 'Issue for fetch:', issueForFetch, 'Normalized issue:', issueNormalized);
        console.log('Description:', description);
        console.log('Attempting to fetch:', url);
        const response = await fetch(url);
        if (!response.ok) {
          console.error('Failed to fetch language-specific file:', response.status, response.statusText, 'URL:', url);
          console.error('Response headers:', Object.fromEntries(response.headers.entries()));
          // Fallback to English if the file doesn't exist
          await fetchEnglishFallback(langNormalized, issueNormalized);
          return;
        }
        const text = await response.text();
        console.log('Text loaded (raw):', JSON.stringify(text));
        console.log('Text length:', text.length, 'Is whitespace only:', !text.trim());
        if (!text.trim()) {
          // If the language-specific file is empty, fall back to English
          console.log('Language-specific file is empty, falling back to English.');
          await fetchEnglishFallback(langNormalized, issueNormalized);
          return;
        }
        setMessage(text);
      } catch (error) {
        console.error('Error loading concern message:', error);
        setMessage('<p>Error loading message. Please try again later.</p>');
      }
    };

    const fetchEnglishFallback = async (lang: string, issue: string) => {
      try {
        const fallbackUrl = `/concerns/English/${issue}.html`;
        console.log('Falling back to:', fallbackUrl);
        const fallbackResponse = await fetch(fallbackUrl);
        if (!fallbackResponse.ok) {
          console.error('Failed to fetch fallback file:', fallbackResponse.status, fallbackResponse.statusText, 'URL:', fallbackUrl);
          console.error('Fallback response headers:', Object.fromEntries(fallbackResponse.headers.entries()));
          // If the English file doesn't exist, fall back to something-else.html
          await fetchSomethingElseFallback(lang);
          return;
        }
        const fallbackText = await fallbackResponse.text();
        console.log('Fallback text loaded (raw):', JSON.stringify(fallbackText));
        console.log('Fallback text length:', fallbackText.length, 'Is whitespace only:', !fallbackText.trim());
        setMessage(fallbackText.trim() || '<p>English fallback message is empty.</p>');
      } catch (error) {
        console.error('Error loading English fallback:', error);
        setMessage('<p>Error loading English fallback message. Please try again later.</p>');
      }
    };

    const fetchSomethingElseFallback = async (lang: string) => {
      try {
        const fallbackUrl = `/concerns/${lang}/something-else.html`;
        console.log('Falling back to something-else:', fallbackUrl);
        const fallbackResponse = await fetch(fallbackUrl);
        if (!fallbackResponse.ok) {
          console.error('Failed to fetch something-else file:', fallbackResponse.status, fallbackResponse.statusText, 'URL:', fallbackUrl);
          // Try English something-else.html as a last resort
          const finalFallbackUrl = `/concerns/English/something-else.html`;
          console.log('Final fallback to English something-else:', finalFallbackUrl);
          const finalFallbackResponse = await fetch(finalFallbackUrl);
          if (!finalFallbackResponse.ok) {
            console.error('Failed to fetch final fallback file:', finalFallbackResponse.status, finalFallbackResponse.statusText, 'URL:', finalFallbackUrl);
            setMessage('<p>We’re sorry, but the message for this concern is not available in your language or in English. Please try another option.</p>');
            return;
          }
          const finalFallbackText = await finalFallbackResponse.text();
          setMessage(finalFallbackText.trim() || '<p>English something-else message is empty.</p>');
          return;
        }
        const fallbackText = await fallbackResponse.text();
        setMessage(fallbackText.trim() || '<p>Something-else message is empty.</p>');
      } catch (error) {
        console.error('Error loading something-else fallback:', error);
        setMessage('<p>Error loading something-else message. Please try again later.</p>');
      }
    };

    loadMessage();
  }, [issueForFetch, lang]);

  return (
    <div className='w-full max-w-md min-h-screen flex flex-col items-center p-4'>
      {opening ? (
        <p className='text-lg text-center whitespace-pre-wrap'>{opening}</p>
      ) : (
        <p className='text-lg text-center text-red-500'>Introduction missing.</p>
      )}
      <div
        className='text-lg text-center mt-4'
        dangerouslySetInnerHTML={{ __html: message }}
      />
      <Link href={`/contact?lang=${lang}&visitorId=${visitorId}`}>
        <button className='mt-6 px-6 py-2 bg-blue-500 text-white rounded-full'>
          {t('tellMeMore', lang)} {/* Use translated text */}
        </button>
      </Link>
    </div>
  );
}