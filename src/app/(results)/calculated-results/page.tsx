import Background from '@/components/Background/Background';

import * as styles from './page.css';

export default async function Results({ searchParams }: { searchParams: Record<string, string> }) {
  const params = searchParams;

  return (
    <main className={styles.page}>
      <Background />
      <div className={styles.content}>
        <h1>Results</h1>
        <code>{params?.value}</code>
      </div>
    </main>
  );
}
