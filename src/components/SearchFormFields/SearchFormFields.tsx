import type { SearchFormValues } from '@/types';

import InputField, { type InputFieldProps } from '../InputField/InputField';
import SelectBox, { type SelectBoxProps } from '../SelectBox/SelectBox';

// helpers to preset search form fields with correct types
export function SearchFormInputField(props: InputFieldProps<SearchFormValues>) {
  return <InputField<SearchFormValues> {...props} />;
}

export function SearchFormSelectBox(props: SelectBoxProps<SearchFormValues>) {
  return <SelectBox<SearchFormValues> {...props} />;
}
