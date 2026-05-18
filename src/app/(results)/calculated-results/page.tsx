import { Suspense } from 'react';

import ComparisonBoxAdaper from './components/ComparisonBoxAdapter/ComparisonBoxAdapter';

export default function Results({ searchParams }: PageProps<'/calculated-results'>) {
  return (
    // needed as query paramers are accessed in child
    <Suspense>
      <ComparisonBoxAdaper searchParams={searchParams} />
    </Suspense>
  );
}
