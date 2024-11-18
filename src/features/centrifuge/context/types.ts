import type { Centrifuge, State } from 'centrifuge';

export type CentrifugeContextValue = {
  client: Centrifuge | null;
  status: State;
};
