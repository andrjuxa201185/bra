import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import {getBankAccount} from '../../../../store/folio/folioActions';
import {Spinner} from '../../../controls';
import styles from '../SettingsStyles.scss';

class BankAccount extends Component{

  componentDidMount() {
    this.props.getBankAccount();
  }

  render () {
    const {bankAccount, bankAccountStatus} = this.props;

    if (bankAccountStatus.loading) {
      return <Spinner size='lg'/>;
    }

    if (bankAccount && Object.values(bankAccount).length) {
      return (
        <div className='panel'>
          <div className={styles.bankAccountContainer}>
            <h4 className={styles.bankAccount__title}>Linked Account</h4>
            <div className={styles.bankAccount}>
              <h4 className={styles.bankAccount__name}>{bankAccount.bank_name}</h4>
              <div className={styles.bankAccount__info}>
                <div className={styles.bankAccount__text}>{bankAccount.type}</div>
                <div className={styles.bankAccount__text}>{bankAccount.number}</div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className='stub__text'>
          Once you make investment here will be displayed your bank account details.
        </div>
      );
    }
  }
}

BankAccount.propTypes = {
  //actions
  getBankAccount: PropTypes.func.isRequired,
  //data
  bankAccount: PropTypes.object,
  bankAccountStatus: PropTypes.object,
};

const mapStateToProps = ({folioReducer: {bankAccount, bankAccountStatus}}) => ({
  bankAccount,
  bankAccountStatus,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getBankAccount: getBankAccount.request,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BankAccount);
