import styled, { css } from 'styled-components';

import { theme } from '@ui/theme';

import type { OrderbookGroupType } from './types';

type OrderbookRowProps = {
  items: any[];
  type?: OrderbookGroupType;
};

export const OrderbookRow = (props: OrderbookRowProps) => {
  const { type, items } = props;

  return (
    <Row type={type}>
      {items.map((item, index) => {
        const key = item + '#' + index;

        return <Text key={key}>{item}</Text>;
      })}
    </Row>
  );
};

const Text = styled.span`
  color: ${theme.colors.text.primary};
  font-size: 1.2rem;
`;

const Row = styled.div<Pick<OrderbookRowProps, 'type'>>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;

  > ${Text} {
    text-align: right;

    &:first-child {
      text-align: left;
    }
  }

  ${(p) =>
    p.type === 'asks' &&
    css`
      > ${Text}:first-child {
        color: ${theme.colors.text.decrease};
      }
    `}

  ${(p) =>
    p.type === 'bids' &&
    css`
      > ${Text}:first-child {
        color: ${theme.colors.text.insrease};
      }
    `}
`;
