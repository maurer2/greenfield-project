'use client';

import type { SearchFormSubmitActionResult } from '@/app/actions/handleSearchFormSubmit/handleSearchFormSubmit';
import type { SearchFormValues } from '@/schemas/searchForm/searchForm';
import type { FormEvent, ReactElement, Reducer } from 'react';

import InputField from '@/components/InputField/InputField';
import SelectBox from '@/components/SelectBox/SelectBox';
import searchFormSchema, { units } from '@/schemas/searchForm/searchForm';
import 'animate.css';
import clsx from 'clsx';
import { useReducer } from 'react';
import { useFormStatus } from 'react-dom';
import { deserializeError } from 'serialize-error';

import SubmitButton from '../SubmitButton/SubmitButton';
import * as styles from './FormContent.css';

type FormValuesActionsMap = {
  [K in keyof SearchFormValues]: {
    payload: SearchFormValues[K];
    type: `UPDATE_${Uppercase<K>}`;
  };
} & {
  reset: {
    payload: never;
    type: 'RESET';
  };
};
type FormValuesActions = FormValuesActionsMap[keyof FormValuesActionsMap];

export type FormContentProps = {
  formState: SearchFormSubmitActionResult;
};

const formValuesDefaultValues: SearchFormValues = {
  amount: 1,
  unit: 'sqm',
};

const formValuesReducer = (state: SearchFormValues, action: FormValuesActions) => {
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

function FormContent({ formState }: FormContentProps): ReactElement {
  const [formValues, dispatchFormValues] = useReducer<Reducer<SearchFormValues, FormValuesActions>>(
    formValuesReducer,
    formValuesDefaultValues,
  );
  const { pending } = useFormStatus();

  const isError = formState?.status === 'error';
  const isFailedValidation = formState?.status === 'validation-fail';

  return (
    <div
      className={clsx(
        styles.wrapper,
        pending && 'animate__animated animate__infinite animate__pulse',
      )}
    >
      <InputField
        errors={isFailedValidation ? formState.errors.fieldErrors?.amount : undefined}
        label="Amount"
        name="amount"
        onChange={(event: FormEvent<HTMLInputElement>) => {
          const { valueAsNumber } = event.currentTarget;

          dispatchFormValues({
            payload: Number.isNaN(valueAsNumber) ? '' : valueAsNumber,
            type: 'UPDATE_AMOUNT',
          });
        }}
        value={formValues.amount.toString()}
      />
      <SelectBox
        errors={isFailedValidation ? formState.errors.fieldErrors?.unit : undefined}
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
      <SubmitButton isDisabled={pending}>Calculate</SubmitButton>
      {isError && !pending && (
        <output className={styles.output}>{deserializeError(formState.error).message}</output>
      )}
    </div>
  );
}

export default FormContent;
