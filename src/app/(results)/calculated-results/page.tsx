import Link from 'next/link';

import * as styles from './page.css';

export default async function Results({ searchParams }: { searchParams: Record<string, string> }) {
  const params = searchParams;

  const { amount, unit } = searchParams;

  // trigger nearest error.tsx
  if (!amount?.length || !unit?.length) {
    throw new Error('Invalid query params.');
  }

  return (
    <div className={styles.wrapper}>
      <h1>Results for </h1>

      <code>{JSON.stringify(params)}</code>

      <Link className={styles.backLink} href="/">
        Back
      </Link>
    </div>
  );
}
