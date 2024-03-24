'use client';

import type { FormContentProps } from '@/components/FormContent/FormContent';
import type { SearchFormSchema } from '@/schemas/searchForm/searchForm';
import type { ReactElement } from 'react';

import { handleSearchFormSubmit } from '@/app/actions/handleSearchFormSubmit/handleSearchFormSubmit';
import { DevTool } from '@hookform/devtools';
import dynamic from 'next/dynamic';
import { useFormState } from 'react-dom';
import { Form, FormProvider, useForm } from 'react-hook-form';

import * as styles from './FormWrapper.css';

// avoid hydration errors
// https://github.com/react-hook-form/devtools/issues/187
const DevTools: React.ElementType = dynamic(
  () => import('@hookform/devtools').then((module) => module.DevTool),
  { ssr: false },
);

type FormWrapperProps = {
  children: (props: FormContentProps) => ReactElement; // Faac
};

// wrapper required to be able to use useFormStatus in child
function FormWrapper({ children }: FormWrapperProps): ReactElement {
  const [formState, action] = useFormState(handleSearchFormSubmit, null);
  const methods = useForm<SearchFormSchema>({
    defaultValues: {
      amount: 1,
      unit: 'sqm',
    },
    progressive: true,
  });

  return (
    <FormProvider {...methods}>
      <Form
        action={action}
        className={styles.formWrapper}
        control={methods.control}
        // method="post"
        onError={() => {}}
        onSubmit={() => {}}
        onSuccess={() => {}}
      >
        {children({ formState })}
      </Form>
      <DevTools control={methods.control} />
    </FormProvider>
  );
}

export default FormWrapper;
