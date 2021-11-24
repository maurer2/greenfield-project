import { VFC, useState, FormEvent } from "react";

import { InputField } from "../InputField";

import * as Styles from "./FormWrapper.styles";
import * as Types from "./FormWrapper.types";

const units = ['m', 'ft'] as const
type Unit = typeof units[number]

const FormWrapper: VFC<Types.FormWrapperProps> = () => {
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState<Unit>('m');

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    console.log(event)
  }

  return (
    <Styles.Container action="" method="" onSubmit={handleSubmit}>
      <InputField />
      <button type="submit">Submit</button>
      <code></code>
    </Styles.Container>
  );
};

export { FormWrapper };
