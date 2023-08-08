import { useRoutes } from 'react-router-dom';
import { AuthTabs, ForgotPwd, ResetPwd } from '@pages/auth';
import { Streams } from '@pages/social';

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
      path: '/app/social/streams',
      element: <Streams />,
    },
  ]);

  return elements;
};
