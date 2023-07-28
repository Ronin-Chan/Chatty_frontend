import { useRoutes } from 'react-router-dom';
import { AuthTabs, ForgotPwd, ResetPwd } from './pages/auth';

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
  ]);

  return elements;
};
