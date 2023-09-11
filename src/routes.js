import { useRoutes } from 'react-router-dom';
import { AuthTabs, ForgotPwd, ResetPwd } from '@pages/auth';
import ProtectedRoute from '@pages/ProtectedRoute';
import Error from '@pages/error/Error';
import { Suspense, lazy } from 'react';
import StreamsSkeleton from '@pages/social/streams/StreamsSkeleton';

const Social = lazy(() => import('@pages/social/Social'));
const Streams = lazy(() => import('@pages/social/streams/Streams'));
const Profile = lazy(() => import('@pages/social/Profile'));
const People = lazy(() => import('@pages/social/People'));

export const AppRouter = () => {
  const elements = useRoutes([
    {
      path: '/',
      element: <AuthTabs />,
    },
    {
      path: '/forgot-password',
      element: <ForgotPwd />,
    },
    {
      path: '/reset-password',
      element: <ResetPwd />,
    },
    {
      path: '/app/social',
      element: (
        <ProtectedRoute>
          <Social />
        </ProtectedRoute>
      ),
      children: [
        {
          path: 'streams',
          element: (
            <Suspense fallback={<StreamsSkeleton />}>
              <Streams />
            </Suspense>
          ),
        },
        {
          path: 'chat',
          element: (
            <Suspense>
              <Streams />
            </Suspense>
          ),
        },
        {
          path: 'people',
          element: (
            <Suspense>
              <People />
            </Suspense>
          ),
        },
        {
          path: 'following',
          element: (
            <Suspense>
              <Streams />
            </Suspense>
          ),
        },
        {
          path: 'followers',
          element: (
            <Suspense>
              <Streams />
            </Suspense>
          ),
        },
        {
          path: 'photos',
          element: (
            <Suspense>
              <Streams />
            </Suspense>
          ),
        },
        {
          path: 'videos',
          element: (
            <Suspense>
              <Streams />
            </Suspense>
          ),
        },
        {
          path: 'notifications',
          element: (
            <Suspense>
              <Streams />
            </Suspense>
          ),
        },
        {
          path: 'profile/:username',
          element: (
            <Suspense>
              <Profile />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: '*',
      element: <Error />,
    },
  ]);

  return elements;
};
