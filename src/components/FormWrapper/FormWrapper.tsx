'use client';

import type { SearchFormSchema } from '@/schemas/searchForm/searchForm';
import type { FormEvent, ReactElement } from 'react';
import { useReducer } from 'react';

import InputField from '@/components/InputField/InputField';
import SelectBox from '@/components/SelectBox/SelectBox';
import searchFormSchema from '@/schemas/searchForm/searchForm';
import { ZodError } from 'zod';
import SubmitButton from '../SubmitButton/SubmitButton';

import * as styles from './FormWrapper.css';

type FormValuesActionMap = {
  type: Uppercase<keyof SearchFormSchema>,
  payload: {
    value: FormValuesActionMap['type'] extends 'amount' ? SearchFormSchema['amount'] : SearchFormSchema['unit'],
  }
}

const formValuesDefaultValues: SearchFormSchema = {
  amount: 1,
  unit: 'sqm',
};

const formValuesReducer = (state: SearchFormSchema, action: FormValuesActionMap) => {
  switch (action.type) {
    case 'AMOUNT': {
      return {
        ...state,
        amount: action.payload.value,
      }
    }
    case 'UNIT': {
      return {
        ...state,
        unit: action.payload.value,
      }
    }
  }
};

function FormWrapper(): ReactElement {
  const [formValues, dispatch] = useReducer(formValuesReducer, formValuesDefaultValues);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
  }

  return (
    <form action="" className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.wrapper}>
        <InputField
          errors={[]}
          label="Amount"
          // name="amount"
          onBlur={() => {}}
          onChange={(event: FormEvent<HTMLInputElement>) => {}}
          value='1'
        />
        <SelectBox
          errors={[]}
          label="Unit"
          // name="unit"
          onBlur={() => {}}
          onChange={(event: FormEvent<HTMLSelectElement>) => {}}
          options={searchFormSchema.shape.unit.options}
          value={'sqm'}
        />
        <SubmitButton>
          Calculate
        </SubmitButton>
      </div>
    </form>
  );
}

export default FormWrapper;
