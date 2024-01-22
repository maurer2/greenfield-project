import { expect, test } from '@playwright/experimental-ct-react';

import SubmitButton from './SubmitButton';

test.describe('SubmitButton', () => {
  test('renders', async ({ mount }) => {
    const component = await mount(<SubmitButton>Button text</SubmitButton>);

    await expect(component).not.toBeEmpty();
    await expect(component).toContainText('Button text');
  });
});
