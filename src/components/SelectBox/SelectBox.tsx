import { FormEvent, ReactElement } from "react";
import { ValidationError } from "@tanstack/react-form";

import * as styles from "./SelectBox.css";

import type { Unit } from "../FormWrapper/FormWrapper";

export type SelectBoxProps = {
  label: string;
  value: Unit;
  options: Unit[];
  errors: ValidationError[];
  onBlur: (event: FormEvent<HTMLSelectElement>) => void;
  onChange: (event: FormEvent<HTMLSelectElement>) => void;
};

const SelectBox = ({
  label,
  value,
  options,
  errors,
  onBlur,
  onChange,
}: SelectBoxProps): ReactElement => {
  return (
    <div className={styles.fieldWrapper}>
      <label htmlFor="select" className={styles.label}>
        {label}
      </label>
      <select
        name="select"
        id="select"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={styles.select}
      >
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
      {Boolean(errors.length) && <p className={styles.errors}>{errors}</p>}
    </div>
  );
};

export default SelectBox;
