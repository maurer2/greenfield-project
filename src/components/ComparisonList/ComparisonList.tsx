import type { ReactElement } from 'react';

// import { cacheLife, cacheTag } from 'next/cache';
// import { setTimeout as setTimeoutNode } from 'timers/promises';
import type { SearchFormSchema } from '@/types';

import * as styles from './ComparisonList.css';

export type ComparisonListProps = {
  amount: SearchFormSchema['amount'];
  calculationResultsPromise: Promise<number>;
  unit: SearchFormSchema['unit'];
};

export default async function ComparisonList({
  amount,
  calculationResultsPromise,
  unit,
}: ComparisonListProps): Promise<ReactElement> {
  // 'use cache';
  // cacheLife('default');
  // cacheTag('calculation-results', `amount-${amount}-unit-${unit}`);

  const amountCalculatedInDecimals = await calculationResultsPromise;
  const amountCalculatedInDecimalsFormatted = new Intl.NumberFormat('en-GB', {
    maximumFractionDigits: 5,
    minimumFractionDigits: 2,
  }).format(amountCalculatedInDecimals);

  return (
    <dl className={styles.wrapper}>
      <dt role="listitem">Amount:</dt>

      <dd>{amount}</dd>
      <dd>{amountCalculatedInDecimalsFormatted}</dd>

      <dt role="listitem">Unit:</dt>

      <dd>{unit}</dd>
      <dd>Football pitch</dd>
    </dl>
  );
}
