"use client";

import { FormEvent, ReactElement } from "react";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";

import InputField from "../InputField/InputField";
import SelectBox from "../SelectBox/SelectBox";

import * as styles from "./FormWrapper.css";

const units = ["sqm", "sqft"] as const satisfies readonly string[];
export type Unit = (typeof units)[number];

type FormValues = {
  amount: string; // todo
  unit: Unit;
};

export function listFormatterOr<T extends string[]>(list: T): string {
  return new Intl.ListFormat("en-gb", {
    style: "long",
    type: "disjunction",
  }).format(list);
}

const FormWrapper = (): ReactElement => {
  const form = useForm({
    defaultValues: {
      amount: "1",
      unit: "sqm",
    } satisfies FormValues,
    onSubmit: async (values) => {
      console.log(values);
    },
    onSubmitInvalid: async (values) => {
      console.log(values);
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
            onChange={z.coerce
              .number({
                required_error: "Amount is required",
                invalid_type_error: "Amount must be number-like",
              })
              .positive("Amount must be at least 1")}
            children={(field) => (
              <InputField
                label="Amount"
                value={field.state.value ?? "1"}
                errors={field.state.meta.touchedErrors}
                onBlur={field.handleBlur}
                onChange={(event: FormEvent<HTMLInputElement>) => {
                  field.handleChange(event.currentTarget.value);
                }}
              />
            )}
          />
          <form.Field
            name="unit"
            onChange={z.enum(units, {
              // https://github.com/colinhacks/zod/issues/580#issuecomment-1425044684
              errorMap: (issue, ctx) => ({
                message: `Unit must be ${listFormatterOr([...units])}`,
              }),
            })}
            children={(field) => (
              <SelectBox
                label="Unit"
                value={field.state.value}
                errors={field.state.meta.touchedErrors}
                onBlur={field.handleBlur}
                options={[...units]}
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
