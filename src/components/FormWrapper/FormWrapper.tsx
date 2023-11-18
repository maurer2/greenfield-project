"use client";

import { FormEvent, ReactElement } from "react";
import { useForm } from "@tanstack/react-form";

import InputField from "../InputField/InputField";

import * as styles from "./FormWrapper.css";

const units = ["sqm", "sqft"] as const;
type Unit = (typeof units)[number];

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
        <fieldset className={styles.fieldset}>
          <form.Field
            name="amount"
            children={(field) => (
              <>
                <InputField
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event: FormEvent<HTMLInputElement>) =>
                    field.handleChange(event.currentTarget.value)
                  }
                />
                <pre>{JSON.stringify(field.getValue())}</pre>
              </>
            )}
          />
          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </form.Provider>
  );
};

export default FormWrapper;
