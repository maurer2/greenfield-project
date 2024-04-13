'use client';

import type { FormContentProps } from '@/components/FormContent/FormContent';
import type { SearchFormValues } from '@/schemas/searchForm/searchForm';
import type { ElementType, ReactElement } from 'react';

import { handleSearchFormSubmit } from '@/app/actions/handleSearchFormSubmit/handleSearchFormSubmit';
import dynamic from 'next/dynamic';
import { redirect, useRouter } from 'next/navigation';
import { useState } from 'react';
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { push } = useRouter();
  const [formState, action] = useFormState(handleSearchFormSubmit, null);
  const methods = useForm<SearchFormValues>({
    defaultValues: {
      amount: 1,
      unit: 'sqm',
    },
    progressive: true, // adds necessary hidden fields for form action
    // errors: todo
  });

  return (
    <FormProvider {...methods}>
      <Form
        action="api/calculate-football-pitch-size"
        className={styles.formWrapper}
        control={methods.control}
        // @ts-expect-error union type mismatch
        method="POST"
        onError={(response) => {
          setIsSubmitting(false);
          console.log('onError', response);
        }}
        onSubmit={({ data, formData, formDataJson }) => {
          setIsSubmitting(true);
        }}
        onSuccess={async ({ response }) => {
          setIsSubmitting(false);

          if (response.ok) {
            const data = await response.json();

            if ('queryParams' in data) {
              const queryParams = new URLSearchParams({
                amount: data?.queryParams.amount,
                unit: data?.queryParams.unit,
              });

              console.log(`/calculated-results?${queryParams.toString()}`);

              push(`/calculated-results?${queryParams.toString()}`);
              // redirect(`/calculated-results?${queryParams.toString()}`);
            }
          }
        }}
      >
        {children({
          formState,
          isSubmitting,
        })}
      </Form>
      <DevTools control={methods.control} />
    </FormProvider>
  );
}

export default FormWrapper;
