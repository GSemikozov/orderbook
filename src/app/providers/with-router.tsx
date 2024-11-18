import { HashRouter } from 'react-router-dom';

import { AppProps } from '@app';

import { WrapedComponent } from './types';

export const withRouter = (component: WrapedComponent<AppProps>) => (props: AppProps) => {
  return <HashRouter>{component(props)}</HashRouter>;
};
