import { z } from "zod";

export function listFormatterOr<T extends string[]>(list: T): string {
  return new Intl.ListFormat("en-gb", {
    style: "long",
    type: "disjunction",
  }).format(list);
}

export const units = ["sqm", "sqft"] as const satisfies readonly string[];
export type Unit = (typeof units)[number];

const searchFormSchema = z.object({
  amount: z.coerce
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be number-like",
    })
    .positive("Amount must be at least +1"),
  unit: z.enum(units, {
    // https://github.com/colinhacks/zod/issues/580#issuecomment-1425044684
    errorMap: () => ({
      message: `Unit must be ${listFormatterOr([...units])}`,
    }),
  })
})
.strict();

export default searchFormSchema;
export type SearchFormSchema = z.infer<typeof searchFormSchema>;