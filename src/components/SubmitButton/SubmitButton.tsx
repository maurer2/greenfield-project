import type { FormEvent, MouseEvent, PropsWithChildren, ReactElement } from 'react';

import * as styles from './SubmitButton.css';

export type SubmitButtonProps = {
  isDisabled?: boolean;
  onBlur?: (event: FormEvent<HTMLButtonElement>) => void;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

function SubmitButton({
  children,
  isDisabled = false,
  onBlur,
  onClick,
}: PropsWithChildren<SubmitButtonProps>): ReactElement {
  return (
    <button
      className={styles.submitButton}
      disabled={isDisabled}
      onBlur={onBlur}
      onClick={onClick}
      type="submit"
    >
      {children}
    </button>
  );
}

export default SubmitButton;
