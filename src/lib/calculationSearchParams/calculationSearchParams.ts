import { createLoader, parseAsInteger, parseAsStringEnum } from 'nuqs/server';

import { units } from '@/schemas/searchForm/searchForm';

export const calculationSearchParamsParsers = {
  amount: parseAsInteger, //.withDefault(1), // allows 0
  unit: parseAsStringEnum([...units]), //.withDefault('sqm'),
};

export const loadCalculationSearchParams = createLoader(calculationSearchParamsParsers);
