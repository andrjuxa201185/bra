import React from "react";
import PropTypes from 'prop-types';

import styles from "./SimpleProgressStyles.scss";

class SimpleProgressView extends React.Component {
  static propTypes = {
    icon: PropTypes.func,
    color: PropTypes.string,
    value: PropTypes.number.isRequired,
  };

  state = {
    value: 0,
  };

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.setState({ value: this.props.value });
    }, 500);
  }

  componentDidUpdate() {
    if (this.props.value !== this.state.value) {
      this.setState({value: this.props.value});
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { value } = this.state;
    const { color, icon } = this.props;
   const Icon = icon;
    return (
      <div className={styles.progressBarContainer}>
        { icon && <div className={styles.progressIcon}><Icon/></div>}
        <div className={styles.progressBar}>
          <div className={styles.progressLine} style={{width: `${value}%`, backgroundColor: `${color}`}}>
          </div>
        </div>
        <span className={styles.progressValue}>{value + '%'}</span>
      </div>
    );
  }
}

export default SimpleProgressView;

