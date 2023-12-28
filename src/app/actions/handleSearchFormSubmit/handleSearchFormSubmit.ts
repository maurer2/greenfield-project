'use server';

import type { SearchFormSchema } from '@/schemas/searchForm/searchForm';
import type { ErrorObject } from 'serialize-error';

import searchFormSchema from '@/schemas/searchForm/searchForm';
import { setTimeout } from 'node:timers/promises';
import { serializeError } from 'serialize-error';
import { ZodError } from 'zod';

export type SearchFormSubmitActionResult =
  | {
      errors: ErrorObject[];
      status: 'error';
    }
  | {
      hasBeenSubmittedSuccessfullyBefore?: boolean;
      status: 'success';
    }
  | {
      status: 'idle';
    };

export async function handleSearchFormSubmit(
  prevSearchFormSubmitActionResult: SearchFormSubmitActionResult,
  formData: FormData,
): Promise<SearchFormSubmitActionResult> {
  await setTimeout(1000);

  const amount = formData.get('amount');
  const unit = formData.get('unit');

  if (!amount || !unit) {
    return { errors: [serializeError(new Error('Amount or Unit value missing'))], status: 'error' };
  }

  try {
    const formValues: SearchFormSchema = searchFormSchema.parse({
      amount,
      unit,
    });
    console.log(`Valid form values received: ${JSON.stringify(formValues, null, 4)}`);

    return {
      hasBeenSubmittedSuccessfullyBefore: prevSearchFormSubmitActionResult?.status === 'success',
      status: 'success',
    };
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.flatten();

      return { errors: [serializeError(errors)], status: 'error' };
    }

    return { errors: [serializeError(new Error('Unknown error'))], status: 'error' };
  }
}
