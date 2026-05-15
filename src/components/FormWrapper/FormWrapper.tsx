'use client';

import type { /* ElementType, */ ReactElement } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
// import dynamic from 'next/dynamic';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

// import type { FormContentProps } from '@/components/FormContent/FormContent';
import type { SearchFormValues } from '@/schemas/searchForm/searchForm';

import searchFormSchema from '@/schemas/searchForm/searchForm';

// avoid hydration errors
// https://github.com/react-hook-form/devtools/issues/187
// const DevTools: ElementType = dynamic(
//   () => import('@hookform/devtools').then((module) => module.DevTool),
//   { ssr: false },
// );

type FormWrapperProps = {
  children: ReactElement;
};

export default function FormWrapper({ children }: FormWrapperProps): ReactElement {
  const form = useForm({
    defaultValues: {
      amount: 1,
      unit: 'sqm',
    },
    resolver: zodResolver(searchFormSchema),
  });

  return (
    <FormProvider {...form}>
      {children}
      {/* <DevTools control={form.control} /> */}
    </FormProvider>
  );
}

// context helper hook for proper types as useFormContext doesn't have type inference like useForm
export const useSearchFormContext = () => useFormContext<SearchFormValues>();
