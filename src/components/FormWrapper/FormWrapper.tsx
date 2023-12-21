'use client';

import type { SearchFormSchema } from '@/schemas/searchForm/searchForm';
import type { FormEvent, ReactElement, Reducer } from 'react';

import { handleSearchFormSubmit } from '@/app/actions/handleSearchFormSubmit/handleSearchFormSubmit';
import InputField from '@/components/InputField/InputField';
import SelectBox from '@/components/SelectBox/SelectBox';
import searchFormSchema, { units } from '@/schemas/searchForm/searchForm';
import { useReducer } from 'react';

import SubmitButton from '../SubmitButton/SubmitButton';
import * as styles from './FormWrapper.css';

type FormValuesActionsMap = {
  [K in keyof SearchFormSchema]: {
    payload: SearchFormSchema[K];
    type: `UPDATE_${Uppercase<K>}`;
  };
} & {
  reset: {
    payload: never;
    type: 'RESET';
  };
};
type FormValuesActions = FormValuesActionsMap[keyof FormValuesActionsMap];

const formValuesDefaultValues: SearchFormSchema = {
  amount: 1,
  unit: 'sqm',
};

const formValuesReducer = (state: SearchFormSchema, action: FormValuesActions) => {
  switch (action.type) {
    case 'UPDATE_AMOUNT': {
      return {
        ...state,
        amount: action.payload,
      };
    }
    case 'UPDATE_UNIT': {
      return {
        ...state,
        unit: action.payload,
      };
    }
    case 'RESET': {
      return {
        ...formValuesDefaultValues,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

function FormWrapper(): ReactElement {
  const [formValues, dispatchFormValues] = useReducer<Reducer<SearchFormSchema, FormValuesActions>>(
    formValuesReducer,
    formValuesDefaultValues,
  );

  return (
    <form action={handleSearchFormSubmit} className={styles.form}>
      <div className={styles.wrapper}>
        <InputField
          errors={[]}
          label="Amount"
          name="amount"
          onChange={(event: FormEvent<HTMLInputElement>) => {
            const prevValue = formValues.amount;
            const { value } = event.currentTarget;

            let newValue: typeof formValues.amount =
              parseInt(event.currentTarget.value, 10) || prevValue;
            if (value === '') {
              newValue = 0;
            }

            dispatchFormValues({
              payload: newValue,
              type: 'UPDATE_AMOUNT',
            });
          }}
          value={formValues.amount.toString()}
        />
        <SelectBox
          errors={[]}
          label="Unit"
          name="unit"
          onBlur={() => {}}
          onChange={(event: FormEvent<HTMLSelectElement>) => {
            const { value } = event.currentTarget;

            if (!units.includes(value)) {
              return;
            }

            // value has now been narrowed to one of the const values
            dispatchFormValues({
              payload: value as typeof formValues.unit,
              type: 'UPDATE_UNIT',
            });
          }}
          options={searchFormSchema.shape.unit.options}
          value={formValues.unit}
        />
        <SubmitButton>Calculate</SubmitButton>
      </div>
    </form>
  );
}

export default FormWrapper;
