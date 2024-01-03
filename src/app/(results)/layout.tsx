import type { PropsWithChildren } from 'react';

import Background from '@/components/Background/Background';

import * as styles from './layout.css';

export default function ResultsLayout({ children }: PropsWithChildren) {
  return (
    <div className={styles.page}>
      <Background />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
