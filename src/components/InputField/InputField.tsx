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

type InputStyleVariant = keyof typeof styles.input;

function InputField({
  errors = [],
  label,
  name,
  onBlur,
  onChange,
  value,
}: InputFieldProps): ReactElement {
  const errorId = `${name}-error`;
  const hasErrors = errors?.length > 0;

  const currentInputState: InputStyleVariant = hasErrors ? 'invalid' : 'default';

  return (
    <div className={styles.fieldWrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        aria-describedby={hasErrors ? errorId : undefined}
        aria-invalid={hasErrors}
        className={styles.input[currentInputState]}
        id={name}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={`Enter ${label}`}
        required
        type="number"
        // value={value}
        {...register('amount')}
      />
      {hasErrors && (
        <div className={styles.errors} data-testid="input-errors" id={errorId}>
          {errors.map((currentError) => (
            <p key={currentError}>{currentError}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default InputField;
