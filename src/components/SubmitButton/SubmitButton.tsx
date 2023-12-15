import type { FormEvent, MouseEvent, ReactElement, PropsWithChildren } from 'react';
import { useFormStatus } from 'react-dom';

import * as styles from './SubmitButton.css';

export type SubmitButtonProps = {
  onBlur?: (event: FormEvent<HTMLButtonElement>) => void;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

function SubmitButton({ children }: PropsWithChildren): ReactElement {
  const { pending } = useFormStatus();

  return (
    <button className={styles.submitButton} disabled={pending} type="submit">
      {children}
    </button>
  );
}

export default SubmitButton;
