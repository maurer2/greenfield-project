import Background from '@/components/Background/Background';
import FormWrapper from '@/components/FormWrapper/FormWrapper';

import * as styles from './page.css';

export default function Home() {
  return (
    <main className={styles.page}>
      <Background />
      <FormWrapper />
    </main>
  );
}
