'use client';

import type { SearchFormSubmitActionResult } from '@/app/actions/handleSearchFormSubmit/handleSearchFormSubmit';
import type { SearchFormSchema, SearchFormValues } from '@/schemas/searchForm/searchForm';
import type { ReactElement } from 'react';

import { handleSearchFormSubmit } from '@/app/actions/handleSearchFormSubmit/handleSearchFormSubmit';
import InputField from '@/components/InputField/InputField';
import SelectBox from '@/components/SelectBox/SelectBox';
import searchFormSchema from '@/schemas/searchForm/searchForm';
import 'animate.css';
import clsx from 'clsx';
import { useRef } from 'react';
import { useFormState as useActionState, useFormStatus } from 'react-dom';
import { useFormContext } from 'react-hook-form';
import { deserializeError } from 'serialize-error';

import SubmitButton from '../SubmitButton/SubmitButton';
import * as styles from './FormContent.css';

export type FormContentProps = {
  // formState: SearchFormSubmitActionResult;
};

function FormContent(): ReactElement {
  const [formState, formAction] = useActionState(handleSearchFormSubmit, null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const { pending } = useFormStatus();
  const {
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
  } = useFormContext();

  const onSubmit = () => {
    handleSubmit(() => formRef.current?.submit());
  };

  // ignores other user defined errors in root mentioned in https://react-hook-form.com/docs/useform/seterror
  const hasOnlyServerErrors =
    Object.hasOwn(errors, 'root') &&
    typeof errors?.root === 'object' &&
    Object.keys(errors.root).length === 1;
  const shouldDisableSubmitButton = isSubmitting || (!isValid && !hasOnlyServerErrors);

  return (
    <form
      action={formAction}
      aria-label="Main form"
      className={clsx(styles.wrapper, {
        'animate__animated animate__infinite animate__pulse': isSubmitting,
      })}
      onSubmit={onSubmit}
      ref={formRef}
    >
      <InputField label="Amount" name="amount" />
      <SelectBox label="Unit" name="unit" options={searchFormSchema.shape.unit.options} />
      <SubmitButton isDisabled={shouldDisableSubmitButton}>Calculate</SubmitButton>
      {formState?.status === 'error' && !pending && (
        <output className={styles.output}>{deserializeError(formState.error).message}</output>
      )}
      {/* RHF server error */}
      {errors.root?.message ? (
        <output className={styles.output}>{JSON.stringify(errors.root)}</output>
      ) : null}
    </form>
  );
}

export default FormContent;
