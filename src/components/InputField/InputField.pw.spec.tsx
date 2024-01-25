import type { ComponentPropsWithoutRef } from 'react';

import { expect, test } from '@playwright/experimental-ct-react';
import { mock } from 'node:test';

import InputField from './InputField';

const mocks = {
  onBlur: () => {},
  onChange: () => {},
};

test.describe('InputField', () => {
  const onChangeSpy = mock.method(mocks, 'onChange', async () => {});
  const onBlurSpy = mock.method(mocks, 'onBlur', async () => {});

  test.beforeEach(async () => {
    mock.reset();
  });

  const propsDefault: ComponentPropsWithoutRef<typeof InputField> = {
    label: 'Label',
    name: 'field',
    onChange: onChangeSpy,
    value: '100',
  };

  test('renders', async ({ mount }) => {
    const component = await mount(<InputField {...propsDefault} />);

    await expect(component).toContainText('Label');
    await expect(component.getByRole('textbox')).toBeVisible();
  });

  test('has correct value prefilled', async ({ mount }) => {
    const component = await mount(<InputField {...propsDefault} />);

    await expect(component.getByRole('textbox')).toHaveValue('100');
  });

  test('triggers onChange callback function when value changes', async ({ mount }) => {
    const component = await mount(<InputField {...propsDefault} />);

    // await component.getByRole('textbox').clear();
    await component.getByRole('textbox').fill('5000');

    expect(onChangeSpy.mock.callCount()).toBeTruthy();
  });

  test('triggers onBlur callback function on blur', async ({ mount }) => {
    const component = await mount(<InputField {...propsDefault} onBlur={onBlurSpy} />);

    await component.getByRole('textbox').focus();
    await component.getByRole('textbox').blur();

    expect(onBlurSpy.mock.callCount()).toBeTruthy();
  });

  test('adds error attributes to input', async ({ mount }) => {
    const component = await mount(<InputField {...propsDefault} errors={['Error message']} />);

    await expect(component.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    await expect(component.getByRole('textbox')).toHaveAttribute('aria-describedby', 'field-error');
  });

  test('shows error message if there is an error', async ({ mount }) => {
    const component = await mount(<InputField {...propsDefault} errors={['Error message']} />);

    await expect(component.getByTestId('input-errors')).not.toBeEmpty();
    await expect(component.getByText('Error message')).toBeVisible();
  });
});
