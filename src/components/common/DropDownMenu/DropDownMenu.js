import React from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import styles from './DropDownMenuStyles.scss';

class DropDownMenu extends React.Component {

  static propTypes = {
    menuIsOpen: PropTypes.bool.isRequired,
    dropListData: PropTypes.array.isRequired,
    children: PropTypes.node.isRequired,
    size: PropTypes.string,
  };

  nodeRef = new React.createRef();

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = event => {
    if (this.nodeRef.current && !this.nodeRef.current.contains(event.target)) {
      this.props.onClose();
    }
  };

  render() {
    const {menuIsOpen, dropListData, children, size} = this.props;

    return (
      <div className={`${styles.dropMenu} ${this.props.dropHeaderMenu && styles.dropMenuHeader}`} ref={this.nodeRef}>
        <div className={styles.dropMenuButton}>
          {children}
        </div>
        {menuIsOpen &&
          <ul className={`${styles.dropMenuList} ${styles[size]}`}>
            {dropListData.map((item, i) => (
              <li key={i}>
                {item.navTo ? <Link to={item.navTo} className={styles.dropMenuItem}>{item.text}</Link> : null}
                {item.handler ? <span className={styles.dropMenuItem} onClick={item.handler}>{item.text}</span> : null}
                {item.linkTo ? <a href={item.linkTo} className={styles.dropMenuLink}>{item.text}</a> : null}
              </li>
            ))}
          </ul>}
      </div>
    );
  }
}

export default DropDownMenu;
