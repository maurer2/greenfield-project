import { FormEvent, ReactElement } from "react";

import * as styles from "./inputField.css";

export type InputFieldProps = {
  value: string,
  onBlur: (event: FormEvent<HTMLInputElement>) => void,
  onChange: (event: FormEvent<HTMLInputElement>) => void
};

const InputField = ({value, onBlur, onChange}: InputFieldProps): ReactElement => {
  return (
    <>
      <label htmlFor="value">Label</label>
      <input
        value={value ?? ''}
        id="value"
        name="value"
        type="text"
        placeholder="placeholder"
        onChange={onChange}
        onBlur={onBlur}
        className={styles.input}
      />
    </>
  );
};

export default InputField;
