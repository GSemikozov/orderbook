import React from 'react';
import { Centrifuge, State } from 'centrifuge';

import { CentrifugeContext } from './context';

type CentrifugeProviderProps = {
  token: string;
  children: React.ReactNode;
};

const CENTRIFUGE_URL = 'wss://api.testnet.rabbitx.io/ws';

export const CentrifugeProvider = (props: CentrifugeProviderProps) => {
  const { token, children } = props;

  const centrifugeClientRef = React.useRef<Centrifuge | null>(null);

  const [status, setStatus] = React.useState<State>(State.Disconnected);

  const getCentrifugeClient = () => {
    if (centrifugeClientRef.current === null) {
      centrifugeClientRef.current = new Centrifuge(CENTRIFUGE_URL, {
        token,
        minReconnectDelay: 1000,
      });
    }

    return centrifugeClientRef.current;
  };

  React.useEffect(() => {
    const centrifugeClient = (centrifugeClientRef.current = new Centrifuge(CENTRIFUGE_URL, {
      token,
      minReconnectDelay: 1000,
    }));

    centrifugeClient.connect();

    centrifugeClient.on('state', ctx => setStatus(ctx.newState));

    return () => {
      if (centrifugeClient) {
        centrifugeClient.removeAllListeners();
        centrifugeClient.disconnect();
      }
    };
  }, [token]);

  const ctx = {
    client: getCentrifugeClient(),
    status,
  };

  return <CentrifugeContext.Provider value={ctx}>{children}</CentrifugeContext.Provider>;
};
