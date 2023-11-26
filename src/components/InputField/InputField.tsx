import type { ValidationError } from '@tanstack/react-form';
import type { FormEvent, ReactElement } from 'react';

import * as styles from './inputField.css';

export type InputFieldProps = {
  errors: ValidationError[];
  label: string;
  onBlur: (event: FormEvent<HTMLInputElement>) => void;
  onChange: (event: FormEvent<HTMLInputElement>) => void;
  value: string;
};

function InputField({ errors, label, onBlur, onChange, value }: InputFieldProps): ReactElement {
  return (
    <div className={styles.fieldWrapper}>
      <label className={styles.label} htmlFor="input">
        {label}
      </label>
      <input
        className={styles.input}
        id="input"
        name="input"
        onBlur={onBlur}
        onChange={onChange}
        placeholder="Input value"
        type="text"
        value={value}
      />
      {Boolean(errors.length) && <p className={styles.errors}>{errors}</p>}
    </div>
  );
}

export default InputField;
