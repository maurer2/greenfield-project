/// <reference types="next" />
/// <reference types="next/types/global" />

declare module '*.svg?react' {
  import type * as React from 'react';

  const ReactComponent: React.FunctionComponent<React.ComponentProps<'svg'> & { title?: string }>;

  export default ReactComponent;
}
