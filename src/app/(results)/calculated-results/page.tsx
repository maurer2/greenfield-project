import ComparisonList from '@/components/ComparisonList/ComparisonList';
import Link from 'next/link';

import * as styles from './page.css';

const conversionFactorFeetToMetre = 10.764;
const areaFootballPitch = 105 * 68; // 7140

type Page = {
  searchParams: Record<string, string>;
};

export default async function Results({ searchParams }: Page) {
  const { amount, unit } = searchParams;

  // trigger nearest error.tsx
  if (!amount?.length || !unit?.length) {
    throw new Error('Missing or invalid query params.');
  }

  const isMetric = unit === 'sqm';
  const amountInMetric = isMetric
    ? parseInt(amount, 10)
    : parseInt(amount, 10) / conversionFactorFeetToMetre;

  if (Number.isNaN(amountInMetric)) {
    throw new Error('Amount is not number-like.');
  }

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
