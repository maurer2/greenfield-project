import type { SearchFormQueryParamsRawSchema } from '@/schemas/searchFormQueryParams/searchFormQueryParams';

import ComparisonBox from '@/components/ComparisonBox/ComparisonBox';
import searchFormQueryParamsSchema from '@/schemas/searchFormQueryParams/searchFormQueryParams';
import Link from 'next/link';

import * as styles from './error.css';

type PageProps = {
  searchParams?: SearchFormQueryParamsRawSchema;
};

export default async function Results({ searchParams }: PageProps) {
  const searchParamsClean = searchFormQueryParamsSchema.safeParse(searchParams);

  // workaround
  if (!searchParamsClean.success) {
    return (
      <div className={styles.wrapper}>
        <h2>Missing or invalid query params.</h2>
        <div className={styles.body}>
          <code className={styles.code}>{JSON.stringify(searchParamsClean.error, null, 4)}</code>
        </div>
        <Link className={styles.backLink} href="/">
          Back
        </Link>
      </div>
    );
  }

  const { amount, unit } = searchParamsClean.data;

  return <ComparisonBox amount={amount} unit={unit} />;
}
