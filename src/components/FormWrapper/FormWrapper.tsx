'use client';

import type { PropsWithChildren, ReactElement } from 'react';

import { handleSearchFormSubmit } from '@/app/actions/handleSearchFormSubmit/handleSearchFormSubmit';
import { cloneElement, isValidElement } from 'react';
import { useFormState } from 'react-dom';

import * as styles from './FormWrapper.css';

// required to be able to use useFormStatus in child
function FormWrapper({ children }: PropsWithChildren): ReactElement {
  const [formState, action] = useFormState(handleSearchFormSubmit, {
    status: 'idle',
  });

  const childrenWithFormState = isValidElement(children)
    ? cloneElement(children, {
        formState, // todo
      })
    : null;

  return (
    <form action={action} className={styles.formWrapper}>
      {childrenWithFormState}
    </form>
  );
}

export default FormWrapper;
