import { expect, test } from '@playwright/experimental-ct-react';

import ComparisonList from './ComparisonList';

test.describe('ComparisonList', () => {
  test('renders', async ({ mount }) => {
    const component = await mount(
      <ComparisonList amount={500} amountCalculatedInDecimals={3} unit="sqm" />,
    );

    await expect(component).not.toBeEmpty();
    await expect(component.getByRole('listitem').first()).toContainText('Amount');
    await expect(component.getByRole('listitem').last()).toContainText('Unit');
  });

  test('has two values for amount', async ({ mount }) => {
    const component = await mount(
      <ComparisonList amount={50} amountCalculatedInDecimals={3} unit="sqm" />,
    );

    await expect(component).toContainText('50');
    await expect(component).toContainText('3.0');
  });

  test('has two values for unit', async ({ mount }) => {
    const component = await mount(
      <ComparisonList amount={50} amountCalculatedInDecimals={3} unit="sqm" />,
    );

    await expect(component).toContainText('sqm');
    await expect(component).toContainText('Football pitch');
  });
});
