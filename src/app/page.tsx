'use client';

import FormContent from '@/components/FormContent/FormContent';
import FormWrapper from '@/components/FormWrapper/FormWrapper';

export default function Home() {
  return (
    <FormWrapper>
      {/* eslint-disable-next-line prettier/prettier */}
      {({ formState }) => <FormContent formState={formState} />}
    </FormWrapper>
  );
}
