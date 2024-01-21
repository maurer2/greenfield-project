import type { SearchFormSchema } from '@/types';

import ComparisonList from '@/components/ComparisonList/ComparisonList';
import Link from 'next/link';

import * as styles from './ComparisonBox.css';

type ComparisonBoxProps = {
  amount: SearchFormSchema['amount'];
  unit: SearchFormSchema['unit'];
};

const conversionFactorFeetToMetre = 10.764;
const areaFootballPitch = 7_140;

export default async function ComparisonBox({ amount, unit }: ComparisonBoxProps) {
  const amountInMetric = unit === 'sqm' ? amount : amount / conversionFactorFeetToMetre;

  const amountCalculatedInPercent = (amountInMetric * 100) / areaFootballPitch;
  const amountCalculatedInDecimals = amountCalculatedInPercent / 100;

  return (
    <div className={styles.wrapper}>
      <h2>Calculated Results</h2>

      <ComparisonList
        amount={amount}
        amountCalculatedInDecimals={amountCalculatedInDecimals}
        unit={unit}
      />

      <Link className={styles.backLink} href="/">
        Back
      </Link>
    </div>
  );
}
