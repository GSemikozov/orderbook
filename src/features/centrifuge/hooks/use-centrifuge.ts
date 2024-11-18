import React from 'react';
import { State } from 'centrifuge';

import { useEvent } from '@shared/hooks';
import { useCentrifugeContext } from './use-centrifuge-context';

import type { Subscription } from 'centrifuge';

type UseCentrifugeOptions = {
  onSubscribed?: <T>(data: T) => void;
  onSubscriptionData?: <T>(data: T) => void;
};

export const useCentrifuge = (options: UseCentrifugeOptions = {}) => {
  const { onSubscribed, onSubscriptionData } = options;

  const { client: centrifugeClient, status: centrifugeClientStatus } = useCentrifugeContext();

  const lastChannelRef = React.useRef<string | null>(null);
  const resubscribeTimeoutIdRef = React.useRef<NodeJS.Timeout | null>(null);

  const [eagerSubscriptionChannel, setEagerSubscriptionChannel] = React.useState<string | null>(null);

  const unsubscribe = () => setEagerSubscriptionChannel(null);

  const subscribe = (channel: string) => {
    lastChannelRef.current = channel;
    setEagerSubscriptionChannel(channel);

    return unsubscribe;
  };

  const resubscribe = () => {
    if (!lastChannelRef.current) {
      return;
    }

    unsubscribe();

    resubscribeTimeoutIdRef.current = setTimeout(() => setEagerSubscriptionChannel(lastChannelRef.current), 1000);
  };

  const handleSubscribed = useEvent((data: any) => {
    if (onSubscribed) {
      onSubscribed(data);
    }
  });

  const handleSubscriptionData = useEvent((data: any) => {
    if (onSubscriptionData) {
      onSubscriptionData(data);
    }
  });

  React.useEffect(() => {
    if (centrifugeClientStatus !== State.Connected) {
      return;
    }

    let subscription: Subscription | null = null;

    if (eagerSubscriptionChannel) {
      subscription = centrifugeClient.newSubscription(eagerSubscriptionChannel);

      subscription.on('subscribed', ctx => handleSubscribed(ctx.data));
      subscription.on('publication', ctx => handleSubscriptionData(ctx.data));
      subscription.subscribe();
    }

    return () => {
      if (subscription) {
        subscription.removeAllListeners();
        subscription.unsubscribe();
        centrifugeClient.removeSubscription(subscription);
      }
    };
  }, [centrifugeClientStatus, eagerSubscriptionChannel]);

  React.useEffect(
    () => () => {
      if (resubscribeTimeoutIdRef.current) {
        clearTimeout(resubscribeTimeoutIdRef.current);
      }
    },
    [],
  );

  return {
    subscribe,
    resubscribe,
    unsubscribe,
  };
};
