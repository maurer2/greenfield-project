import type { Simplify } from 'type-fest';

import { units } from '@/constants';
import { z } from 'zod';

const searchFormQueryParamsSchema = z
  .object({
    // https://github.com/colinhacks/zod/issues/2172
    amount: z
      .string()
      .min(1)
      .optional()
      .pipe(
        z.coerce
          .number({
            invalid_type_error: 'Amount must be number-like',
            required_error: 'Amount is required',
          })
          .positive('Amount must be at least +1'),
      ),
    unit: z.string().min(3).optional().pipe(z.enum(units.units)),
  })
  .strict();

export default searchFormQueryParamsSchema;

export type SearchFormQueryParamsRawSchema = Simplify<z.input<typeof searchFormQueryParamsSchema>>;
export type SearchFormQueryParamsSchema = z.output<typeof searchFormQueryParamsSchema>;
