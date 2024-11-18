import { CentrifugeProvider } from '@features/centrifuge';
import { GlobalStyles } from '@shared/styled';
import { Orderbook } from '@widgets/orderbook';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwIiwiZXhwIjo1MjYyNjUyMDEwfQ.x_245iYDEvTTbraw1gt4jmFRFfgMJb-GJ-hsU9HuDik';

export const IndexPage = () => {
  return (
    <CentrifugeProvider token={token}>
      <GlobalStyles />

      <Orderbook market='BTC-USD' />
    </CentrifugeProvider>
  );
};
