import { expect, test } from '@playwright/experimental-ct-react';

import ComparisonList from './ComparisonList';

test.describe('ComparisonList', () => {
  test('renders', async ({ mount }) => {
    const component = await mount(
      <ComparisonList amount={500} amountCalculatedInDecimals={3} unit="sqm" />,
    );

    await expect(component).not.toBeEmpty();
    await expect(component).toContainText('Amount');
    await expect(component).toContainText('Unit');
  });
});
