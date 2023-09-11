import Header from '@components/header/Header';
import Sidebar from '@components/sidebar/Sidebar';
import '@pages/social/Social.scss';
import { Outlet } from 'react-router-dom';

const Social = () => {
  return (
    <>
      <Header />
      <div className="dashboard">
        <div className="dashboard-sidebar">
          <Sidebar />
        </div>
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Social;
