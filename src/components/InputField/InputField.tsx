import type { FormEvent, ReactElement } from 'react';

import * as styles from './inputField.css';

export type InputFieldProps = {
  errors?: string[];
  label: string;
  name: string;
  onBlur?: (event: FormEvent<HTMLInputElement>) => void;
  onChange: (event: FormEvent<HTMLInputElement>) => void;
  value: string;
};

function InputField({
  errors,
  label,
  name,
  onBlur,
  onChange,
  value,
}: InputFieldProps): ReactElement {
  return (
    <div className={styles.fieldWrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        className={styles.input}
        id={name}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={`Enter ${label}`}
        type="text"
        value={value}
      />
      {errors && errors?.length > 0 && (
        <div className={styles.errors}>
          {errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default InputField;
