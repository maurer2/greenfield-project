'use client';

import type { /* ElementType, */ ReactNode } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
// import dynamic from 'next/dynamic';
import { useQueryStates } from 'nuqs';
import { useEffect } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import type { SearchFormValues } from '@/schemas/searchForm/searchForm';

import { calculationSearchParamsConfigWithDefaults } from '@/lib/calculationSearchParams/calculationSearchParams';
import searchFormSchema from '@/schemas/searchForm/searchForm';

// avoid hydration errors
// https://github.com/react-hook-form/devtools/issues/187
// const DevTools: ElementType = dynamic(
//   () => import('@hookform/devtools').then((module) => module.DevTool),
//   { ssr: false },
// );

type FormWrapperProps = {
  children: ReactNode; // https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/69436#discussioncomment-9526336
};

export default function FormWrapper({ children }: FormWrapperProps) {
  const [calculationSearchParams, setCalculationSearchParams] = useQueryStates(
    calculationSearchParamsConfigWithDefaults,
  );
  const form = useForm({
    defaultValues: calculationSearchParams, // not reactive
    mode: 'onBlur',
    resolver: zodResolver(searchFormSchema),
  });

  // persist valid form values in url query params
  useEffect(() => {
    const unsubscribe = form.subscribe({
      callback: ({ isValid, values }) => {
        if (!isValid) {
          return;
        }

        // parsed values from resolver can't be accessed in subscribe or useWatch
        const result = searchFormSchema.safeParse(values);
        if (!result.success) {
          return;
        }

        setCalculationSearchParams({ amount: result.data.amount, unit: result.data.unit });
      },
      formState: { isValid: true, values: true },
      name: ['amount', 'unit'],
    });

    return () => unsubscribe();
  }, [form, setCalculationSearchParams]);

  return (
    <FormProvider {...form}>
      {children}
      {/* <DevTools control={form.control} /> */}
    </FormProvider>
  );
}

// context helper hook for proper types as useFormContext doesn't have type inference like useForm
export const useSearchFormContext = () => useFormContext<SearchFormValues>();
