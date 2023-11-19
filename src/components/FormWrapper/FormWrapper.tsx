"use client";

import { FormEvent, ReactElement } from "react";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { ZodError } from "zod";

import InputField from "@/components/InputField/InputField";
import SelectBox from "@/components/SelectBox/SelectBox";

import searchFormSchema from "@/schemas/searchForm/searchForm";
import type { SearchFormSchema } from "@/schemas/searchForm/searchForm";

import * as styles from "./FormWrapper.css";

const FormWrapper = (): ReactElement => {
  const form = useForm({
    defaultValues: {
      amount: 0,
      unit: "sqm",
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
      <form action="" onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.wrapper}>
          <form.Field
            name="amount"
            defaultValue={form.options.defaultValues?.amount}
            onChange={searchFormSchema.shape.amount}
            // workaround to show errors when untouched form is submitted
            // https://github.com/TanStack/form/issues/469
            // breaks resubmitting -> fix https://github.com/TanStack/form/pull/520
            onSubmitAsync={async (value) => {
              try {
                searchFormSchema.shape.amount.parse(value)
                return null;
              } catch (error) {
                if (error instanceof ZodError) {
                  return error.issues[0].message;
                }
                return 'Unknown Error'
              }
            }}
            children={(field) => (
              <InputField
                label="Amount"
                // 0 needs to be allowed
                value={(typeof field.state?.value === 'undefined') || Number.isNaN(field.state?.value)
                  ? ''
                  : field.state.value.toString()
                }
                errors={field.state.meta.touchedErrors}
                onBlur={field.handleBlur}
                onChange={(event: FormEvent<HTMLInputElement>) => {
                  // https://github.com/orgs/react-hook-form/discussions/10530
                  field.handleChange(parseInt( event.currentTarget.value, 10));
                }}
              />
            )}
          />
          <form.Field
            name="unit"
            defaultValue={form.options.defaultValues?.unit}
            onChange={searchFormSchema.shape.unit}
            children={(field) => (
              <SelectBox
                label="Unit"
                value={field.state.value}
                errors={field.state.meta.touchedErrors}
                onBlur={field.handleBlur}
                options={searchFormSchema.shape.unit.options}
                onChange={(event: FormEvent<HTMLSelectElement>) => {
                  const { value } = event.currentTarget;

                  if (!units.includes(value)) {
                    field.handleChange("sqm");
                    return;
                  }

                  // value is now one of the unit type values
                  // field.handleChange(value as Unit);
                  field.handleChange(value as any);
                }}
              />
            )}
          />
          {/* form.state.isFormValid currently always true */}
          <button
            type="submit"
            className={styles.submitButton}
            disabled={!form.state.isFormValid}
          >
            Calculate
          </button>
        </div>
      </form>
    </form.Provider>
  );
};

export default FormWrapper;
