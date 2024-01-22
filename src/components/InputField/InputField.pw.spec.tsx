import { expect, test } from '@playwright/experimental-ct-react';

import InputField from './InputField';

test.describe('InputField', () => {
  test('renders', async ({ mount }) => {
    let hasChanged = false; // workaround for lack of mock function
    const component = await mount(
      <InputField
        label="Label"
        name="field"
        onChange={() => {
          hasChanged = true;
        }}
        value="100"
      />,
    );

    await expect(component).toContainText('Label');
    await expect(hasChanged).toBeFalsy();
  });
});
