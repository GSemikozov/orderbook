import React from 'react';
import { State } from 'centrifuge';

import type { CentrifugeContextValue } from './types';

export const CentrifugeContext = React.createContext<CentrifugeContextValue>({
  client: null,
  status: State.Disconnected,
});
