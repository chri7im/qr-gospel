'use client';

import { Suspense, ReactNode } from 'react';

interface SuspenseWrapperProps {
  children: ReactNode;
}

export default function SuspenseWrapper({ children }: SuspenseWrapperProps) {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
}
