'use client';

import type { FormContentProps } from '@/components/FormContent/FormContent';
import type { SearchFormValues } from '@/schemas/searchForm/searchForm';
import type { ElementType, ReactElement } from 'react';

import { handleSearchFormSubmit } from '@/app/actions/handleSearchFormSubmit/handleSearchFormSubmit';
import dynamic from 'next/dynamic';
import { useFormState } from 'react-dom';
import { Form, FormProvider, useForm } from 'react-hook-form';

import * as styles from './FormWrapper.css';

// avoid hydration errors
// https://github.com/react-hook-form/devtools/issues/187
const DevTools: ElementType = dynamic(
  () => import('@hookform/devtools').then((module) => module.DevTool),
  { ssr: false },
);

type FormWrapperProps = {
  children: (props: FormContentProps) => ReactElement; // FaaC
};

// wrapper required to be able to use useFormStatus in child
function FormWrapper({ children }: FormWrapperProps): ReactElement {
  const [formState, action] = useFormState(handleSearchFormSubmit, null);
  const methods = useForm<SearchFormValues>({
    defaultValues: {
      amount: 1,
      unit: 'sqm',
    },
    progressive: true, // adds necessary hidden fields for form action
    // errors: todo
  });

  console.log(formState);

  return (
    <FormProvider {...methods}>
      <Form
        action="api/calculate-football-pitch-size"
        className={styles.formWrapper}
        control={methods.control}
        // @ts-expect-error union type mismatch
        method="POST"
        onError={(response) => {
          console.log('onError', response);
        }}
        onSubmit={({ data, formData, formDataJson }) => {
          // console.log(data, formData, formDataJson);
        }}
        onSuccess={({ response }) => {
          console.log('onSuccess', response);
        }}
      >
        {children({ formState })}
      </Form>
      <DevTools control={methods.control} />
    </FormProvider>
  );
}

export default FormWrapper;
