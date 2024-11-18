import { createStore, createEvent } from 'effector';
import { useUnit } from 'effector-react';

type OrderbookConnectionStore = {
  sequence: number;
  needReconnect: boolean;
};

type OrderbookStore = {
  maxRows: number;

  rawAsks: number[][];
  asks: number[][];

  rawBids: number[][];
  bids: number[][];
};

type OrderbookStorePayload = {
  maxRows: number;
  asks: string[][];
  bids: string[][];
};

// prettier-ignore
const setOrderbookConnectionData = createEvent<Pick<OrderbookConnectionStore, 'sequence'>>('set orderbook connection data');
const resetOrderbookConnectionStore = createEvent('reset orderbook connection data to initial values');
const $orderbookConnectionStore = createStore<OrderbookConnectionStore>({
  sequence: -1,
  needReconnect: false,
});

const useOrderbookConnectionStore = (): OrderbookConnectionStore => useUnit($orderbookConnectionStore);

// prettier-ignore
const setOrderbookData = createEvent<OrderbookStorePayload>('set orderbook data');
const updateOrderbookData = createEvent<Pick<OrderbookStorePayload, 'asks' | 'bids'>>('update orderbook data');
const $orderbookStore = createStore<OrderbookStore>({
  maxRows: 0,
  rawAsks: [],
  asks: [],
  rawBids: [],
  bids: [],
});

const useOrderbookStore = (): OrderbookStore => useUnit($orderbookStore);

export {
  $orderbookConnectionStore,
  useOrderbookConnectionStore,
  setOrderbookConnectionData,
  resetOrderbookConnectionStore,
  $orderbookStore,
  setOrderbookData,
  useOrderbookStore,
  updateOrderbookData,
};
