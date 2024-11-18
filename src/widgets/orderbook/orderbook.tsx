import React from 'react';
import styled from 'styled-components';

import { theme } from '@ui/theme';
import { useCentrifuge } from '@features/centrifuge';
import {
  resetOrderbookConnectionStore,
  setOrderbookConnectionData,
  setOrderbookData,
  updateOrderbookData,
  useOrderbookConnectionStore,
  useOrderbookStore,
} from '@features/orderbook';
import { OrderbookGroup } from './orderbook-group';
import { OrderbookRow } from './orderbook-row';

type OrderbookProps = {
  market: string;
  maxRows?: number;
};

export const Orderbook = (props: OrderbookProps) => {
  const { market, maxRows = 10 } = props;

  const orderbookConnectionStore = useOrderbookConnectionStore();
  const orderbookStore = useOrderbookStore();

  const { subscribe, resubscribe } = useCentrifuge({
    onSubscribed: (data: any) => {
      if (!data) {
        return;
      }

      setOrderbookConnectionData({ sequence: data.sequence });
      setOrderbookData({ maxRows, asks: data.asks ?? [], bids: data.bids });
    },

    onSubscriptionData: (data: any) => {
      if (!data) {
        return;
      }

      setOrderbookConnectionData({ sequence: data.sequence });
      updateOrderbookData({ asks: data.asks, bids: data.bids });
    },
  });

  React.useEffect(() => subscribe(`orderbook:${market}`), [market]);

  React.useEffect(() => {
    if (orderbookConnectionStore.needReconnect) {
      resubscribe();
      resetOrderbookConnectionStore();
    }
  }, [orderbookConnectionStore]);

  console.log('asks', orderbookStore.asks);
  console.log('bids', orderbookStore.bids);

  return (
    <Root>
      <Header>
        <OrderbookRow items={['Price', 'Amount', 'Total']} />
      </Header>

      <Main>
        <OrderbookGroup type='asks' data={orderbookStore.asks} />
        <OrderbookGroup type='bids' data={orderbookStore.bids} />
      </Main>
    </Root>
  );
};

const Root = styled.div`
  width: 300px;
  padding: 12px;
  background-color: ${theme.colors.background};
`;

const Main = styled.div`
  > *:not(:last-child) {
    margin-bottom: 8px;
  }
`;

const Header = styled.div`
  margin-bottom: 16px;
`;
