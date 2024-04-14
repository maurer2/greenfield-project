'use client';

import type { FormContentProps } from '@/components/FormContent/FormContent';
import type { SearchFormValues } from '@/schemas/searchForm/searchForm';
import type { ElementType, ReactElement } from 'react';

import searchFormSchema from '@/schemas/searchForm/searchForm';
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

const hasDataInPayload = (payload: unknown): payload is { data: unknown } =>
  typeof payload === 'object' && payload !== null && 'data' in payload;

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
        action="api/validate-search-form-values"
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

          const payload = await response.json();
          if (!hasDataInPayload(payload)) {
            methods.setError('root.server', {
              type: '400',
            });
            return;
          }

          const formValues = searchFormSchema.safeParse(payload.data);
          if (formValues.success) {
            const queryParams = new URLSearchParams({
              amount: formValues.data.amount.toString(),
              unit: formValues.data.unit,
            });

            push(`/calculated-results?${queryParams.toString()}`);
            return;
          }

          methods.setError('root.server', {
            type: '400',
          });
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
