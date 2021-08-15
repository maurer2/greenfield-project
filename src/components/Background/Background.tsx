import { FC, PropsWithChildren } from 'react';

import * as Styles from './Background.styles';
import * as Types from './Background.types';

import lines from './lines.svg';

const Background: FC<PropsWithChildren<Types.BackgroundProps>> = () => (
  <Styles.Container>
    <>
      <Styles.Content>
        Background
      </Styles.Content>
      <Styles.Image>
        <img src={lines}  alt="pitch lines" />
      </Styles.Image>
    </>
  </Styles.Container>
)

export {
  Background
}
