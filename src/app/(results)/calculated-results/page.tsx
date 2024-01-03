import Background from '@/components/Background/Background';
import Link from 'next/link';

import * as styles from './page.css';

export default async function Results({ searchParams }: { searchParams: Record<string, string> }) {
  const params = searchParams;

  return (
    <main className={styles.page}>
      <Background />
      <div className={styles.content}>
        <h1>Results</h1>

        <code>{JSON.stringify(params)}</code>

        <Link href="/">Back</Link>
      </div>
    </main>
  );
}
