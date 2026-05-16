import ComparisonBox from '@/components/ComparisonBox/ComparisonBox';
import { loadCalculationSearchParams } from '@/lib/calculationSearchParams/calculationSearchParams';

// Page is dynamically rendered according to "next build", but the next dev overlay shows it as static
export default async function Results({ searchParams }: PageProps<'/calculated-results'>) {
  // triggers closest error.tsx if invalid
  const { amount, unit } = await loadCalculationSearchParams(searchParams, { strict: true });

  if (amount === null || unit === null) {
    throw new Error('Missing required query param(s)');
  }

  return <ComparisonBox amount={amount} unit={unit} />;
}
