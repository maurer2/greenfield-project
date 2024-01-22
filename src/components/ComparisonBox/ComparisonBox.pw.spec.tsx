import { expect, test } from '@playwright/experimental-ct-react';

import ComparisonBox from './ComparisonBox';

test.describe('ComparisonBox', () => {
  test('renders', async ({ mount }) => {
    const component = await mount(<ComparisonBox amount={500} unit="sqm" />);

    await expect(component).not.toBeEmpty();
    await expect(component.getByRole('heading')).toContainText('Calculated Results');
  });
});
