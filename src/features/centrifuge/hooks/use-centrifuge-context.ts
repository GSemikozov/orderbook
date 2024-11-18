import React from 'react';

import { CentrifugeContext } from '@features/centrifuge/context';

import type { Centrifuge } from 'centrifuge';
import type { CentrifugeContextValue } from '@features/centrifuge/context';

type UseCentrifugeContextResult = {
  client: Centrifuge;
} & Omit<CentrifugeContextValue, 'client'>;

export const useCentrifugeContext = (): UseCentrifugeContextResult => {
  const value = React.useContext(CentrifugeContext);

  if (value.client === null) {
    throw new Error("centrifuge context doesn't exist");
  }

  return value as UseCentrifugeContextResult;
};
