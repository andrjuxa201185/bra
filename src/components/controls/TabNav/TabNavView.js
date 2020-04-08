import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TabList, Tab } from 'react-tabs';
import { globals } from "../../../store/globals";
import styles from "./TabNavStyles.scss";

export const TabView = ({children, secondary, color, ...props}) => (
  <Tab className={`${styles.tab} ${secondary ? styles.secondaryTab : ''} ${color ? styles[color] : ''}`} selectedClassName={styles.active} {...props}>
    {children}
  </Tab>
);
TabView.tabsRole = 'Tab';

TabView.propTypes = {
  children: PropTypes.node.isRequired,
  secondary: PropTypes.bool,
};

export const TabNavView = ({children, links}) => {
  const navTo = route => e => {
    e.preventDefault();
    globals.history.push(route);
  };

  if (links) {
    return (
      <ul className={styles.tabList}>
        {links.map((link, i) => {
          return (
            <li
              onClick={navTo(link.route)}
              className={`${styles.tab} ${link.active ? styles.active: ''} `}
              key={i}
            >
              {link.title}
            </li>
          );
        })}
      </ul>
    );
  }
  return (
    <TabList className={styles.tabList} >
      {children}
    </TabList>
  );
};

TabNavView.tabsRole = 'TabList';

TabNavView.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object),
  links: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
  })),
};

export const TabButtonsView = ({buttons, onClick}) => {
  if (!buttons.length) return null;

  let [activeTab, setActiveTab] = useState(buttons[0].id);

  const handleClick = id => () => {
    setActiveTab(id);
    onClick(id);
  };

  if (buttons && onClick) {
    return (
      <ul className={styles.tabList}>
        {buttons.map(button => {
          return (
            <li
              onClick={handleClick(button.id)}
              className={`${styles.tab} ${button.id === activeTab ? styles.active: ''} `}
              key={button.id}>
              {button.name}
            </li>
          );
        })}
      </ul>
    );
  }
  return null;
};

TabButtonsView.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })),
  onClick: PropTypes.func.isRequired,
};
