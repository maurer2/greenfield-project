'use client'

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorPageProps) {
  return (
    <div>
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
