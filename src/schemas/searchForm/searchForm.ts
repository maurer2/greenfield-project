import { formatList } from '@/helpers/listformatter/listformatter';
import { z } from 'zod';

const formatListWithOr = formatList('or');

export const units = ['sqm', 'sqft'] as const satisfies readonly string[];
export type Unit = (typeof units)[number];

const searchFormSchema = z
  .object({
    amount: z
      .number()
      // .or(z.literal(''))
      .or(z.string())
      .pipe(
        z
          .number({
            coerce: true, // https://github.com/colinhacks/zod/discussions/330#discussioncomment-8895651
            invalid_type_error: 'Amount must be number-like',
            required_error: 'Amount is required',
          })
          .positive('Amount must be at least +1'),
      ),

    unit: z.enum(units, {
      // https://github.com/colinhacks/zod/issues/580#issuecomment-1425044684
      errorMap: () => ({
        message: `Unit must be ${formatListWithOr(units)}`,
      }),
    }),
  })
  .strict();

export default searchFormSchema;

export type SearchFormValues = z.input<typeof searchFormSchema>;
export type SearchFormSchema = z.output<typeof searchFormSchema>;
export type SearchFormErrors = z.inferFlattenedErrors<typeof searchFormSchema>;
