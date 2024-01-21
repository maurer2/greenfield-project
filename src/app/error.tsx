'use client';

import * as styles from './error.css';

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorPageProps) {
  return (
    <div className={styles.wrapper}>
      <h2>Error</h2>
      <div>
        <code>{error.message}</code>
      </div>
      <button onClick={() => reset()} type="button">
        Go back
      </button>
    </div>
  );
}
