import type { SearchFormValues } from '@/schemas/searchForm/searchForm';
import type { ReactElement } from 'react';

import { useSearchFormContext } from '../FormWrapper/FormWrapper';

import * as styles from './inputField.css';

export type InputFieldProps<T> = {
  label: string;
  name: T;
};

type InputStyleVariant = keyof typeof styles.input;

function InputField<T extends keyof SearchFormValues>({
  label,
  name,
}: InputFieldProps<T>): ReactElement {
  const {
    formState: { errors },
    getValues,
    register,
  } = useSearchFormContext();

  const error = errors[name]?.message;
  const errorId = `${name}-error`;

  const hasError = !!error;
  const currentInputState: InputStyleVariant = hasError ? 'invalid' : 'default';

  const defaultValue = getValues(name) ?? '';
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
        defaultValue={defaultValue}
        aria-describedby={hasError ? errorId : undefined}
        aria-invalid={hasError ? 'true' : undefined}
        className={styles.input[currentInputState]}
        placeholder={placeholder}
        required
        type="number"
      />
      {hasError && (
        <div className={styles.errors} data-testid="input-error" id={errorId}>
          <p>{error.toString()}</p>
        </div>
      )}
    </div>
  );
}

export default InputField;
