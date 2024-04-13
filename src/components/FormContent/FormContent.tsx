'use client';

import type { SearchFormSubmitActionResult } from '@/app/actions/handleSearchFormSubmit/handleSearchFormSubmit';
import type { SearchFormValues } from '@/schemas/searchForm/searchForm';
import type { ReactElement } from 'react';

import InputField from '@/components/InputField/InputField';
import SelectBox from '@/components/SelectBox/SelectBox';
import searchFormSchema from '@/schemas/searchForm/searchForm';
import 'animate.css';
import clsx from 'clsx';
import { useFormStatus } from 'react-dom';
import { useFormContext } from 'react-hook-form';
import { deserializeError } from 'serialize-error';

import SubmitButton from '../SubmitButton/SubmitButton';
import * as styles from './FormContent.css';

export type FormContentProps = {
  formState: SearchFormSubmitActionResult;
  isSubmitting: boolean;
};

function FormContent({ formState, isSubmitting }: FormContentProps): ReactElement {
  const methods = useFormContext<SearchFormValues>();
  const { pending } = useFormStatus();
  const {
    formState: { errors },
  } = useFormContext<SearchFormValues>();

  // server state -> todo: move to react hook form via error property
  const isError = formState?.status === 'error';
  const isFailedValidation = formState?.status === 'validation-fail';
  const shouldDisableSubmitButton = pending || !methods.formState.isValid;

  return (
    <div
      className={clsx(styles.wrapper, {
        'animate__animated animate__infinite animate__pulse': pending || isSubmitting,
      })}
    >
      <InputField label="Amount" name="amount" />
      <SelectBox label="Unit" name="unit" options={searchFormSchema.shape.unit.options} />
      <SubmitButton isDisabled={shouldDisableSubmitButton}>Calculate</SubmitButton>
      {/* formstate error */}
      {isError && (
        <output className={styles.output}>{deserializeError(formState.error).message}</output>
      )}
      {/* RHF server error */}
      {errors.root?.message ? (
        <output className={styles.output}>{JSON.stringify(errors.root)}</output>
      ) : null}
    </div>
  );
}

export default FormContent;
