import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import {showAlert} from '../../../../store/alert/alertActions';

class SettingsCloseAccount extends Component{

  onClick = e => {
    e.preventDefault();
    this.props.showAlert({title: 'Attention!', msg: 'Available within 5 Business Days of Investing'});
  };

  render () {
    const {styles} = this.props;

    return (
      <div className='panel'>
        <div className={styles.closeAccount}>
          <h3 className='mb-4'>Close Account</h3>
          <div className={styles.closeAccount__text}>
            We are sorry to hear that you wish to close your Brains account. If
            there are any issues or concerns that we can help you with, please
            fell free to drop us a note at support@brains.money. If you still
            want to close your account, we will sell your investments and the
            balance will be transferred back to your funding source you connected
            to Brains within two weeks. Read more
            <a href='#' onClick={this.onClick}> about closing your account.</a>
          </div>
          <div className={styles.closeAccount__footer}>
            <div className='row'>
              <div className='col-md-3'>
                <b>Brains</b>
              </div>
              <div className='col-md-3'>
                <span className={styles.closeAccount__text_grey}>
                  Personal Brokerage Account
                </span>
              </div>
              <div className='col-md-6 d-flex justify-content-end'>
                <b><a href='#' onClick={this.onClick}>Close Account</a></b>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  }
}

SettingsCloseAccount.propTypes = {
  styles: PropTypes.object.isRequired,
  showAlert: PropTypes.func.isRequired,
};

// const mapStateToProps = ({userProfile: {data}}) => ({
//   data,
// });
//
const mapDispatchToProps = dispatch => bindActionCreators({
  showAlert,
}, dispatch);

export default connect(null, mapDispatchToProps)(SettingsCloseAccount);
