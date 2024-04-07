import type { SearchFormValues } from '@/schemas/searchForm/searchForm';
import type { ReactElement } from 'react';

import { useFormContext } from 'react-hook-form';

import * as styles from './SelectBox.css';

export type SelectBoxProps<T> = {
  label: string;
  name: T;
  // options: Unit[];
  options: string[];
};

type SelectStyleVariant = keyof typeof styles.select;

function SelectBox<T extends keyof SearchFormValues>({
  label,
  name,
  options,
}: SelectBoxProps<T>): ReactElement {
  const {
    formState: { errors },
    register,
  } = useFormContext<SearchFormValues>();

  const error = errors[name]?.message;
  const errorId = `${name}-error`;

  const hasError = !!error;
  const currentSelectState: SelectStyleVariant = hasError ? 'invalid' : 'default';

  return (
    <div className={styles.fieldWrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <select
        {...register('unit')}
        aria-describedby={hasError ? errorId : undefined}
        aria-invalid={hasError ? 'true' : 'false'}
        className={styles.select[currentSelectState]}
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
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default SelectBox;
