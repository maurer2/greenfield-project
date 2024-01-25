import { expect, test } from '@playwright/experimental-ct-react';

import ComparisonBox from './ComparisonBox';

test.describe('ComparisonBox', () => {
  test('renders', async ({ mount }) => {
    const component = await mount(<ComparisonBox amount={7_140} unit="sqm" />);

    await expect(component).not.toBeEmpty();
    await expect(component.getByRole('heading')).toContainText('Calculated Results');
  });

  test('has back button', async ({ mount }) => {
    const component = await mount(<ComparisonBox amount={7_140} unit="sqm" />);

    await expect(component.getByRole('link')).toContainText('Back');
    await expect(component.getByRole('link')).toHaveAttribute('href', '/');
  });

  test('calculates correctly 1', async ({ mount }) => {
    const component = await mount(<ComparisonBox amount={7_140} unit="sqm" />);

    await expect(component).toContainText('1.00');
  });

  test('calculates correctly 2', async ({ mount }) => {
    const component = await mount(<ComparisonBox amount={3_570} unit="sqm" />);
    await expect(component).toContainText('0.50');
  });

  test('supports imperial units', async ({ mount }) => {
    const component = await mount(<ComparisonBox amount={3_570} unit="sqft" />);
    await expect(component).toContainText('sqft');
  });
});
