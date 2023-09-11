import logo from '@assets/images/logo.svg';
import {
  FaCaretDown,
  FaCaretUp,
  FaRegBell,
  FaRegEnvelope,
} from 'react-icons/fa';
import '@components/header/Header.scss';
import Avatar from '@components/avatar/Avatar';
import { useEffect, useState, useRef } from 'react';
import { Utils } from '@services/utils/utils.service';
import { useDispatch, useSelector } from 'react-redux';
import useDetectOutsideClick from '@hooks/useDetectOutsideClick';
import MessageSidebar from '@components/message-sidebar/MessageSidebar';
import Dropdown from '@components/dropdown/Dropdown';
import useEffectOnce from '@hooks/useEffectOnce';
import { ProfileUtils } from '@services/utils/profile-utils.service';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '@hooks/useLocalStorage';
import useSessionStorage from '@hooks/useSessionStorage';
import { userService } from '@services/api/user/user.service';
import HeaderSkeleton from '@components/header/HeaderSkeleton';

const Header = () => {
  const [environment, setEnvironment] = useState('');
  const backgroundColor = `${
    environment === 'DEV' ? '#50b5ff' : environment === 'STG' ? '#e9710f' : ''
  }`;
  useEffect(() => {
    const env = Utils.appEnvironment();
    setEnvironment(env);
  }, []);

  // message sidebar
  const { profile } = useSelector((state) => state.user);
  const messageRef = useRef(null);
  const [isMessageActive, setIsMessageActive] = useDetectOutsideClick(
    messageRef,
    false,
  );
  const openChatPage = () => {};

  // notification dropdown
  const notificationRef = useRef(null);
  const [isNotificationActive, setIsNotificationActive] = useDetectOutsideClick(
    notificationRef,
    false,
  );
  const onMarkAsRead = () => {};
  const onDeleteNotification = () => {};

  // setting
  const settingRef = useRef(null);
  const [isSettingActive, setIsSettingActive] = useDetectOutsideClick(
    settingRef,
    false,
  );

  const dispatch = useDispatch();
  const [deleteStorageUsername] = useLocalStorage('username', 'delete');
  const [deleteSessionPageReload] = useSessionStorage('pageReload', 'delete');
  const [setLoggedIn] = useLocalStorage('loggedIn', 'set');
  const onLogout = async () => {
    Utils.clearStore({
      dispatch,
      deleteStorageUsername,
      deleteSessionPageReload,
      setLoggedIn,
    });
    await userService.userLogout();
    navigate('/');
  };

  const [setting, setSetting] = useState([]);
  const navigate = useNavigate();

  useEffectOnce(() => {
    Utils.mapSettingsDropdownItems(setSetting);
  });

  return (
    <>
      {!profile ? (
        <HeaderSkeleton />
      ) : (
        <div className="header-nav-wrapper" data-testid="header-wrapper">
          {isMessageActive && (
            <div ref={messageRef}>
              <MessageSidebar
                profile={profile}
                messageCount={0}
                messageNotifications={[]}
                openChatPage={openChatPage}
              />
            </div>
          )}
          <div className="header-navbar">
            <div className="header-image" data-testid="header-image">
              <img src={logo} className="img-fluid" alt="" />
              <div className="app-name">
                Chatty
                {environment && (
                  <span
                    className="environment"
                    style={{ backgroundColor: `${backgroundColor}` }}
                  >
                    {environment}
                  </span>
                )}
              </div>
            </div>
            <div className="header-menu-toggle">
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
            <ul className="header-nav">
              <li
                className="header-nav-item active-item"
                onClick={() => {
                  setIsMessageActive(false);
                  setIsNotificationActive(true);
                  setIsSettingActive(false);
                }}
              >
                <span className="header-list-name">
                  <FaRegBell className="header-list-icon" />
                  <span
                    className="bg-danger-dots dots"
                    data-testid="notification-dots"
                  ></span>
                </span>
                {isNotificationActive && (
                  <ul className="dropdown-ul" ref={notificationRef}>
                    <li className="dropdown-li">
                      <Dropdown
                        height={300}
                        style={{ right: '250px', top: '20px' }}
                        data={[]}
                        notificationCount={0}
                        title="Notifications"
                        onMarkAsRead={onMarkAsRead}
                        onDeleteNotification={onDeleteNotification}
                      />
                    </li>
                  </ul>
                )}
                &nbsp;
              </li>
              <li
                className="header-nav-item active-item"
                onClick={() => {
                  setIsMessageActive(true);
                  setIsNotificationActive(false);
                  setIsSettingActive(false);
                }}
              >
                <span className="header-list-name">
                  <FaRegEnvelope className="header-list-icon" />

                  <span
                    className="bg-danger-dots dots"
                    data-testid="messages-dots"
                  ></span>
                </span>
                &nbsp;
              </li>
              <li
                className="header-nav-item"
                onClick={() => {
                  setIsSettingActive(!isSettingActive);
                  setIsMessageActive(false);
                  setIsNotificationActive(false);
                }}
              >
                <span className="header-list-name profile-image">
                  <Avatar
                    avatarSrc={profile?.profilePicture}
                    name={profile?.username}
                    bgColor={profile?.avatarColor}
                    textColor="#ffffff"
                    size={40}
                  />
                </span>
                <span className="header-list-name profile-name">
                  {profile?.username}
                  {!isSettingActive ? (
                    <FaCaretDown className="header-list-icon caret" />
                  ) : (
                    <FaCaretUp className="header-list-icon caret" />
                  )}
                </span>
                {isSettingActive && (
                  <ul className="dropdown-ul" ref={settingRef}>
                    <li className="dropdown-li">
                      <Dropdown
                        height={300}
                        style={{ right: '150px', top: '40px' }}
                        data={setting}
                        notificationCount={0}
                        title="Setting"
                        onLogout={onLogout}
                        onNavigate={() =>
                          ProfileUtils.navigateToProfile(profile, navigate)
                        }
                      />
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};
export default Header;
