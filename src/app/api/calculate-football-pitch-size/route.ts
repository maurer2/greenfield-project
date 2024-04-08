import type { SearchFormErrors, SearchFormSchema } from '@/schemas/searchForm/searchForm';

import searchFormSchema from '@/schemas/searchForm/searchForm';
import { redirect } from 'next/navigation';
import { serializeError } from 'serialize-error';
import { ZodError } from 'zod';

export async function POST(request: Request) {
  const payload = await request.formData();

  const amount = payload.get('amount');
  const unit = payload.get('unit');

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

    return Response.json({
      data: 'OK',
      queryParams: {
        amount: amount.toString(),
        unit: unit.toString(),
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const searchFormErrors: SearchFormErrors = error.flatten();

      return Response.json({ error: searchFormErrors });
    }

    return { error: serializeError(new Error('Unknown error.')), status: 'error' };
  }

  // doesn't work with RHF hook form but with regular form
  redirect('/calculated-results?amount=1&unit=sqm');
}
