import React from "react";
import PropTypes from "prop-types";
import styles from './DropDownInfoStyles.scss';

class DropDownInfoView extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string,
    subtitle: PropTypes.string,
    children: PropTypes.node,
  };

  state = {
    isOpen: false,
  };

  handleOpen = () => {
    this.setState(state => ({
      isOpen: !state.isOpen,
    }));
  };

  render() {
    const { title, text, subtitle, children } = this.props;
    return (
      <div className={`${styles.dropDownInfo} ${this.state.isOpen ? styles.open : ''}`}>
        <a className={styles.header} onClick={this.handleOpen}>
          <div className={styles.titleBlock}>
            <span className={styles.title}>{title}</span>
            {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
          </div>
          <span className={styles.toggleBtn}>
            {this.state.isOpen ? '-' : '+'}
          </span>
        </a>
        <div className={styles.content}>
          {text &&
            <span className={styles.text}>{text}</span>
          }
          {
            children ? children : null
          }
        </div>
      </div>
    );
  }
}

export default DropDownInfoView;
