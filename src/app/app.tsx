import { Routes, Route } from 'react-router-dom';

import { routes } from './routes';
import { withRouter } from './providers';

export type AppProps = unknown;

export const BaseApp = () => {
  return (
    <Routes>
      {routes.map(([id, route]) => (
        <Route key={id} index={route.index} path={route.path} element={<route.element />} />
      ))}
    </Routes>
  );
};

export const App = withRouter(BaseApp);
