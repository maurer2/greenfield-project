'use client';

import type { FormContentProps } from '@/components/FormContent/FormContent';
import type { ReactElement } from 'react';

import { handleSearchFormSubmit } from '@/app/actions/handleSearchFormSubmit/handleSearchFormSubmit';
import { useFormState } from 'react-dom';

import * as styles from './FormWrapper.css';

type FormWrapperProps = {
  children: (props: FormContentProps) => ReactElement; // Faac
};

// wrapper required to be able to use useFormStatus in child
function FormWrapper({ children }: FormWrapperProps): ReactElement {
  const [formState, action] = useFormState(handleSearchFormSubmit, {
    status: 'idle',
  });

  return (
    <form action={action} className={styles.formWrapper}>
      {children({ formState })}
    </form>
  );
}

export default FormWrapper;
