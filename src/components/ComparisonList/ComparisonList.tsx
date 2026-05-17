import type { ReactElement } from 'react';

import type { SearchFormSchema } from '@/types';

import * as styles from './ComparisonList.css';

export type ComparisonListProps = {
  amount: number;
  // amountCalculatedInDecimals: number;
  calculationPromise: Promise<number>;
  unit: SearchFormSchema['unit'];
};

export default async function ComparisonList({
  amount,
  // amountCalculatedInDecimals,
  calculationPromise,
  unit,
}: ComparisonListProps): Promise<ReactElement> {
  const amountCalculatedInDecimals = await calculationPromise;

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
