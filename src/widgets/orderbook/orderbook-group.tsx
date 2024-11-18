import styled from 'styled-components';

import { OrderbookRow } from './orderbook-row';

import type { OrderbookGroupType } from './types';

type OrderbookGroupProps = {
  type: OrderbookGroupType;
  data: number[][];
};

export const OrderbookGroup = (props: OrderbookGroupProps) => {
  const { type, data } = props;

  return (
    <Root>
      {data.map(([price, size, total]) => (
        <OrderbookRow key={`${price}#${size}`} type={type} items={[price, size, total]} />
      ))}
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;
