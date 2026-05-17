import { createLoader, createSerializer, parseAsInteger, parseAsStringEnum } from 'nuqs/server';

import { units } from '@/schemas/searchForm/searchForm';

// results page - no default
export const calculationSearchParamsConfig = {
  amount: parseAsInteger, //.withDefault(1), // allows 0
  unit: parseAsStringEnum([...units]), //.withDefault('sqm'),
};

// search page - with defaults
export const calculationSearchParamsConfigWithDefaults = {
  amount: calculationSearchParamsConfig.amount.withDefault(101),
  unit: calculationSearchParamsConfig.unit.withDefault('sqm'),
};

export const loadCalculationSearchParams = createLoader(calculationSearchParamsConfig);
export const loadCalculationSearchParamsWithDefaults = createLoader(
  calculationSearchParamsConfigWithDefaults,
);

export const calculationSearchParamsGenerator = createSerializer(calculationSearchParamsConfig);
