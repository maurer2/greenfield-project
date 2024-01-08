import type {
  SearchFormQueryParamsRawSchema,
  SearchFormQueryParamsSchema,
} from '@/schemas/searchFormQueryParams/searchFormQueryParams';

import ComparisonList from '@/components/ComparisonList/ComparisonList';
import searchFormQueryParamsSchema from '@/schemas/searchFormQueryParams/searchFormQueryParams';
import Link from 'next/link';

import * as styles from './page.css';

export const conversionFactorFeetToMetre = 10.764;
export const areaFootballPitch = 105 * 68; // 7_140

type PageProps = {
  searchParams: SearchFormQueryParamsRawSchema;
};

export default async function Results({ searchParams }: PageProps) {
  let searchParamsClean: SearchFormQueryParamsSchema | null = null;

  try {
    searchParamsClean = searchFormQueryParamsSchema.parse(searchParams);
  } catch (error) {
    // triggers nearest error.tsx
    throw new Error('Missing or invalid query params.', {
      cause: error,
    });
  }

  const { amount, unit } = searchParamsClean;

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
