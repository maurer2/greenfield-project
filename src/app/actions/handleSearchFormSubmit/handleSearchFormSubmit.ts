'use server';

import type { SearchFormErrors, SearchFormSchema } from '@/schemas/searchForm/searchForm';
import type { ErrorObject } from 'serialize-error';

import searchFormSchema from '@/schemas/searchForm/searchForm';
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
  | {
      hasBeenSubmittedSuccessfullyBefore?: boolean;
      status: 'success';
    }
  | {
      status: 'idle';
    };

// eslint-disable-next-line consistent-return
export async function handleSearchFormSubmit(
  prevSearchFormSubmitActionResult: SearchFormSubmitActionResult,
  formData: FormData,
): Promise<SearchFormSubmitActionResult | undefined> {
  await setTimeout(1500);

  let isSuccess = false;

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
    isSuccess = true;

    // return {
    //   hasBeenSubmittedSuccessfullyBefore: prevSearchFormSubmitActionResult?.status === 'success',
    //   status: 'success',
    // };
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      const searchFormErrors: SearchFormErrors = error.flatten();

      return { errors: searchFormErrors, status: 'validation-fail' };
    }

    return { error: serializeError(new Error('Unknown error.')), status: 'error' };
  }

  // https://github.com/vercel/next.js/issues/55586#issuecomment-1869024539
  if (isSuccess) {
    redirect('/calculated-results');
  }
}
