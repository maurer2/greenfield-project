'use server';

import type { SearchFormErrors } from '@/schemas/searchForm/searchForm';
import type { ErrorObject } from 'serialize-error';

import searchFormSchema from '@/schemas/searchForm/searchForm';
import { redirect } from 'next/navigation';
// import { setTimeout as setTimeoutNode } from 'node:timers/promises';
import { serializeError } from 'serialize-error';

export type SearchFormSubmitActionResult =
  | {
      error: ErrorObject;
      status: 'error';
    }
  | {
      errors: SearchFormErrors;
      status: 'validation-fail';
    }
  | null;

export async function handleSearchFormSubmit(
  prevSearchFormSubmitActionResult: SearchFormSubmitActionResult,
  formData: FormData,
): Promise<SearchFormSubmitActionResult> {
  // await setTimeoutNode(1500);

  const amount = formData.get('amount');
  const unit = formData.get('unit');

  if (!amount || !unit) {
    return {
      error: serializeError(new Error('"Amount" or "Unit" value missing.')),
      status: 'error',
    };
  }

  const result = searchFormSchema.safeParse({ amount, unit });
  if (!result.success) {
    const searchFormErrors = result.error.flatten();

    return { errors: searchFormErrors, status: 'validation-fail' };
  }

  console.log(`Valid form values received: ${JSON.stringify(result.data, null, 4)}`);
  const queryParams = new URLSearchParams({
    amount: amount.toString(),
    unit: unit.toString(),
  });

  return redirect(`/calculated-results?${queryParams.toString()}`);
}
