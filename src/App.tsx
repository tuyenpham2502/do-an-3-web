import '@/App.css';
import { RepositoryProvider } from '@/di/RepositoriesProvider';
import { PrivateRoute } from '@/presentation/routes/privateRouter';
import { PublicRoute } from '@/presentation/routes/publicRouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConfigProvider, theme } from 'antd';
import { useAtom } from 'jotai';
import { Suspense } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router';
import themeAtom from './application/stores/atoms/global/theme';
import { routes } from './presentation/routes/routers';
import { AppRoutes } from './shared/appRoutes';

const queryClient = new QueryClient();

const RouteRoot = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div>
            <h1>Loading...</h1>
          </div>
        }
      >
        <Routes>
          {routes.map(({ path, component: Component, isProtected, layout: Layout, title }) => {
            // Xử lý redirect (không dùng Public/Private)
            if (path === '/') {
              return <Route key={path} path={path} element={<Component />} />;
            }

            // Xử lý Not Found và Permission Denied (không dùng Public/Private)
            if (path === '*' || path === AppRoutes.PERMISSION_DENIED) {
              return <Route key={path} path={path} element={<Component />} />;
            }

            // Route thông thường (Public/Private)
            const RouteWrapper = isProtected ? PrivateRoute : PublicRoute;
            return (
              <Route
                key={path}
                path={path}
                element={
                  <RouteWrapper>
                    {Layout ? (
                      <Layout>
                        <Helmet>
                          <title>{title || 'SustainaPass'}</title>
                          <meta name='description' content={title} />
                        </Helmet>
                        <Component />
                      </Layout>
                    ) : (
                      <Component />
                    )}
                  </RouteWrapper>
                }
              />
            );
          })}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

function App() {
  const [currentTheme] = useAtom(themeAtom);

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <RepositoryProvider>
          <ConfigProvider
            theme={{
              algorithm: currentTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
            }}
          >
            <RouteRoot />
          </ConfigProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </RepositoryProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
