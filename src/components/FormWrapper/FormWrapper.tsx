'use client';

import type { /* ElementType, */ ReactNode } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
// import dynamic from 'next/dynamic';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import type { SearchFormValues, Unit } from '@/schemas/searchForm/searchForm';

import searchFormSchema from '@/schemas/searchForm/searchForm';

// avoid hydration errors
// https://github.com/react-hook-form/devtools/issues/187
// const DevTools: ElementType = dynamic(
//   () => import('@hookform/devtools').then((module) => module.DevTool),
//   { ssr: false },
// );

type FormWrapperProps = {
  amount: number;
  children: ReactNode;
  unit: Unit;
};

export default function FormWrapper({ amount, children, unit }: FormWrapperProps) {
  const form = useForm({
    defaultValues: {
      amount,
      unit,
    },
    mode: 'onBlur',
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
