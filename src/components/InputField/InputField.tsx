import { useState, FormEvent, ReactElement } from "react";

import * as styles from "./inputField.css";

export type BackgroundProps = Record<string, void>;

const InputField = (): ReactElement => {
  const [value, setValue] = useState('Value');

  function handleOnChange(event: FormEvent<HTMLInputElement>): void {
    setValue(event.currentTarget.value);
  }

  return (
    <>
      <label htmlFor="value">Label</label>
      <input
        value="value"
        id="value"
        name="value"
        type="text"
        placeholder="placeholder"
        onChange={handleOnChange}
        className={styles.input}
      />
    </>
  );
};

export default InputField;
