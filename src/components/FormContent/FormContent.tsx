'use client';

import type { SearchFormSubmitActionResult } from '@/app/actions/handleSearchFormSubmit/handleSearchFormSubmit';
import type { SearchFormValues } from '@/schemas/searchForm/searchForm';
import type { FormEvent, ReactElement } from 'react';

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
};

function FormContent({ formState }: FormContentProps): ReactElement {
  const methods = useFormContext<SearchFormValues>();
  const { pending } = useFormStatus();

  // server state -> todo: move to react hook form via error property
  const isError = formState?.status === 'error';
  const isFailedValidation = formState?.status === 'validation-fail';
  const shouldDisableSubmitButton = pending || !methods.formState.isValid;

  return (
    <div
      className={clsx(styles.wrapper, {
        'animate__animated animate__infinite animate__pulse': pending,
      })}
    >
      <InputField label="Amount" name="amount" />
      <SelectBox label="Unit" name="unit" options={searchFormSchema.shape.unit.options} />
      <SubmitButton isDisabled={shouldDisableSubmitButton}>Calculate</SubmitButton>
      {isError && !pending && (
        <output className={styles.output}>{deserializeError(formState.error).message}</output>
      )}
    </div>
  );
}

export default FormContent;
