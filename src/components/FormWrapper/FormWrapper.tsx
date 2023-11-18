"use client";

import { useState, FormEvent, ReactElement } from "react";

import InputField from "../InputField/InputField";

import * as styles from "./FormWrapper.css";

const units = ["sqm", "sqft"] as const;
type Unit = (typeof units)[number];

const FormWrapper = (): ReactElement => {
  const [amount, setAmount] = useState(0);
  const [unit, setUnit] = useState<Unit>("sqm");

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    console.log(event);
  }

  return (
    <form action="" onSubmit={handleSubmit} className={styles.form}>
      <fieldset className={styles.fieldset}>
        <InputField />
        <button type="submit">Submit</button>
      </fieldset>
    </form>
  );
};

export default FormWrapper;
