import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Router, AppRoute } from '/:core.jsx';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Theme } from './theme';

const queryClient = new QueryClient();

export default function Root(props) {
  const { url, routes, head, ctxHydration, routeMap } = props;

  return (
    <QueryClientProvider client={queryClient}>
      <Theme>
        <Suspense>
          <Router location={url}>
            <Routes>
              {routes.map(({ path, component: Component }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    <AppRoute
                      head={head}
                      ctxHydration={ctxHydration}
                      ctx={routeMap[path]}
                    >
                      <Component />
                    </AppRoute>
                  }
                />
              ))}
            </Routes>
          </Router>
        </Suspense>
      </Theme>
    </QueryClientProvider>
  );
}
