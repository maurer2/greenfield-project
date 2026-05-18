'use server';

import type { ErrorObject } from 'serialize-error';

import { redirect } from 'next/navigation';
// import { setTimeout as setTimeoutNode } from 'node:timers/promises';
import { serializeError } from 'serialize-error';

import type { SearchFormErrors } from '@/schemas/searchForm/searchForm';

import searchFormSchema from '@/schemas/searchForm/searchForm';

export type SearchFormSubmitActionResult =
  | null
  | {
      error: ErrorObject;
      status: 'error';
    }
  | {
      errors: SearchFormErrors;
      status: 'validation-fail';
    };

export async function handleSearchFormSubmit(
  prevSearchFormSubmitActionResult: SearchFormSubmitActionResult,
  formData: FormData,
): Promise<SearchFormSubmitActionResult> {
  let resultsPageUrl: null | string = null;

  try {
    // await setTimeoutNode(1000);

    const result = searchFormSchema.safeParse({
      amount: formData.get('amount'),
      unit: formData.get('unit'),
    });
    if (!result.success) {
      return { errors: result.error.flatten(), status: 'validation-fail' };
    }

    console.log(`Valid form values received: ${JSON.stringify(result.data, null, 4)}`);
    const queryParams = new URLSearchParams({
      amount: result.data.amount.toString(),
      unit: result.data.unit,
    });

    // redirect can't be used here as it triggers an error itself
    // https://nextjs.org/docs/app/api-reference/functions/redirect
    resultsPageUrl = `/calculated-results?${queryParams.toString()}`;
  } catch (error) {
    return { error: serializeError(error), status: 'error' };
  }

  return redirect(resultsPageUrl);
}
