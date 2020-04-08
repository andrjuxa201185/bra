import React from 'react';
import PropTypes from 'prop-types';

import styles from './ImageProgressStyles.scss';

class ImageProgressView extends React.Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
  };

  state = {
    value: 0,
  };

  componentDidMount() {
    const value = -85 + ((this.props.value-1)* 16.66 * 1.7);
    this.timeout = setTimeout(() => {
      this.setState({ value: value });
    }, 500);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { value } = this.state;
    return (
      <div className={styles.progressBarScale}>
        <div className={styles.progressArrow} style={{transform: `translateX(-50%) rotate(${value}deg)`}}>
        </div>
        <div className={styles.progressValue}>
          {this.props.value}
        </div>
      </div>

    );
  }
}

export default ImageProgressView;

