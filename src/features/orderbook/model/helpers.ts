import { OrderbookGroupType } from '@widgets/orderbook';

export const ordersToNumbers = (orders: string[][]): number[][] =>
  orders.map(([price, size]) => [Number(price), Number(size)]);

export const getMaxTotals = (orders: number[][]): number => {
  const totals: number[] = orders.map(([, , total]) => total);

  return Math.max(...totals);
};

export const fillOrdersWithTotal = (orders: number[][]) => {
  const stackSums: number[] = [];

  const result = orders.map((order, idx) => {
    const [, size] = order;
    const shallowOrder = [...order];

    const sum = idx === 0 ? size : Number((size + stackSums[idx - 1]).toFixed(4));

    shallowOrder[2] = sum;
    stackSums.push(sum);

    return shallowOrder;
  });

  return result;
};

export const fillOrdersWithDepth = (orders: number[][], maxTotal: number) => {
  const result = orders.map(order => {
    const [, , total] = order;
    const shallowOrder = [...order];

    const depth = (total / maxTotal) * 100;

    shallowOrder[3] = Number(depth);

    return shallowOrder;
  });

  return result;
};

export const sortOrdersByPrice = (data: number[][], type: OrderbookGroupType) =>
  data.sort(([aPrice], [bPrice]) => (type === 'asks' ? aPrice - bPrice : bPrice - aPrice));

const remoteOrderByPrice = (price: number, orders: number[][]): number[][] =>
  orders.filter(order => order[0] !== price);

const updatePriceOrder = (order: number[], orders: number[][]): number[][] => {
  return orders.map(orderIterator => {
    if (orderIterator[0] === order[0]) {
      orderIterator = order;
    }

    return orderIterator;
  });
};

const isExistOrderByPrice = (price: number, orders: number[][]): boolean => orders.some(order => order[0] === price);

const addOrder = (order: number[], orders: number[][]): number[][] => {
  return [...orders, order];
};

export const fillByDeltas = (currentOrders: number[][], orders: number[][], maxRows: number): number[][] => {
  let updatedOrders: number[][] = currentOrders;

  orders.forEach(order => {
    const [price, size] = order;

    if (size === 0 && updatedOrders.length > maxRows) {
      updatedOrders = remoteOrderByPrice(price, updatedOrders);
    } else {
      if (isExistOrderByPrice(price, currentOrders)) {
        updatedOrders = updatePriceOrder(order, updatedOrders);
      } else {
        if (updatedOrders.length < maxRows) {
          updatedOrders = addOrder(order, updatedOrders);
        }
      }
    }
  });

  return updatedOrders;
};
