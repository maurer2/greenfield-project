import type { ReactElement } from 'react';

import { type FieldPath, type FieldValues, useFormContext } from 'react-hook-form';

import * as styles from './SelectBox.css';

export type SelectBoxProps<TFieldValues extends FieldValues> = {
  label: string;
  name: FieldPath<TFieldValues>;
  options: string[];
};

type SelectStyleVariant = keyof typeof styles.select;

function SelectBox<TFieldValues extends FieldValues>({
  label,
  name,
  options,
}: SelectBoxProps<TFieldValues>): ReactElement {
  const { formState, getFieldState, getValues, register } = useFormContext<TFieldValues>();

  const { error: fieldError } = getFieldState(name, formState);
  const defaultValue = getValues(name) ?? '';

  const error = fieldError?.message;
  const hasError = Boolean(error);
  const errorId = `${name}-error`;
  const currentSelectState: SelectStyleVariant = hasError ? 'invalid' : 'default';

  return (
    <div className={styles.fieldWrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <select
        {...register(name)}
        aria-describedby={hasError ? errorId : undefined}
        aria-invalid={hasError ? 'true' : undefined}
        className={styles.select[currentSelectState]}
        defaultValue={defaultValue}
        id={name}
        required
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {hasError && (
        <div className={styles.errors} data-testid="select-error" id={errorId}>
          <p>{error?.toString()}</p>
        </div>
      )}
    </div>
  );
}

export default SelectBox;
