'use client';

import type { FormContentProps } from '@/components/FormContent/FormContent';
import type { SearchFormSchema, SearchFormValues } from '@/schemas/searchForm/searchForm';
import type { ElementType, ReactElement } from 'react';

import dynamic from 'next/dynamic';
import { FormProvider, useForm } from 'react-hook-form';

// avoid hydration errors
// https://github.com/react-hook-form/devtools/issues/187
const DevTools: ElementType = dynamic(
  () => import('@hookform/devtools').then((module) => module.DevTool),
  { ssr: false },
);

type FormWrapperProps = {
  children: ReactElement;
};

// wrapper required to be able to use useFormStatus in child
function FormWrapper({ children }: FormWrapperProps): ReactElement {
  const form = useForm<SearchFormValues>({
    defaultValues: {
      amount: 1,
      unit: 'sqm',
    },
    // errors: todo
  });

  return (
    <FormProvider {...form}>
      {children}
      <DevTools control={form.control} />
    </FormProvider>
  );
}

export default FormWrapper;
