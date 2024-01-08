'use client';

import Link from 'next/link';

import * as styles from './error.css';

type ErrorPageProps = {
  error: Error & { digest?: string };
};

export default function Error({ error }: ErrorPageProps) {
  return (
    <div className={styles.wrapper}>
      <h2>Error</h2>
      <div className={styles.body}>
        <code>{error.message}</code>
      </div>
      <Link className={styles.backLink} href="/">
        Back
      </Link>
    </div>
  );
}
