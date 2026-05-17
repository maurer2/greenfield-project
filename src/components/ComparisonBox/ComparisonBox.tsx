import { cacheLife } from 'next/cache';
import Link from 'next/link';
import { Suspense } from 'react';

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
  'use cache';
  cacheLife('default');

  const { promise: calculationPromise, resolve: calculationResolve } =
    Promise.withResolvers<number>();

  // delay only applied on first visit, subsequent visit use cached values for same query params
  setTimeout(() => {
    const amountInMetric = unit === 'sqm' ? amount : amount / conversionFactorFeetToMetre;
    const amountCalculatedInPercent = (amountInMetric * 100) / areaFootballPitch;
    const amountCalculatedInDecimals = amountCalculatedInPercent / 100;

    calculationResolve(amountCalculatedInDecimals);
  }, 2500);

  const backLinkQueryString = calculationSearchParamsGenerator({
    amount,
    unit,
  });

  return (
    <div className={styles.wrapper}>
      <h2>Calculated Results</h2>

      {/* Only shown on hard reload */}
      <Suspense fallback={<p>Loading calculations</p>}>
        <ComparisonList
          amount={amount}
          calculationPromise={calculationPromise}
          // amountCalculatedInDecimals={amountCalculatedInDecimals}
          unit={unit}
        />
      </Suspense>

      <Link className={styles.backLink} href={`/${backLinkQueryString}`}>
        Back
      </Link>
    </div>
  );
}
