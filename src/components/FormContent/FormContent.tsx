'use client';

import type { ReactElement } from 'react';

import { handleSearchFormSubmit } from '@/app/actions/handleSearchFormSubmit/handleSearchFormSubmit';
import InputField from '@/components/InputField/InputField';
import SelectBox from '@/components/SelectBox/SelectBox';
import searchFormSchema from '@/schemas/searchForm/searchForm';
import 'animate.css';
import clsx from 'clsx';
import { useRef, useActionState, startTransition } from 'react';
import { deserializeError } from 'serialize-error';
import { useSearchFormContext } from '../FormWrapper/FormWrapper';

import SubmitButton from '../SubmitButton/SubmitButton';
import * as styles from './FormContent.css';

export type FormContentProps = {
  // formState: SearchFormSubmitActionResult;
};

function FormContent(): ReactElement {
  const [formState, formAction, isPending] = useActionState(handleSearchFormSubmit, null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useSearchFormContext();

  const onSubmit = handleSubmit((data) => {
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
  const shouldDisableSubmitButton = isSubmitting || isPending;

  return (
    <form
      aria-label="Search form"
      aria-describedby="form-hint"
      className={clsx(styles.wrapper, {
        'animate__animated animate__infinite animate__pulse': isSubmitting,
      })}
      noValidate
      onSubmit={onSubmit}
      ref={formRef}
      aria-busy={isPending}
    >
      <p id="form-hint" className="sr-only">
        Enter an amount and select a unit to get the converted value.
      </p>
      <InputField label="Amount" name="amount" />
      <SelectBox label="Unit" name="unit" options={searchFormSchema.shape.unit.options} />
      <SubmitButton isDisabled={shouldDisableSubmitButton}>Calculate</SubmitButton>

      <div role="alert" className={styles.output}>
        {!isPending && formState?.status === 'error'
          ? deserializeError(formState.error).message
          : null}
      </div>
      {/* server errors currently not passed to useForm hook via errors prop */}
      {/* <div role="alert" className={styles.output}>
        {errors.root?.message ?? null}
      </div> */}
    </form>
  );
}

export default FormContent;
