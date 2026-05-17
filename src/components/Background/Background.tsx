import type { ReactElement } from 'react';

import { cacheLife } from 'next/cache';

import * as styles from './background.css';
import Lines from './lines.svg';

async function Background(): Promise<ReactElement> {
  'use cache';
  cacheLife('default');

  return (
    <div className={styles.container}>
      <Lines className={styles.image} />
    </div>
  );
}

export default Background;
