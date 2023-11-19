import { FormEvent, ReactElement } from "react";

import * as styles from "./SelectBox.css";

import type { Unit } from "../FormWrapper/FormWrapper";

export type SelectBoxProps = {
  label: string;
  value: Unit;
  options: Unit[];
  onBlur: (event: FormEvent<HTMLSelectElement>) => void;
  onChange: (event: FormEvent<HTMLSelectElement>) => void;
};

const SelectBox = ({
  label,
  value,
  options,
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
      >
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;
