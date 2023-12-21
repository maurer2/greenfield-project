'use server';

import type { SearchFormSchema } from '@/schemas/searchForm/searchForm';

import searchFormSchema from '@/schemas/searchForm/searchForm';
import { setTimeout } from 'node:timers/promises';

export async function handleSearchFormSubmit(formValuesEncoded: FormData) {
  await setTimeout(1000);

  const amount = formValuesEncoded.get('amount');
  const unit = formValuesEncoded.get('unit');

  try {
    const formValues: SearchFormSchema = searchFormSchema.parse({
      amount,
      unit,
    });
    console.log(`Valid form values received: ${JSON.stringify(formValues, null, 4)}`);

    return await Promise.resolve('Success'); // todo
  } catch (error) {
    console.log('Invalid form values received');
    console.log(error);

    return Promise.reject(new Error('Error')); // todo
  }
}
