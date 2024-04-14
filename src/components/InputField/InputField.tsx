import type { SearchFormValues } from '@/schemas/searchForm/searchForm';
import type { ReactElement } from 'react';

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
    register,
  } = useFormContext();

  const error = errors[name]?.message;
  const errorId = `${name}-error`;

  const hasError = !!error;
  const currentInputState: InputStyleVariant = hasError ? 'invalid' : 'default';

  return (
    <div className={styles.fieldWrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        {...register('amount', {
          valueAsNumber: true,
        })}
        aria-describedby={hasError ? errorId : undefined}
        aria-invalid={hasError ? 'true' : 'false'}
        className={styles.input[currentInputState]}
        placeholder={`Enter ${label}`}
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
