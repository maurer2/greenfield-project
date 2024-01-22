import { expect, test } from '@playwright/experimental-ct-react';

import SelectBox from './SelectBox';

test.describe('SubmitButton', () => {
  test('renders', async ({ mount }) => {
    let hasChanged = false; // workaround for lack of mock function
    const component = await mount(
      <SelectBox
        label="Label"
        name="field"
        onChange={() => {
          hasChanged = true;
        }}
        options={['sqm', 'sqft']}
        value="sqm"
      />,
    );

    await expect(component).toContainText('Label');
    await expect(hasChanged).toBeFalsy();
  });
});
