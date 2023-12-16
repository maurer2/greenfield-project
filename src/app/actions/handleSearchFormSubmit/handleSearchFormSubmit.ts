'use server';

import { setTimeout } from 'node:timers/promises';
import type { SearchFormSchema } from '@/schemas/searchForm/searchForm';
import searchFormSchema from '@/schemas/searchForm/searchForm';

export async function handleSearchFormSubmit(formValuesEncoded: FormData) {
  await setTimeout(1000);

  const amount = formValuesEncoded.get("amount");
  const unit = formValuesEncoded.get("unit");

  try {
    const formValues: SearchFormSchema = searchFormSchema.parse({
      amount,
      unit
    });
    console.log(`Valid form values received: ${JSON.stringify(formValues, null, 4)}`);

    return Promise.resolve('Success'); // todo
  } catch (error) {
    console.log('Invalid form values received');
    console.log(error);

    return Promise.reject('Error'); // todo
  }
}
