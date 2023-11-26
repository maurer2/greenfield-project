import type { ReactElement } from 'react';

import * as styles from './background.css';
import Lines from './lines.svg';

export type BackgroundProps = Record<string, void>;

function Background(): ReactElement {
  return (
    <div className={styles.container}>
      <Lines className={styles.image} />
    </div>
  );
}

export default Background;
