import {
  sortOrdersByPrice,
  fillOrdersWithTotal,
  getMaxTotals,
  fillOrdersWithDepth,
  fillByDeltas,
  ordersToNumbers,
} from './helpers';
import {
  $orderbookConnectionStore,
  setOrderbookConnectionData,
  resetOrderbookConnectionStore,
  $orderbookStore,
  setOrderbookData,
  updateOrderbookData,
} from './';

$orderbookConnectionStore
  .on(setOrderbookConnectionData, (state, payload) => {
    if (state.sequence === -1) {
      return {
        needReconnect: false,
        sequence: payload.sequence,
      };
    }

    if (payload.sequence - state.sequence > 1) {
      return {
        sequence: payload.sequence,
        needReconnect: true,
      };
    }

    return {
      needReconnect: false,
      sequence: payload.sequence,
    };
  })
  .reset(resetOrderbookConnectionStore);

$orderbookStore
  .on(setOrderbookData, (_, payload) => {
    const { maxRows, asks: payloadAsks, bids: payloadBids } = payload;

    const asks = fillOrdersWithTotal(
      sortOrdersByPrice(ordersToNumbers(payloadAsks), 'asks').slice(0, maxRows),
    ).reverse();
    const maxTotalAsks = getMaxTotals(asks);

    const bids = fillOrdersWithTotal(sortOrdersByPrice(ordersToNumbers(payloadBids), 'bids').slice(0, maxRows));
    const maxTotalBids = getMaxTotals(bids);

    return {
      maxRows,
      rawAsks: ordersToNumbers(payloadAsks),
      asks: fillOrdersWithDepth(asks, maxTotalAsks),
      rawBids: ordersToNumbers(payloadBids),
      bids: fillOrdersWithDepth(bids, maxTotalBids),
    };
  })
  .on(updateOrderbookData, (state, payload) => {
    let shallowState = { ...state };

    const { maxRows, rawAsks, rawBids } = state;
    const { asks: payloadAsks, bids: payloadBids } = payload;

    if (payloadAsks.length > 0) {
      const asks = fillOrdersWithTotal(
        sortOrdersByPrice(fillByDeltas(rawAsks, ordersToNumbers(payloadAsks), maxRows).slice(0, maxRows), 'asks'),
      ).reverse();
      const maxTotalAsks = getMaxTotals(asks);

      shallowState = { ...shallowState, asks: fillOrdersWithDepth(asks, maxTotalAsks) };
    }

    if (payloadBids.length > 0) {
      const bids = fillOrdersWithTotal(
        sortOrdersByPrice(fillByDeltas(rawBids, ordersToNumbers(payloadBids), maxRows).slice(0, maxRows), 'bids'),
      );
      const maxTotalBids = getMaxTotals(bids);

      shallowState = { ...shallowState, bids: fillOrdersWithDepth(bids, maxTotalBids) };
    }

    return shallowState;
  });
