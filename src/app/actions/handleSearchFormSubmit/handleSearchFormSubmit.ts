'use server';

import type { SearchFormErrors, SearchFormSchema } from '@/schemas/searchForm/searchForm';
import type { ErrorObject } from 'serialize-error';

import searchFormSchema from '@/schemas/searchForm/searchForm';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { redirect } from 'next/navigation';
import { setTimeout } from 'node:timers/promises';
import { serializeError } from 'serialize-error';
import { ZodError } from 'zod';

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
  await setTimeout(1500);

  const amount = formData.get('amount');
  const unit = formData.get('unit');

  if (!amount || !unit) {
    return {
      error: serializeError(new Error('"Amount" or "Unit" value missing.')),
      status: 'error',
    };
  }

  try {
    const formValues: SearchFormSchema = searchFormSchema.parse({
      amount,
      unit,
    });
    console.log(`Valid form values received: ${JSON.stringify(formValues, null, 4)}`);

    const queryParams = new URLSearchParams({
      amount: amount.toString(),
      unit: unit.toString(),
    });

    return redirect(`/calculated-results?${queryParams.toString()}`);
  } catch (error) {
    if (error instanceof ZodError) {
      const searchFormErrors: SearchFormErrors = error.flatten();

      return { errors: searchFormErrors, status: 'validation-fail' };
    }

    // workaround to allow redirect inside a try catch
    // https://github.com/vercel/next.js/issues/55586#issuecomment-1877338010
    if (isRedirectError(error)) {
      throw error;
    }

    return { error: serializeError(new Error('Unknown error.')), status: 'error' };
  }
}
