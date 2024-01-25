import { expect, test } from '@playwright/experimental-ct-react';
import { mock } from 'node:test';

import SubmitButton from './SubmitButton';

const mocks = {
  onBlur: () => {},
  onClick: () => {},
};

test.describe('SubmitButton', () => {
  const onClickSpy = mock.method(mocks, 'onClick', async () => {});
  const onBlurSpy = mock.method(mocks, 'onBlur', async () => {});

  test.beforeEach(async () => {
    mock.reset();
  });

  test('renders', async ({ mount }) => {
    const component = await mount(<SubmitButton onClick={onClickSpy}>Button text</SubmitButton>);

    await expect(component).not.toBeEmpty();
    await expect(component).toContainText('Button text');
  });

  test('disables button when disabled prop is set', async ({ mount }) => {
    const component = await mount(<SubmitButton isDisabled>Button text</SubmitButton>);

    expect(component).toBeDisabled();
  });

  test('triggers onClick callback function on click', async ({ mount }) => {
    const component = await mount(<SubmitButton onClick={onClickSpy}>Button text</SubmitButton>);

    await component.click();

    expect(onClickSpy.mock.callCount()).toBeTruthy();
  });

  test('triggers onBlur callback function on blur', async ({ mount }) => {
    const component = await mount(<SubmitButton onBlur={onBlurSpy}>Button text</SubmitButton>);

    await component.focus();
    await component.blur();

    expect(onBlurSpy.mock.callCount()).toBeTruthy();
  });
});
