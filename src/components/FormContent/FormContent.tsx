'use client';

import type { ReactElement } from 'react';

import clsx from 'clsx';
import { useQueryStates } from 'nuqs';
import { startTransition, useActionState, useEffect, useRef } from 'react';
import { deserializeError } from 'serialize-error';

import { handleSearchFormSubmit } from '@/app/actions/handleSearchFormSubmit/handleSearchFormSubmit';
import InputField from '@/components/InputField/InputField';
import 'animate.css';

import SelectBox from '@/components/SelectBox/SelectBox';
import { calculationSearchParamsConfigWithDefaults } from '@/lib/calculationSearchParams/calculationSearchParams';
import searchFormSchema from '@/schemas/searchForm/searchForm';

import { useSearchFormContext } from '../FormWrapper/FormWrapper';
import SubmitButton from '../SubmitButton/SubmitButton';
import * as styles from './FormContent.css';

export type FormContentProps = Record<string, never>;

function FormContent(): ReactElement {
  const [formState, formAction, isPending] = useActionState(handleSearchFormSubmit, null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const {
    clearErrors,
    formState: { errors, isSubmitting },
    handleSubmit,
    setError,
    subscribe,
  } = useSearchFormContext();
  const [, setCalculationSearchParams] = useQueryStates(calculationSearchParamsConfigWithDefaults);

  // can't use useState here to avoid useEffect as calling setError in render triggers a state update in a parent component
  useEffect(() => {
    if (formState?.status === 'validation-fail') {
      const { fieldErrors } = formState.errors;

      if (fieldErrors.amount) {
        setError('amount', { message: fieldErrors.amount[0] });
      }
      if (fieldErrors.unit) {
        setError('unit', { message: fieldErrors.unit[0] });
      }
      // there are currently no form level validation rules
      // if (formErrors.length) {
      //   setError('root', { message: formErrors[0] });
      // }
    }

    if (formState?.status === 'error') {
      setError('root', { message: deserializeError(formState.error).message });
    }
  }, [formState, setError]);

  useEffect(() => {
    const callback = subscribe({
      callback: ({ isValid, values }) => {
        if (!isValid) {
          return;
        }

        // can't access parsed values from resolver here
        setCalculationSearchParams({
          amount: typeof values.amount === 'string' ? parseInt(values.amount, 10) : values.amount,
          unit: values.unit,
        });
      },
      formState: {
        isValid: true,
        values: true,
      },
      name: ['amount', 'unit'],
    });

    return () => callback();
  }, [subscribe, setCalculationSearchParams]);

  const onSubmit = handleSubmit((data) => {
    // RHF doesn't clear form level errors on submit
    clearErrors('root');

    if (isPending) {
      return;
    }

    const formData = new FormData();
    formData.append('amount', data.amount.toString());
    formData.append('unit', data.unit);

    // side effect: useFormStatus in child components won't work when formAction is called in a transaction
    startTransition(() => {
      formAction(formData);
    });
  });

  // isSubmitting - covers time from submit via button or enter until transition starts, which is not awaited
  // isPending - covers time from transition start until transition end
  const isBusy = isSubmitting || isPending;

  return (
    <form
      aria-busy={isBusy}
      aria-describedby="form-hint"
      aria-label="Search form"
      className={clsx(styles.wrapper, {
        'animate__animated animate__infinite animate__pulse': isBusy,
      })}
      noValidate
      onSubmit={onSubmit}
      ref={formRef}
    >
      <p className="sr-only" id="form-hint">
        Enter an amount and select a unit to get the converted value.
      </p>
      <InputField label="Amount" name="amount" />
      <SelectBox label="Unit" name="unit" options={searchFormSchema.shape.unit.options} />
      <SubmitButton isDisabled={isBusy}>Calculate</SubmitButton>

      {/* Form level errors; wrapper shouldn't be rendered conditionally, only content */}
      <div className={styles.formErrors} role="alert">
        {errors.root?.message ?? null}
      </div>
    </form>
  );
}

export default FormContent;
