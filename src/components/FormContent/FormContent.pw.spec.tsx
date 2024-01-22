import { expect, test } from '@playwright/experimental-ct-react';

import FormContent from './FormContent';

// fails due to import useFormStatus only available in canary react release
test.describe.skip('FormContent', () => {
  test('renders', async ({ mount }) => {
    const component = await mount(
      <FormContent
        formState={{
          error: {
            fieldErrors: {
              amount: ['Error'],
              unit: ['Error'],
            },
            formErrors: [],
          },
          status: 'error',
        }}
      />,
    );

    await expect(component).not.toBeEmpty();
  });
});
