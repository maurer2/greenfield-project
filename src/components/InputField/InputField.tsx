import type { ReactElement } from 'react';

import { type FieldPath, type FieldValues, useFormContext } from 'react-hook-form';

import * as styles from './inputField.css';

export type InputFieldProps<TFieldValues extends FieldValues> = {
  label: string;
  name: FieldPath<TFieldValues>;
};

type InputStyleVariant = keyof typeof styles.input;

function InputField<TFieldValues extends FieldValues>({
  label,
  name,
}: InputFieldProps<TFieldValues>): ReactElement {
  const { formState, getFieldState, getValues, register } = useFormContext<TFieldValues>();

  const { error: fieldError } = getFieldState(name, formState);
  const defaultValue = getValues(name) ?? '';

  const error = fieldError?.message;
  const hasError = Boolean(error);
  const errorId = `${name}-error`;
  const currentInputState: InputStyleVariant = hasError ? 'invalid' : 'default';
  const placeholder = `Enter ${label}`;

  return (
    <div className={styles.fieldWrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        {...register(name, {
          valueAsNumber: true,
        })}
        aria-describedby={hasError ? errorId : undefined}
        aria-invalid={hasError ? 'true' : undefined}
        className={styles.input[currentInputState]}
        defaultValue={defaultValue}
        id={name}
        placeholder={placeholder}
        required
        type="number"
      />
      {hasError && (
        <div className={styles.errors} data-testid="input-error" id={errorId}>
          <p>{error?.toString() ?? 'Error'}</p>
        </div>
      )}
    </div>
  );
}

export default InputField;
