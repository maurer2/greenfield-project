import FormContent from '@/components/FormContent/FormContent';
import FormWrapper from '@/components/FormWrapper/FormWrapper';
import { loadCalculationSearchParamsWithDefaults } from '@/lib/calculationSearchParams/calculationSearchParams';

export default async function Home({ searchParams }: PageProps<'/'>) {
  const { amount, unit } = await loadCalculationSearchParamsWithDefaults(searchParams);

  return (
    <FormWrapper amount={amount} unit={unit}>
      <FormContent />
    </FormWrapper>
  );
}
