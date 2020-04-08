import React from "react";
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import styles from "./LinearProgressStyles.scss";
import UpdateIcon from '../../../assets/images/icons/update.svg';
import TickIcon from '../../../assets/images/icons/tick.svg';

const getClassName = type => {
  switch (type) {
    case 'primary':
      return styles.primary;
    case 'secondary':
      return styles.secondary;
    default:
      return styles.primary;
  }
};

class LinearProgressView extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    value: PropTypes.number.isRequired,
    progressTitle: PropTypes.string,
    status: PropTypes.bool,
    centerText: PropTypes.bool,
    updateLink: PropTypes.string,
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
    const { type, progressTitle, status, centerText, updateLink } =this.props;
    return (
      <div className={`${styles.progressBarContainer} ${getClassName(type)}`}>
        {<span className={styles.progressTitle}>{progressTitle}</span>}
        <div className={styles.progressBar}>
          <div className={styles.progressLine} style={{width: `${value}%`}}>
            <div className={styles.progressLineContent}>
              {(!!value) && (<span className={styles.progressValue}>{value + '%'}</span>)}
            </div>
          </div>
        </div>
        <div className={`${styles.progressInfo} ${centerText && styles.progressInfoCenter}`}>
          <div className={styles.progressLabel}>
            You have completed
            <span> {value}% </span>
            of this questionare
          </div>
          {status && (
            (value === 100) ?
              <div className={styles.progressStatus}>
                <TickIcon className={styles.progressStatusIcon}/>
                <span>Complete</span>
              </div>
              :
              <div className={styles.progressStatus}>
                <UpdateIcon className={styles.progressStatusIcon}/>
                {updateLink && <Link to={updateLink} className={styles.progressLink}>Update</Link>}
              </div>
          )
          }
        </div>
      </div>
    );
  }
}

export default LinearProgressView;

