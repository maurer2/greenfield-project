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
    const formData = new FormData();
    formData.append('amount', data.amount.toString());
    formData.append('unit', data.unit);

    // side effect: useFormStatus in child components won't work when formAction is called in a transaction
    startTransition(() => {
      formAction(formData);
    });
  });

  const shouldDisableSubmitButton = isSubmitting || isPending;

  return (
    <form
      aria-label="Main form"
      className={clsx(styles.wrapper, {
        'animate__animated animate__infinite animate__pulse': isSubmitting,
      })}
      noValidate
      onSubmit={onSubmit}
      ref={formRef}
      aria-busy={isPending}
    >
      <InputField label="Amount" name="amount" />
      <SelectBox label="Unit" name="unit" options={searchFormSchema.shape.unit.options} />
      <SubmitButton isDisabled={shouldDisableSubmitButton}>Calculate</SubmitButton>

      {formState?.status === 'error' && !isPending && (
        <div role="alert" className={styles.output}>
          {deserializeError(formState.error).message}
        </div>
      )}
      {errors.root?.message ? (
        <div role="alert" className={styles.output}>
          {JSON.stringify(errors.root)}
        </div>
      ) : null}
    </form>
  );
}

export default FormContent;
