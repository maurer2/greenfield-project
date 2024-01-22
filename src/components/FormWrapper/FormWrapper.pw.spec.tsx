import { expect, test } from '@playwright/experimental-ct-react';

import FormWrapper from './FormWrapper';

// breaks due to handleSearchFormSubmit not being mockable
test.describe.skip('FormWrapper', () => {
  test('renders', async ({ mount }) => {
    const component = await mount(<FormWrapper>{() => <div>Child content</div>}</FormWrapper>);

    await expect(component).toContainText('Child content');
  });
});
