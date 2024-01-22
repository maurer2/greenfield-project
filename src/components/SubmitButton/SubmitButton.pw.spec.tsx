import { expect, test } from '@playwright/experimental-ct-react';

import SubmitButton from './SubmitButton';

test.describe('SubmitButton', () => {
  test('renders', async ({ mount }) => {
    const component = await mount(<SubmitButton>ButtonText</SubmitButton>);

    await expect(component.getByRole('button')).not.toBeEmpty();
    await expect(component.getByRole('button')).toContainText('ButtonText');
  });
});
