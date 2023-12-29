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

function SelectBox({
  errors,
  label,
  name,
  onBlur,
  onChange,
  options,
  value,
}: SelectBoxProps): ReactElement {
  return (
    <div className={styles.fieldWrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <select
        className={styles.select}
        id={name}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
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

export default SelectBox;
