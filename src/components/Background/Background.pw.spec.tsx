import { expect, test } from '@playwright/experimental-ct-react';

import Background from './Background';

test.describe('Background', () => {
  test('renders', async ({ mount }) => {
    const component = await mount(<Background />);

    await expect(component.getByRole('img')).toBeVisible();
  });
});
