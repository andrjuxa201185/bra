import React from 'react';
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import {globals} from "../../../store/globals";
import {
  selectBrainsFunds, selectData, selectInterestsData,
} from "../../../store/portfolio/portfolioSelectors";
import {
  getCurrentPortfolio,
} from "../../../store/currentPortfolio/currentPortfolioActions";
import { transferBuy } from '../../../store/transferBuy/transferBuyActions';
import { sellTransfer } from '../../../store/sellTransfer/sellTransferActions';
import { sellPortfolio } from '../../../store/sellPortfolio/sellPortfolioActions';
import { buyPortfolio } from '../../../store/buyPortfolio/buyPortfolioActions';

import {showAlert} from "../../../store/alert/alertActions";
import Modal from './../../common/Modal/ModalView';
import CurrentPortfolioView from "./CurrentPortfolioView";
import {Input, Select, Spinner, Textarea} from "../../controls";
import styles from "../../common/Modal/ModalStyles.scss";
import Button from "../../controls/Button/ButtonView";
import NumberFormat from "react-number-format";
import InvestMoreModal from "../../common/InvestMoreModal/InvestMoreModal";
import {CirculsQuestion} from "../../common";
import {cashAccountInvest, cashAccountSell} from "../../../store/cashAccount/cashAccountActions";

const initialRadioData = [
  {
    id: 1,
    name: 'Sell Funds to Cash Account',
    value: 'sell',
    checked: true,
  },
  {
    id: 2,
    name: 'Invest Cash in Current Portfolio',
    value: 'current',
    checked: false,
  },
];

class CurrentPortfolioContainer extends React.Component {
  state = {
    amount: '',
    isSellModalOpen: false,
    isBuyModalOpen: false,
    isCashModalOpen: false,
    radioData: initialRadioData,
  };

