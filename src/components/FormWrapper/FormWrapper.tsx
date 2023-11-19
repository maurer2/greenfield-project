"use client";

import { FormEvent, ReactElement } from "react";
import { useForm } from "@tanstack/react-form";

import InputField from "../InputField/InputField";
import SelectBox from "../SelectBox/SelectBox";

import * as styles from "./FormWrapper.css";

const units = ["sqm", "sqft"] as const;
export type Unit = (typeof units)[number];

type FormValues = {
  amount: string; // todo
  unit: Unit;
};

const FormWrapper = (): ReactElement => {
  const form = useForm<FormValues, () => {}>({
    defaultValues: {
      amount: "0",
      unit: "sqm",
    },
    onSubmit: async (values) => {
      console.log(values);
    },
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
            children={(field) => (
              <InputField
                label="Value"
                value={field.state.value ?? "0"}
                onBlur={field.handleBlur}
                onChange={(event: FormEvent<HTMLInputElement>) =>
                  field.handleChange(event.currentTarget.value)
                }
              />
            )}
          />
          <form.Field
            name="unit"
            children={(field) => (
              <SelectBox
                label="Unit"
                value={field.state.value}
                onBlur={field.handleBlur}
                options={[...units]}
                onChange={(event: FormEvent<HTMLSelectElement>) => {
                  const { value } = event.currentTarget;

                  if (!units.includes(value)) {
                    field.handleChange("sqm");
                  }

                  // value is now one of the unit type values
                  field.handleChange(value as Unit);
                }}
              />
            )}
          />
          <button type="submit" className={styles.submitButton}>
            Calculate
          </button>
        </div>
      </form>
    </form.Provider>
  );
};

export default FormWrapper;
