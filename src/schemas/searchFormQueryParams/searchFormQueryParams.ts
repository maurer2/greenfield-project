import type { Simplify } from 'type-fest';

import { z } from 'zod';

import { units } from '../searchForm/searchForm';

const searchFormQueryParamsSchema = z
  .object({
    // https://github.com/colinhacks/zod/issues/2172
    amount: z.string().pipe(
      z.coerce
        .number({
          invalid_type_error: 'Amount must be number-like',
          required_error: 'Amount is required',
        })
        .positive('Amount must be at least +1'),
    ),
    unit: z.string().pipe(z.enum(units)),
  })
  .strict();

export default searchFormQueryParamsSchema;

// export type SearchFormQueryParamsSchema = z.infer<typeof searchFormQueryParamsSchema>;
export type SearchFormQueryParamsInputSchema = Simplify<
  z.input<typeof searchFormQueryParamsSchema>
>;
export type SearchFormQueryParamsOutputSchema = z.output<typeof searchFormQueryParamsSchema>;
