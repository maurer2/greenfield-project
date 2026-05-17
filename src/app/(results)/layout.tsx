import type { PropsWithChildren } from 'react';

import { Suspense } from 'react';

export default function ResultsLayout({ children }: PropsWithChildren) {
  return <Suspense>{children}</Suspense>;
}
