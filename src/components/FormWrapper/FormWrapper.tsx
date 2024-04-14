'use client';

import type { FormContentProps } from '@/components/FormContent/FormContent';
import type { SearchFormValues } from '@/schemas/searchForm/searchForm';
import type { ElementType, ReactElement } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Form, FormProvider, useForm } from 'react-hook-form';

import * as styles from './FormWrapper.css';

// avoid hydration errors
// https://github.com/react-hook-form/devtools/issues/187
const DevTools: ElementType = dynamic(
  () => import('@hookform/devtools').then((module) => module.DevTool),
  { ssr: true },
);

type FormWrapperProps = {
  children: (props: FormContentProps) => ReactElement; // FaaC
};

function FormWrapper({ children }: FormWrapperProps): ReactElement {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { push } = useRouter();
  const methods = useForm<SearchFormValues>({
    defaultValues: {
      amount: 1,
      unit: 'sqm',
    },
    progressive: true, // adds necessary hidden fields for form action
  });

  return (
    <FormProvider {...methods}>
      <Form
        action="api/calculate-football-pitch-size"
        className={styles.formWrapper}
        control={methods.control}
        // @ts-expect-error union type mismatch
        method="POST"
        onError={async (response) => {
          // automatically sets error in 'root.server'
          setIsSubmitting(false);
          console.log('error response', await response);
        }}
        onSubmit={({ data, formData, formDataJson }) => {
          setIsSubmitting(true);
          console.log('post request', data, formData, formDataJson);
        }}
        onSuccess={async ({ response }) => {
          setIsSubmitting(false);

          if (response.ok) {
            const payload = await response.json();

            if (
              typeof payload !== 'object' ||
              payload === null ||
              !('data' in payload) ||
              typeof payload.data !== 'object' ||
              payload.data === null
            ) {
              methods.setError('root.server', {
                type: '400',
              });
              return;
            }

            console.log(payload);

            if ('queryParams' in payload.data) {
              const queryParams = new URLSearchParams({
                amount: payload.data.queryParams.amount,
                unit: payload.data.queryParams.unit,
              });

              push(`/calculated-results?${queryParams.toString()}`);
              return;
              // redirect(`/calculated-results?${queryParams.toString()}`);
            }

            methods.setError('root.server', {
              type: '400',
            });
          }
        }}
      >
        {children({
          formState: null,
          isSubmitting,
        })}
      </Form>
      <DevTools control={methods.control} />
    </FormProvider>
  );
}

export default FormWrapper;
