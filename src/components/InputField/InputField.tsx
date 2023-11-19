import { FormEvent, ReactElement } from "react";
import { ValidationError } from "@tanstack/react-form";

import * as styles from "./inputField.css";

export type InputFieldProps = {
  label: string;
  value: string;
  onBlur: (event: FormEvent<HTMLInputElement>) => void;
  onChange: (event: FormEvent<HTMLInputElement>) => void;
  errors: ValidationError[];
};

const InputField = ({
  label,
  value,
  errors,
  onBlur,
  onChange,
}: InputFieldProps): ReactElement => {
  return (
    <div className={styles.fieldWrapper}>
      <label htmlFor="input" className={styles.label}>
        {label}
      </label>
      <input
        value={value}
        id="input"
        name="input"
        type="text"
        placeholder="Input value"
        onChange={onChange}
        onBlur={onBlur}
        className={styles.input}
      />
      {Boolean(errors.length) && <p className={styles.errors}>{errors}</p>}
    </div>
  );
};

export default InputField;
