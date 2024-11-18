import { IndexPage } from '@pages';
import { NotFoundPage } from '@pages/not-found';

import type { RouteProps as BaseRouteProps } from 'react-router-dom';

export type RouteProps = Omit<BaseRouteProps, 'element'> & {
  element: () => JSX.Element;
};

export const routesMap: Record<string, RouteProps> = {
  index: {
    index: true,
    path: '/',
    element: IndexPage,
  },

  notFound: {
    path: '*',
    element: NotFoundPage,
  },
};

export const routes = Object.entries(routesMap);
