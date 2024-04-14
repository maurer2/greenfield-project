'use client';

import type { SearchFormSubmitActionResult } from '@/app/actions/handleSearchFormSubmit/handleSearchFormSubmit';
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
};

function FormContent({ formState }: FormContentProps): ReactElement {
  const methods = useFormContext<SearchFormValues>();
  const { pending } = useFormStatus();
  const {
    formState: { errors, isValid },
  } = useFormContext();

  // ignores other user defined errors in root mentioned in https://react-hook-form.com/docs/useform/seterror
  const hasOnlyServerErrors =
    Object.hasOwn(errors, 'root') &&
    typeof errors?.root === 'object' &&
    Object.keys(errors.root).length === 1;
  const shouldDisableSubmitButton = isSubmitting || (!isValid && !hasOnlyServerErrors);

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
      {/* RHF server error */}
      {errors.root?.message ? (
        <output className={styles.output}>{JSON.stringify(errors.root)}</output>
      ) : null}
    </div>
  );
}

export default FormContent;
