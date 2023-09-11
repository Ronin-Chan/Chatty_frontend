import '@components//sidebar/Sidebar.scss';
import { useState, useEffect } from 'react';
import { fontAwesomeIcons, sideBarItems } from '@services/utils/static.data';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const [sidebarItems, setSidebarItems] = useState([]);
  useEffect(() => {
    setSidebarItems(sideBarItems);
  }, []);

  const checkUrl = (name) => {
    return location.pathname.includes(name.toLowerCase());
  };

  const navigate = useNavigate();
  const { profile } = useSelector((state) => state.user);
  const navigateToPage = (name, url) => {
    if (name === 'Profile') {
      url = `${url}/${profile?.username}?${createSearchParams({
        id: profile?._id,
        uId: profile?.uId,
      })}`;
    }
    navigate(url);
  };

  return (
    <div className="app-side-menu">
      <div className="side-menu">
        <ul className="list-unstyled">
          {sidebarItems.map((data) => (
            <li
              key={data.index}
              onClick={() => navigateToPage(data.name, data.url)}
            >
              <div
                data-testid="sidebar-list"
                className={`sidebar-link ${
                  checkUrl(data.name) ? 'active' : ''
                }`}
              >
                <div className="menu-icon">
                  {fontAwesomeIcons[data.iconName]}
                </div>
                <div className="menu-link">
                  <span>{`${data.name}`}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
