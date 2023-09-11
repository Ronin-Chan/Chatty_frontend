import useEffectOnce from '@hooks/useEffectOnce';
import useLocalStorage from '@hooks/useLocalStorage';
import useSessionStorage from '@hooks/useSessionStorage';
import { addUser } from '@redux/reducers/user/user.reducer';
import { userService } from '@services/api/user/user.service';
import { Utils } from '@services/utils/utils.service';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [tokenIsValid, setTokenIsValid] = useState(false);
  const { profile, token } = useSelector((state) => state.user);

  const pageReload = useSessionStorage('pageReload', 'get');
  const keepLoggedIn = useSessionStorage('keepLoggedIn', 'get');
  const [setLoggedIn] = useLocalStorage('loggedIn', 'set');
  const [deleteStorageUsername] = useLocalStorage('username', 'delete');
  const [deleteSessionPageReload] = useLocalStorage('pageReload', 'delete');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkUser = useCallback(async () => {
    try {
      const result = await userService.checkCurrentUser();
      setUserData(result.data.user);
      setTokenIsValid(true);
      dispatch(
        addUser({ token: result.data.token, profile: result.data.user }),
      );
    } catch (error) {
      setTokenIsValid(false);
      setTimeout(async () => {
        Utils.clearStore({
          dispatch,
          deleteStorageUsername,
          deleteSessionPageReload,
          setLoggedIn,
        });
        await userService.userLogout();
        navigate('/');
      }, 1000);
    }
  }, [
    dispatch,
    navigate,
    deleteStorageUsername,
    deleteSessionPageReload,
    setLoggedIn,
  ]);

  useEffectOnce(() => {
    checkUser();
  });

  if (
    keepLoggedIn ||
    (!keepLoggedIn && userData) ||
    (profile && token) ||
    pageReload
  ) {
    if (!tokenIsValid) {
      return <></>;
    } else {
      return <>{children}</>;
    }
  } else {
    return <>{<Navigate to="/" />}</>;
  }
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
