'use client'

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  return (
    <div>
      <h2>Error</h2>
      <div>
        <code className="whitespace-pre">{error.message}</code>
      </div>
      <button onClick={() => reset()}>
        Go back
      </button>
    </div>
  )
}
