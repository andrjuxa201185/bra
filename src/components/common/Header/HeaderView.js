import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  SETTINGS, DASHBOARD,
} from '../../../navigation/routes';
import {DropDownMenu} from '../../common';
import styles from './HeaderStyles.scss';
import logoImage from '../../../assets/images/logo.png';
import {SideBar} from "../../common";
import btn from './BtnGumburger.scss';

class HeaderView extends React.Component {

  static propTypes = {
    isActive: PropTypes.bool.isRequired,
    userAvatar: PropTypes.string,
    userName: PropTypes.string,
    onChangeInput: PropTypes.func,
    onDropMenuOpen: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    menuIsOpen: PropTypes.bool.isRequired,
  };

  render() {
    const {userAvatar, userName, onDropMenuOpen, menuIsOpen, onLogout, isActive, onChangeInput, onMenuClose, isAdmin} = this.props;
    return (
      <div className={styles.header}>
        <div className={btn["b-btnMenu"]}>
          <input className={`${btn['b-btnMenu__input']}`} onChange={onChangeInput} type='checkbox' id='btnMenu'/>
          <label className={`${btn['b-btnMenu__label']}`} htmlFor='btnMenu'>
            <div className={`${btn['b-btnMenu__item']}`}></div>
            <div className={`${btn['b-btnMenu__item']}`}></div>
            <div className={`${btn['b-btnMenu__item']}`}></div>
          </label>
        </div>

        <div className={styles.headerLogo}>
          <Link to={DASHBOARD} className={styles.headerLogoLink}>
            <img src={logoImage} className={styles.headerLogoImg} alt='logo'/>
          </Link>
        </div>
        {
          isAdmin &&
          <span className={styles.forceLogin}>
            You are using the Admin mode
          </span>
        }
        <DropDownMenu onClose={onMenuClose} menuIsOpen={menuIsOpen} dropHeaderMenu dropListData={[
          {text: 'Settings', navTo: SETTINGS},
          {text: 'Logout', handler: onLogout},
        ]}>
          <div className={styles.userPanel} onClick={onDropMenuOpen}>
            <div className={styles.avatarContainer}>
              <img src={userAvatar} alt='avatar'/>
            </div>
            <span className={styles.userPanelText}>Hello, {userName}</span>
          </div>
        </DropDownMenu>
        <div className={`${styles.menu} ${isActive ? styles.menu__active : ''}`}>
          <SideBar headerbar/>
        </div>
      </div>
    );
  }
}

export default HeaderView;
