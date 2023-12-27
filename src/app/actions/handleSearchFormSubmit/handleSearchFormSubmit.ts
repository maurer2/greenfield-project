'use server';

import type { SearchFormSchema } from '@/schemas/searchForm/searchForm';
import type { ErrorObject } from 'serialize-error';

import searchFormSchema from '@/schemas/searchForm/searchForm';
import { setTimeout } from 'node:timers/promises';
import { deserializeError, serializeError } from 'serialize-error';

export type SearchFormSubmitActionResult =
  | {
      error: ErrorObject[];
      status: 'error';
    }
  | {
      hasBeenSubmittedPreviously?: boolean;
      status: 'success';
    }
  | {
      status: 'idle';
    };

export async function handleSearchFormSubmit(
  _,
  formData: FormData,
): Promise<SearchFormSubmitActionResult> {
  await setTimeout(1000);

  // const amount = formValuesEncoded.get('amount');
  // const unit = formValuesEncoded.get('unit');
  console.log('formData', formData);

  return { status: 'success' };

  // return { error: [serializeError(new Error('test'))], status: 'error' };

  // try {
  //   const formValues: SearchFormSchema = searchFormSchema.parse({
  //     amount,
  //     // unit,
  //   });
  //   console.log(`Valid form values received: ${JSON.stringify(formValues, null, 4)}`);

  //   return await Promise.resolve('Success'); // todo
  // } catch (error) {
  //   console.log('Invalid form values received');
  //   console.log(error);

  //   return Promise.reject(new Error('Error')); // todo
  // }
}
