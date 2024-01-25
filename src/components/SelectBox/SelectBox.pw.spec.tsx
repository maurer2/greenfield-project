import type { ComponentPropsWithoutRef } from 'react';

import { expect, test } from '@playwright/experimental-ct-react';
import { mock } from 'node:test';

import SelectBox from './SelectBox';

const mocks = {
  onBlur: () => {},
  onChange: () => {},
};

test.describe('SelectBox', () => {
  const onChangeSpy = mock.method(mocks, 'onChange', async () => {});
  const onBlurSpy = mock.method(mocks, 'onBlur', async () => {});

  test.beforeEach(async () => {
    mock.reset();
  });

  const propsDefault: ComponentPropsWithoutRef<typeof SelectBox> = {
    label: 'Label',
    name: 'field',
    onChange: onChangeSpy,
    options: ['sqm', 'sqft'],
    value: 'sqm',
  };

  test('renders', async ({ mount }) => {
    const component = await mount(<SelectBox {...propsDefault} />);

    await expect(component).toContainText('Label');
    await expect(component.getByRole('combobox')).toBeVisible();
  });

  test('has correct value preselected', async ({ mount }) => {
    const component = await mount(<SelectBox {...propsDefault} />);

    await expect(component.getByRole('combobox')).toHaveValue('sqm');
  });

  test('triggers onChange callback function when value changes', async ({ mount }) => {
    const component = await mount(<SelectBox {...propsDefault} />);

    await component.getByRole('combobox').selectOption('sqft');

    expect(onChangeSpy.mock.callCount()).toBeTruthy();
  });

  test('triggers onBlur callback function on blur', async ({ mount }) => {
    const component = await mount(<SelectBox {...propsDefault} onBlur={onBlurSpy} />);

    await component.getByRole('combobox').focus();
    await component.getByRole('combobox').blur();

    expect(onBlurSpy.mock.callCount()).toBeTruthy();
  });

  test('adds error attributes to select', async ({ mount }) => {
    const component = await mount(<SelectBox {...propsDefault} errors={['Error message']} />);

    await expect(component.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');
    await expect(component.getByRole('combobox')).toHaveAttribute(
      'aria-describedby',
      'field-error',
    );
  });

  test('shows error message if there is an error', async ({ mount }) => {
    const component = await mount(<SelectBox {...propsDefault} errors={['Error message']} />);

    await expect(component.getByTestId('select-errors')).not.toBeEmpty();
    await expect(component.getByText('Error message')).toBeVisible();
  });
});
