import React from 'react';
import connect from "react-redux/es/connect/connect";
import RecommendedPortfolioView from "./RecommendedPortfolioView";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { getPortfolio, updateFunds, updatePortfolio, resetPortfolio } from '../../../store/portfolio/portfolioActions';
import { rebalancePortfolio } from '../../../store/rebalancePortfolio/rebalancePortfolioActions';
import { updateWeight } from '../../../store/interests/interestsActions';
import { showAlert } from '../../../store/alert/alertActions';
import {
  selectBrainsFunds,
  selectData,
  selectAllowedPercentage,
} from '../../../store/portfolio/portfolioSelectors';
import { setFundData, getTotalPercentage } from '../../../helpers/fundValueCalculator';
import {globals} from "../../../store/globals";
// import RouteLeavingModal
//   from "../../common/RouteLeavingModal/RouteLeavingModal";
import { PORTFOLIO } from '../../../navigation/routes';
import InvestMoreModal from '../../common/InvestMoreModal/InvestMoreModal';

class RecommendedPortfolioContainer extends React.Component {
  static propTypes = {
    //actions
    getPortfolio: PropTypes.func.isRequired,
    updateFunds: PropTypes.func.isRequired,
    updateWeight: PropTypes.func.isRequired,
    updatePortfolio: PropTypes.func.isRequired,
    resetPortfolio: PropTypes.func.isRequired,
    showAlert: PropTypes.func.isRequired,
    //data
    fundsData: PropTypes.object,
    bf_contribution: PropTypes.number,
    portfolio_id: PropTypes.number,
    if_contribution: PropTypes.number,
    dataStatus: PropTypes.object,
    is_all_out: PropTypes.bool,
    is_tailored: PropTypes.bool,
    isAllowedPercentage: PropTypes.bool,
    current_portfolio: PropTypes.string,
  };

  state = {
    // isTailoredChanged: false,
    currentTab: 0,
    currentTotalPercentage: null,
    isModalOpen: false,
  };

  static getDerivedStateFromProps(props) {
    if (props.fundsData) {
      return {
        currentTotalPercentage: getTotalPercentage(props.fundsData),
      };
    }
    return null;
  }

  componentDidMount() {
    const {getPortfolio} = this.props;
    const {state} = globals.history.location;
    // if (state) {
    //   data.currentQuiz = state.currentQuiz;
    // }

    const data = state ? state.quizType : null;
    getPortfolio(data);
  }

  // _tailoredChanged = () => {
  //   const {isTailoredChanged} = this.state;
  //   if (!isTailoredChanged) {
  //     this.setState({isTailoredChanged: true});
  //   }
  // };

  navTo = route => e => {
    e.preventDefault();
    globals.history.push(route);
  };

  // new *********************

  handleChangeFundSlider = (val, fundId) => {
    const {
      fundsData, updateFunds, bf_contribution,
      portfolio_id,
    } = this.props;

    const {newFundsData, totalPercentage} = setFundData(fundId, val, fundsData, bf_contribution);

    updateFunds({newFundsData, totalPercentage, portfolio_id});
    this.setState({currentTotalPercentage: totalPercentage});
  };

  handleAfterChangeFundSlider = () => {
    const {currentTotalPercentage} = this.state;
    const {
      fundsData, bf_contribution,
      portfolio_id, updatePortfolio,
    } = this.props;

    if (bf_contribution === currentTotalPercentage) {
      updatePortfolio(fundsData, portfolio_id);
    }
  };

  // new *********************

  // handleClickFundControl = (isIncr, fundId) => () => {
  //   const {fundsData, updateFunds} = this.props;
  //   this._tailoredChanged();
  //   updateFunds(calculate(isIncr, fundId, {...fundsData}));
  // };

  // handleLockFund = (isLocked, fundId) => {
  //   const {fundsData, updateFunds} = this.props;
  //   const newData = {...fundsData};
  //   this._tailoredChanged();
  //   newData[fundId].is_locked = isLocked;
  //   updateFunds(newData);
  // };

  // handleSubmit = () => {
  //   const {updatePortfolio, fundsData, portfolio_id} = this.props;
  //   updatePortfolio(fundsData, portfolio_id);
  // };

