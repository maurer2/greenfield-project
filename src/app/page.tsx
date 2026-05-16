import { Suspense } from 'react';

import FormContent from '@/components/FormContent/FormContent';
import FormWrapper from '@/components/FormWrapper/FormWrapper';

export default function Home() {
  return (
    <Suspense>
      <FormWrapper>
        <FormContent />
      </FormWrapper>
    </Suspense>
  );
}
