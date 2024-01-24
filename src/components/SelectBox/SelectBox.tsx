import type { Unit } from '@/schemas/searchForm/searchForm';
import type { FormEvent, ReactElement } from 'react';

import * as styles from './SelectBox.css';

export type SelectBoxProps = {
  errors?: string[];
  label: string;
  name: string;
  onBlur?: (event: FormEvent<HTMLSelectElement>) => void;
  onChange: (event: FormEvent<HTMLSelectElement>) => void;
  options: Unit[];
  value: Unit;
};

type SelectStyleVariant = keyof typeof styles.select;

function SelectBox({
  errors = [],
  label,
  name,
  onBlur,
  onChange,
  options,
  value,
}: SelectBoxProps): ReactElement {
  const hasErrors = errors?.length > 0;

  const errorId = `${name}-error`;
  const currentSelectState: SelectStyleVariant = hasErrors ? 'invalid' : 'default';

  return (
    <div className={styles.fieldWrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <select
        aria-describedby={hasErrors ? errorId : undefined}
        aria-invalid={hasErrors}
        className={styles.select[currentSelectState]}
        id={name}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        required
        value={value}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {hasErrors && (
        <div className={styles.errors} data-testid="select-errors" id={errorId}>
          {errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default SelectBox;