  handleReset = () => {
    const {portfolio_id, resetPortfolio, bf_contribution} = this.props;
    resetPortfolio(portfolio_id, () => {
      this.setState({currentTotalPercentage: bf_contribution});
    });
  };

  changeTabHandler = currentTab => {
    this.setState({currentTab});
  };

  handleRebalance = is_tailored => {
    this.props.rebalancePortfolio({is_tailored});
  };

  // shouldBlockNavigation = location => {
  //   if (this.state.isTailoredChanged) {
  //     if (location.pathname !== '/recommended-portfolio') {
  //       return true;
  //     }
  //   }
  //   return false;
  // };

  onClickInvest = isTailored => () => {
    const {isAllowedPercentage} = this.props;
    if (isTailored && !isAllowedPercentage) {
      // showAlert({title: 'Warning!', msg: 'Adjusted funds are over or less of 100%'});
      return null;
    }
    globals.history.push(PORTFOLIO);
  };

  handleClickInvestMore = () => {
    this.setState({isModalOpen: true});
  };

  handleHideModal = () => {
    this.setState({isModalOpen: false});
  };

  render() {
    const {
      fundsData, bf_contribution,
      dataStatus,if_contribution,
      is_all_out, is_tailored, current_portfolio,
      isAllowedPercentage,
      isPending,
      isRebalance,
    } = this.props;
    const {currentTotalPercentage} = this.state;
    // console.log('currentTotalPercentage', currentTotalPercentage);

    return (
      <>
        <RecommendedPortfolioView
          currentTab={this.state.currentTab}
          changeTab={this.changeTabHandler}
          dataStatus={dataStatus}
          fundsData={fundsData}
          handleChangeFundSlider={this.handleChangeFundSlider}
          handleAfterChangeFundSlider={this.handleAfterChangeFundSlider}
          handleReset={this.handleReset}
          bf_contribution={bf_contribution}
          if_contribution={if_contribution}
          is_all_out={is_all_out}
          current_portfolio={current_portfolio}
          is_tailored={is_tailored}
          currentTotalPercentage={currentTotalPercentage}
          isAllowedPercentage={isAllowedPercentage}
          // navTo={this.navTo}
          onClickInvest={this.onClickInvest}
          isPending={isPending}
          isRebalance={isRebalance}
          onRebalance={this.handleRebalance}
          onClickInvestMore={this.handleClickInvestMore}
          rebalanceDataStatus={this.props.rebalanceDataStatus}
        />
        <InvestMoreModal open={this.state.isModalOpen} onClose={this.handleHideModal}/>
        {/*<RouteLeavingModal*/}
          {/*when={isTailoredChanged}*/}
          {/*shouldBlockNavigation={this.shouldBlockNavigation}*/}
          {/*title={'Warning'}*/}
          {/*msg={'Please click the Save button to save your tailored selections before proceeding.'}*/}
        {/*/>*/}
      </>
    );
  }
}

const mapStateToProps = ({ portfolio: {data, dataStatus, fundsData, is_pending, is_rebalance},
                           rebalancePortfolio,
}) => ({
  fundsData: selectBrainsFunds(fundsData),
  isAllowedPercentage: selectAllowedPercentage({data, fundsData}),
  bf_contribution: selectData({data, prop: 'bf_contribution'}),
  if_contribution: selectData({data, prop: 'if_contribution'}),
  portfolio_id: selectData({data, prop: 'portfolio_id'}),
  is_all_out: selectData({data, prop: 'is_all_out'}),
  is_tailored: selectData({data, prop: 'is_tailored'}),
  current_portfolio: selectData({data, prop: 'current_portfolio'}),
  dataStatus,
  isPending: is_pending,
  isRebalance: is_rebalance,
  rebalanceData: rebalancePortfolio.data,
  rebalanceDataStatus: rebalancePortfolio.dataStatus,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getPortfolio: getPortfolio.request,
  updatePortfolio: updatePortfolio.request,
  updateWeight: updateWeight.request,
  resetPortfolio: resetPortfolio.request,
  rebalancePortfolio: rebalancePortfolio.request,
  updateFunds,
  showAlert,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RecommendedPortfolioContainer);
