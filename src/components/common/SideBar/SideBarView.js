import React from 'react';
import {Link, NavLink} from "react-router-dom";
import PropTypes from 'prop-types';
import styles from "./SideBarStyles.scss";
import {
  MEMBER_BENEFITS,
  SETTINGS,
  REFER_FRIEND,
} from "../../../navigation/routes";
import { globals } from '../../../store/globals';
import {DOMAIN_LANDING_URL} from "../../../service/apiConstants";

class SideBarView extends React.Component {
  render() {
    const {navItems, headerbar, navTo} = this.props;

    return (
      <aside className={headerbar ? styles.headerbar : styles.sidebar}>
        <div className={styles.sidebarNav}>
          {
            navItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div className={styles.sidebarNavItem} key={i}>
                  <a
                    onClick={navTo(item)}
                    href='#'
                    // activeClassName={styles.active}
                    className={`${styles.sidebarNavLink} ${item.linkTo === globals.history.location.pathname ? styles.active : ''}`}
                  >
                    <div className={styles.sidebarIconContainer}>
                      <Icon className={styles.sidebarNavIcon}/>
                    </div>
                    <span className={styles.sidebarNavText}>{item.text}</span>
                  </a>
                </div>
              );
            })
          }
        </div>

        <div className={styles.sidebarMenu}>
          <Link to={REFER_FRIEND} className={styles.sidebarMenuItem}>
            Refer A Friend
          </Link>
          <a href={`${DOMAIN_LANDING_URL}/help.php`}
             target='_blank' rel='noopener noreferrer' className={styles.sidebarMenuItem}>
            Help
          </a>
          <Link to={MEMBER_BENEFITS} className={styles.sidebarMenuItem}>
            Member Benefits
          </Link>
          <Link to={SETTINGS} className={styles.sidebarMenuItem}>
            Settings
          </Link>
          <a href={`${DOMAIN_LANDING_URL}/contact.php`} target='_blank' rel='noopener noreferrer'
             className={styles.sidebarMenuItem}>
            Contact Us
          </a>
          <span className={styles.sidebarMenuItem} onClick={this.props.logout}>Log Out</span>
        </div>
      </aside>
    );
  }
}

SideBarView.propTypes = {
  headerbar: PropTypes.bool,
  navItems: PropTypes.array.isRequired,
  logout: PropTypes.func.isRequired,
  navTo: PropTypes.func.isRequired,
};

export default SideBarView;
