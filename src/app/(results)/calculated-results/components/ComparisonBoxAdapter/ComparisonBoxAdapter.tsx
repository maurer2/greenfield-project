import ComparisonBox from '@/components/ComparisonBox/ComparisonBox';
import { loadCalculationSearchParams } from '@/lib/calculationSearchParams/calculationSearchParams';

type ResultsListAdapter = {
  searchParams: PageProps<'/calculated-results'>['searchParams'];
};

export default async function ResultsListAdapter({ searchParams }: ResultsListAdapter) {
  const { amount, unit } = await loadCalculationSearchParams(searchParams, { strict: true });

  if (amount === null || unit === null) {
    // triggers closest error.tsx if invalid
    throw new Error('Missing required query param(s)');
  }

  return <ComparisonBox amount={amount} unit={unit} />;
}
