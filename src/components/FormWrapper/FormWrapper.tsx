'use client';

import type { SearchFormSchema } from '@/schemas/searchForm/searchForm';
import type { FormEvent, ReactElement } from 'react';

import InputField from '@/components/InputField/InputField';
import SelectBox from '@/components/SelectBox/SelectBox';
import searchFormSchema from '@/schemas/searchForm/searchForm';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { ZodError } from 'zod';

import * as styles from './FormWrapper.css';

function FormWrapper(): ReactElement {
  const form = useForm({
    defaultValues: {
      amount: 0,
      unit: 'sqm',
    } satisfies SearchFormSchema,
    onSubmit: async (values) => {
      console.log('submitted values', values);
    },
    validator: zodValidator,
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    form.handleSubmit();
  }

  return (
    <form.Provider>
      <form action="" className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.wrapper}>
          <form.Field
            // eslint-disable-next-line react/no-children-prop
            children={(field) => (
              <InputField
                errors={field.state.meta.touchedErrors}
                label="Amount"
                onBlur={field.handleBlur}
                onChange={(event: FormEvent<HTMLInputElement>) => {
                  // https://github.com/orgs/react-hook-form/discussions/10530
                  field.handleChange(parseInt(event.currentTarget.value, 10));
                }}
                // 0 needs to be allowed
                value={
                  typeof field.state?.value === 'undefined' || Number.isNaN(field.state?.value)
                    ? ''
                    : field.state.value.toString()
                }
              />
            )}
            defaultValue={form.options.defaultValues?.amount}
            name="amount"
            // workaround to show errors when untouched form is submitted
            // https://github.com/TanStack/form/issues/469
            onChange={searchFormSchema.shape.amount}
            // breaks resubmitting -> fix https://github.com/TanStack/form/pull/520
            onSubmitAsync={async (value) => {
              try {
                searchFormSchema.shape.amount.parse(value);
                return null;
              } catch (error) {
                if (error instanceof ZodError) {
                  return error.issues[0].message;
                }
                return 'Unknown Error';
              }
            }}
          />
          <form.Field
            // eslint-disable-next-line react/no-children-prop
            children={(field) => (
              <SelectBox
                errors={field.state.meta.touchedErrors}
                label="Unit"
                onBlur={field.handleBlur}
                onChange={(event: FormEvent<HTMLSelectElement>) => {
                  const { value } = event.currentTarget;

                  if (!units.includes(value)) {
                    field.handleChange('sqm');
                    return;
                  }

                  // value is now one of the unit type values
                  // field.handleChange(value as Unit);
                  field.handleChange(value as any);
                }}
                options={searchFormSchema.shape.unit.options}
                value={field.state.value}
              />
            )}
            defaultValue={form.options.defaultValues?.unit}
            name="unit"
            onChange={searchFormSchema.shape.unit}
          />
          {/* form.state.isFormValid currently always true */}
          <button className={styles.submitButton} disabled={!form.state.isFormValid} type="submit">
            Calculate
          </button>
        </div>
      </form>
    </form.Provider>
  );
}

export default FormWrapper;
