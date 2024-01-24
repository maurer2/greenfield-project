import { expect, test } from '@playwright/experimental-ct-react';
import { spy } from 'tinyspy';

import SubmitButton from './SubmitButton';

test.describe('SubmitButton', () => {
  const onClickSpy = spy();
  const onBlurSpy = spy();

  test.beforeEach(async () => {
    onClickSpy.reset();
    onBlurSpy.reset();
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

    expect(onClickSpy.called).toBeTruthy();
  });

  test('triggers onBlur callback function on blur', async ({ mount }) => {
    const component = await mount(<SubmitButton onBlur={onBlurSpy}>Button text</SubmitButton>);

    await component.focus();
    await component.blur();

    expect(onBlurSpy.called).toBeTruthy();
  });
});