  componentDidMount() {
    const {getCurrentPortfolio} = this.props;
    const {state} = globals.history.location;

    getCurrentPortfolio();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.dataStatusCashAccount.loaded !== this.props.dataStatusCashAccount.loaded && this.props.dataStatusCashAccount.loaded) {
      this.handleHideCashModal();
      this.props.showAlert({title: 'Success!', msg: 'Successfully sent!'});
    }
  }

  navTo = route => e => {
    e.preventDefault();
    globals.history.push(route);
  };

  handleClickBuy = () => {
    this.setState({isBuyModalOpen: true});
  };

  handleHideBuyModal = () => {
    this.setState({isBuyModalOpen: false});
  };

  handleClickSell = () => {
    this.setState({isSellModalOpen: true});
  };

  handleClickCashAccount = () => {
    this.setState({isCashModalOpen: true});
  };

  handleHideCashModal = data => {
    this.setState({isCashModalOpen: false, amount: '', radioData: initialRadioData });
  };

  handleHideSellModal = () => {
    this.setState({isSellModalOpen: false});
  };

  handleSellTransfer = () => {
    if (this.state.amount) {
      this.props.sellTransfer({amount: this.state.amount});
    }
    this.setState({isSellModalOpen: false, amount: ''});
  };

  onAmountChange = value => {
    this.setState({amount: value});
  };

  handleSelect = answerId => e => {
    e.preventDefault();
    let newRadioData = this.state.radioData;
    for (let item in newRadioData) {
      newRadioData[item].checked = false;
    }
    const selectedItem = newRadioData.find(radio => radio.id === answerId);
    if (selectedItem) {
      selectedItem.checked = true;
      this.setState({ radioData: newRadioData });
    }
  };

  handleSubmitCash = () => {
    const {amount, radioData} = this.state;
    if (amount) {
      const selectedItem = radioData.find(item => item.checked);
      if (selectedItem.value === initialRadioData[0].value) {
        this.props.cashAccountSell({amount: +this.state.amount});
      }
      if (selectedItem.value === initialRadioData[1].value) {
        this.props.cashAccountInvest({amount: +this.state.amount});
      }
    }
    this.setState({ amount: '', radioData: initialRadioData});
  };

  render() {
    const {
      fundsData, interestData, total_amount, bf_contribution,
      dataStatus,if_contribution, is_tailored,
      isPending,
      isRebalance,
      cash_balance,
      next_trading_window_at,
      isHoldingsPage,
      sellPortfolio
    } = this.props;
    return (
      <>
      <CurrentPortfolioView
        nextTradingWindowAt={next_trading_window_at}
        isPending={isPending}
        fundsData={fundsData}
        interestData={interestData}
        cash_balance={cash_balance}
        total_amount={total_amount}
        dataStatus={dataStatus}
        navTo={this.navTo}
        onClickBuy={this.handleClickBuy}
        onClickSell={this.handleClickSell}
        isHoldingsPage={isHoldingsPage}
        sellPortfolio={sellPortfolio}
        isCompleteWorldView={this.props.isCompleteWorldView}
        onCashAccount={this.handleClickCashAccount}
      />
        <InvestMoreModal open={this.state.isBuyModalOpen} onClose={this.handleHideBuyModal}/>
        <Modal
          title={'Enter an Amount'}
          isOpen={this.state.isSellModalOpen}
          closeModal={this.handleHideSellModal}
        >
          <div className='mb-4'>
            <NumberFormat
              value={this.state.amount}
              thousandSeparator
              prefix={'$'}
              placeholder='$'
              // error={errors['tgj']}
              customInput={Input}
              onValueChange={({value}) => this.onAmountChange(value)}
            />
          </div>
          <div className='d-flex justify-content-center'>
            <div className={styles.button}>
              <Button
                onClick={this.handleSellTransfer}
                title={'Save'}
                size={'md'}
                transparent
              />
            </div>
          </div>
        </Modal>
        <Modal
          title={'Cash Account'}
          isOpen={this.state.isCashModalOpen}
          closeModal={this.handleHideCashModal}
        >
          {
            this.props.dataStatusCashAccount.loading ?
              <Spinner size='lg'/> :
              <>
                <div className='mb-4'>
                  <h3 className='mb-4'>Enter Cash to Transfer:</h3>
                  <NumberFormat
                    value={this.state.amount}
                    thousandSeparator
                    prefix={'$'}
                    placeholder='$'
                    customInput={Input}
                    onValueChange={({value}) => this.onAmountChange(value)}
                  />
                </div>
                <div className='mb-4'>
                  <h3 className='mb-4'>Select transfer:</h3>
                  <CirculsQuestion
                    options={this.state.radioData}
                    onClick={this.handleSelect}
                    secondary
                  />
                </div>
                <div className='d-flex justify-content-center'>
                  <div className={styles.button}>
                    <Button
                      onClick={this.handleSubmitCash}
                      title={'Submit'}
                      size={'md'}
                      transparent
                    />
                  </div>
                </div>
              </>
          }
        </Modal>
      </>
    );
  }
}

const mapStateToProps = ({
                           currentPortfolio: {data, dataStatus, is_pending, is_rebalance, is_tailored, total_amount, next_trading_window_at },
                           cashAccount,
                           userProfile,
}) => ({
  fundsData: data && selectBrainsFunds(data.brains_funds),
  interestData: data && selectInterestsData(data),
  total_amount,
  next_trading_window_at,
  cash_balance: data && data.cash_balance,
  bf_contribution: selectData({data, prop: 'bf_contribution'}),
  if_contribution: selectData({data, prop: 'if_contribution'}),
  portfolio_id: selectData({data, prop: 'portfolio_id'}),
  is_tailored,
  dataStatus,
  dataStatusCashAccount: cashAccount.dataStatus,
  isPending: is_pending,
  isRebalance: is_rebalance,
  isCompleteWorldView:  userProfile.data && userProfile.data.wv_is_complete,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getCurrentPortfolio: getCurrentPortfolio.request,
  transferBuy: transferBuy.request,
  sellTransfer: sellTransfer.request,
  buyPortfolio: buyPortfolio.request,
  sellPortfolio: sellPortfolio.request,
  cashAccountSell: cashAccountSell.request,
  cashAccountInvest: cashAccountInvest.request,
  showAlert,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CurrentPortfolioContainer);
