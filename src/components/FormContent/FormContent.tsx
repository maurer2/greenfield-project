'use client';

import type { SearchFormSubmitActionResult } from '@/app/actions/handleSearchFormSubmit/handleSearchFormSubmit';
import type { SearchFormValues } from '@/schemas/searchForm/searchForm';
import type { ReactElement } from 'react';

import InputField from '@/components/InputField/InputField';
import SelectBox from '@/components/SelectBox/SelectBox';
import searchFormSchema from '@/schemas/searchForm/searchForm';
import 'animate.css';
import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';

import SubmitButton from '../SubmitButton/SubmitButton';
import * as styles from './FormContent.css';

export type FormContentProps = {
  formState: SearchFormSubmitActionResult;
  isSubmitting: boolean;
};

function FormContent({ isSubmitting }: FormContentProps): ReactElement {
  const {
    formState: { errors, isValid },
  } = useFormContext<SearchFormValues>();

  // ignores other user defined errors in root mentioned in https://react-hook-form.com/docs/useform/seterror
  const hasOnlyServerErrors = Object.hasOwn(errors, 'root') && Object.keys(errors).length === 1;
  const shouldDisableSubmitButton = isSubmitting || (!isValid && !hasOnlyServerErrors);

  return (
    <div
      className={clsx(styles.wrapper, {
        'animate__animated animate__infinite animate__pulse': isSubmitting,
      })}
    >
      <InputField label="Amount" name="amount" />
      <SelectBox label="Unit" name="unit" options={searchFormSchema.shape.unit.options} />
      <SubmitButton isDisabled={shouldDisableSubmitButton}>Calculate</SubmitButton>

      {/* RHF Form component calls setError with 'root.server' key but documentation mentions 'root.serverError' */}
      {hasOnlyServerErrors ? (
        <div className={styles.errorMessage}>
          <p>Validation failed on the server. Please try again.</p>
          <output>{JSON.stringify(errors.root)}</output>
        </div>
      ) : null}
    </div>
  );
}

export default FormContent;
