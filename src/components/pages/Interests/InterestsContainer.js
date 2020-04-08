import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import {bindActionCreators} from "redux";
import {getInterests, updateInterests, updateWeight} from '../../../store/interests/interestsActions';
import InterestsView from './InterestsView';
import {getUrlParam} from '../../../helpers/common';
import {selectHasCheckedInterest} from '../../../helpers/selectors';
import { globals } from "../../../store/globals";
import RouteLeavingModal from "../../common/RouteLeavingModal/RouteLeavingModal";

const tabList = [
  '1. Individual Companies',
  '2. Special Interest Funds',
  '3. Travel Funds',
];

const tabColor = {
  0: 'red',
  1: 'orange',
  2: 'blue',
};

class InterestsContainer extends React.Component {
  static propTypes = {
    tabList: PropTypes.array.isRequired,
    dataStatus: PropTypes.object.isRequired,
    interestsData: PropTypes.object,
    getInterests: PropTypes.func.isRequired,
    updateInterests: PropTypes.func.isRequired,
    responseId: PropTypes.number,
    interestsFundsWeight: PropTypes.number,
    updateWeight: PropTypes.func,
    isShow: PropTypes.bool,
    hasCheckedInterest: PropTypes.bool,
  };

  state = {
    weight: this.props.interestsFundsWeight,
    isChangeWight: false,
    newWeightSent: false,
  };

  componentDidMount() {
    const responseId = getUrlParam(2);
    this.props.getInterests(responseId ? responseId : null);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.hasCheckedInterest !== this.props.hasCheckedInterest) {
      this.setState({weight: this.props.interestsFundsWeight, isChangeWight: false, newWeightSent: false});
    }
  }

  handleFormData = checkedItem => {
    this.props.updateInterests(checkedItem, this.props.responseId);
  };

  handleSliderChange = weight => {
    const {interestsFundsWeight} = this.props;
    this.setState({
      weight,
      isChangeWight: weight !== interestsFundsWeight,
      newWeightSent: false,
    });
  };

  navTo = route => e => {
    e.preventDefault();
    globals.history.push(route);
  };

  handleWeightSend = () => {
    if (this.state.weight !== this.props.interestsFundsWeight) {
      this.props.updateWeight({...this.state}, this.props.responseId, () => {
        this.setState({
          isChangeWight: false,
          newWeightSent: true,
        });
        setTimeout(() => {
          this.setState({
            newWeightSent: false,
          });
        }, 1000);
      });
    }
  };

  shouldBlockNavigation = location => {
    if (location.pathname !== '/interests') {
      return true;
    }
    return false;
  };

  render() {
    const { tabList, interestsData, dataStatus, isShow, hasCheckedInterest } = this.props;

    return (
      <>
        <InterestsView
          tabList={tabList}
          tabColor={tabColor}
          handleFormData={this.handleFormData}
          dataStatus={dataStatus}
          interestsData={interestsData}
          isShow={isShow}
          sliderValue={this.state.weight}
          onSliderChange={this.handleSliderChange}
          onWeightSend={this.handleWeightSend}
          isChangeWight={this.state.isChangeWight}
          newWeightSent={this.state.newWeightSent}
          hasCheckedInterest={hasCheckedInterest}
          navTo={this.navTo}
        />
        <RouteLeavingModal
          when={this.state.isChangeWight || !this.state.weight && hasCheckedInterest}
          shouldBlockNavigation={this.shouldBlockNavigation}
          title={'Notification'}
          msg={'Please select a percentage for the amount you wish to invest in your Interests.'}
        />
      </>
    );
  }
}

const mapStateToProps = ({ interests: {
  interestsData,
  responseId,
  interestsDataStatus,
  interestsFundsWeight,
  isShow,
}}) => ({
  tabList,
  interestsData,
  responseId,
  dataStatus: interestsDataStatus,
  interestsFundsWeight,
  isShow,
  hasCheckedInterest: selectHasCheckedInterest(interestsData),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getInterests: getInterests.request,
  updateInterests: updateInterests.request,
  updateWeight: updateWeight.request,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(InterestsContainer);
