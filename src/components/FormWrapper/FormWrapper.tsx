import type { PropsWithChildren, ReactElement } from 'react';

import { handleSearchFormSubmit } from '@/app/actions/handleSearchFormSubmit/handleSearchFormSubmit';

import * as styles from './FormWrapper.css';

// required to be able to use useFormStatus in child
function FormWrapper({ children }: PropsWithChildren): ReactElement {
  return (
    <form action={handleSearchFormSubmit} className={styles.formWrapper}>
      {children}
    </form>
  );
}

export default FormWrapper;
