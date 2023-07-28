import { useRoutes } from 'react-router-dom';
import { AuthTabs, ForgotPwd, ResetPwd } from './pages/auth';

export const AppRouter = () => {
  const elements = useRoutes([
    {
      path: '/',
      element: <AuthTabs />,
    },
    {
      path: '/forgot-pwd',
      element: <ForgotPwd />,
    },
    {
      path: '/reset-pwd',
      element: <ResetPwd />,
    },
  ]);

  return elements;
};
