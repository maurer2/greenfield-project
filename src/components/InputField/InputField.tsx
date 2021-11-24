import { VFC, useState, FormEvent } from "react";
import { nanoid } from "nanoid";

import * as Styles from "./InputField.styles";
import * as Types from "./InputField.types";

const InputField: VFC<Types.InputFieldProps> = () => {
  const [fieldId] = useState(() => nanoid(5));
  const [value, setValue] = useState("");

  function handleOnChange(event: FormEvent<HTMLInputElement>): void {
    setValue(event.currentTarget.value);
  }

  return (
    <Styles.Container>
      <>
        <Styles.Label htmlFor={fieldId}>Label</Styles.Label>
        <input
          value={value}
          id={fieldId}
          type="text"
          placeholder="placeholder"
          onChange={handleOnChange}
        />
      </>
    </Styles.Container>
  );
};

export { InputField };
