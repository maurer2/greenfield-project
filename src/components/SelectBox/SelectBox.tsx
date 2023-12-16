import type { ValidationError } from '@tanstack/react-form';
import type { FormEvent, ReactElement } from 'react';

import { Unit } from '@/schemas/searchForm/searchForm';

import * as styles from './SelectBox.css';

export type SelectBoxProps = {
  errors: ValidationError[];
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
      {Boolean(errors.length) && <p className={styles.errors}>{errors}</p>}
    </div>
  );
}

export default SelectBox;
