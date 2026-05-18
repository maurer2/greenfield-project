import { cacheLife, cacheTag } from 'next/cache';
import Link from 'next/link';
import { Suspense } from 'react';
import { setTimeout as setTimeoutNode } from 'timers/promises';

import type { SearchFormSchema } from '@/types';

import ComparisonList from '@/components/ComparisonList/ComparisonList';

import { calculationSearchParamsGenerator } from '../../lib/calculationSearchParams/calculationSearchParams';
import * as styles from './ComparisonBox.css';

type ComparisonBoxProps = {
  amount: SearchFormSchema['amount'];
  unit: SearchFormSchema['unit'];
};

const conversionFactorFeetToMetre = 10.764;
const areaFootballPitch = 7_140;

export default async function ComparisonBox({ amount, unit }: ComparisonBoxProps) {
  // 'use cache';
  // cacheLife('default');

  const backLinkQueryString = calculationSearchParamsGenerator({
    amount,
    unit,
  });

  const calculationResultsPromise = getCalculationResults(amount, unit);

  return (
    <div className={styles.wrapper}>
      <h2>Calculated Results</h2>

      {/* Only shown on hard reload */}
      <Suspense fallback={<p>Loading comparison list</p>}>
        <ComparisonList
          amount={amount}
          calculationResultsPromise={calculationResultsPromise}
          unit={unit}
        />
      </Suspense>

      <Link className={styles.backLink} href={`/${backLinkQueryString}`}>
        Back
      </Link>
    </div>
  );
}

async function getCalculationResults(
  amount: ComparisonBoxProps['amount'],
  unit: ComparisonBoxProps['unit'],
) {
  'use cache'; // prevents suspense fallback
  cacheLife('default');
  cacheTag('calculation-results', `amount-${amount}-unit-${unit}`);

  await setTimeoutNode(2500);

  const amountInMetric = unit === 'sqm' ? amount : amount / conversionFactorFeetToMetre;
  const amountCalculatedInPercent = (amountInMetric * 100) / areaFootballPitch;

  return amountCalculatedInPercent / 100;
}
