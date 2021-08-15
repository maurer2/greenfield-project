import { FC, PropsWithChildren } from 'react';

import * as Styles from './Background.styles';
import * as Types from './Background.types';

const Background: FC<PropsWithChildren<Types.BackgroundProps>> = () => (
  <Styles.Container>
    <Styles.Content>
      Background
    </Styles.Content>
  </Styles.Container>
);

export {
  Background
}
