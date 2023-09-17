import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from '@root/routes';
import '@root/App.scss';
import { socketService } from '@services/socket/socket.service';
import Toast from '@components/toast/Toast';
import { useSelector } from 'react-redux';

const App = () => {
  useEffect(() => {
    socketService.setupSocketConnection();
  }, []);

  const notification = useSelector((state) => state.notifications);

  return (
    <>
      {notification && notification.length > 0 && (
        <Toast
          toastList={notification}
          position="top-right"
          autoDelete={true}
        />
      )}
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </>
  );
};

export default App;
