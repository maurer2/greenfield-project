import type { SearchFormSchema } from '@/types';
import type { ReactElement } from 'react';

import * as styles from './ComparisonList.css';

export type ComparisonListProps = {
  amount: number;
  amountCalculatedInDecimals: number;
  unit: SearchFormSchema['unit'];
};

function ComparisonList({
  amount,
  amountCalculatedInDecimals,
  unit,
}: ComparisonListProps): ReactElement {
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

export default ComparisonList;
