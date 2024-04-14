import type { SearchFormErrors, SearchFormSchema } from '@/schemas/searchForm/searchForm';

import searchFormSchema from '@/schemas/searchForm/searchForm';
import { ZodError } from 'zod';

export async function POST(request: Request) {
  // eslint-disable-next-line no-promise-executor-return
  // await new Promise((resolve) => setTimeout(resolve, 1500));

  const payload = await request.formData();

  const amount = payload.get('amount');
  const unit = payload.get('unit');

  if (!amount || !unit) {
    return new Response(null, {
      status: 400,
      statusText: '"Amount" or "Unit" parameter are missing', // not added to error message in frontend atm
    });
  }

  try {
    const formValues: SearchFormSchema = searchFormSchema.parse({
      amount,
      unit,
    });
    console.log(`Valid form values received: ${JSON.stringify(formValues, null, 4)}`);

    return Response.json({
      data: {
        queryParams: {
          amount: amount.toString(),
          unit: unit.toString(),
        },
      },
      status: 'success',
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const searchFormErrors: SearchFormErrors = error.flatten();

      return Response.json(searchFormErrors, {
        status: 422,
        statusText: 'Validation failed', // not added to error message in frontend atm
      });
    }

    return Response.json(null, {
      status: 500,
      statusText: 'Unknown error', // not added to error message in frontend atm
    });
  }

  // doesn't currently work with RHF hook form but with regular html form
  // redirect('/calculated-results?amount=1&unit=sqm');
}
