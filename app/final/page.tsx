'use client';

import { useSearchParams } from 'next/navigation';
import { t, Language } from '../lib/translations.ts';
import SuspenseWrapper from '../lib/SuspenseWrapper.tsx';

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

  const issueKeyMap: { [key: string]: string } = {
    'شعور بالذنب': 'guilt',
    'feelings of guilt': 'guilt',
    'sentiments de culpabilité': 'guilt',
    schuldgefühle: 'guilt',
    'अपराध बोध': 'guilt',
    'sensi di colpa': 'guilt',
    罪悪感: 'guilt',
    죄책감: 'guilt',
    内疚感: 'guilt',
    'sentimentos de culpa': 'guilt',
    'чувство вины': 'guilt',
    'sentimientos de culpa': 'guilt',
    'hisia za hatia': 'guilt',
  };

  const normalizedIssue = issueKeyMap[issue] || issue;
  const opening = t('finalOpening', lang).replace('[issue]', issue);
  const message = t('concerns', lang, normalizedIssue) || t('concerns', lang, 'other');

  return (
    <div className="w-full max-w-md h-screen flex flex-col items-center justify-center p-4">
      <p className="text-lg text-center whitespace-pre-wrap">
        {opening} {message}
      </p>
    </div>
  );
}
