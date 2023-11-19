import { FormEvent, ReactElement } from "react";

import * as styles from "./inputField.css";

export type InputFieldProps = {
  label: string;
  value: string;
  onBlur: (event: FormEvent<HTMLInputElement>) => void;
  onChange: (event: FormEvent<HTMLInputElement>) => void;
};

const InputField = ({
  label,
  value,
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
    </div>
  );
};

export default InputField;
