import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import LifestyleView from './LifestyleView';
import {getQuestions, setAnswers} from '../../../store/lifestyle/lifestyleActions';
import { OopsView } from "../../common";
import { globals } from "../../../store/globals";
import {showAlert} from "../../../store/alert/alertActions";
import {RECOMMENDED_PORTFOLIO} from "../../../navigation/routes";
import RouteLeavingModal
  from "../../common/RouteLeavingModal/RouteLeavingModal";

import {withHandlers} from "../PortfolioCreate/withHandlers";

class LifestyleContainer extends Component {

  state = {
    currentStep: 1,
  };

  componentDidMount() {
    this.props.getQuestions();
    console.log('componentDidMount');

    const navState = globals.history.location.state;
    if (navState && navState.step) {
      this.setState({currentStep: navState.step});
    }
  }

  changeStep = navBtn => {
    const {currentStep} = this.state;
    const {answers} = this.props;
    if (Object.values(answers).length) {
      this.submitAnswers();
    }
    if (navBtn === 'next' && currentStep < 3) {
      this.setState({currentStep: currentStep+1});
    } else if (navBtn === 'prev' && currentStep !== 1) {
      this.setState({currentStep: currentStep-1});
    }
    window.scrollTo(0,0);
  };

  submitAnswers = isLastStep => {
    const {answers} = this.props;

    if (Object.values(answers).length) {
      this.props.setAnswers(answers, () => {
        this.props.resetAnswers();
        if (isLastStep) {
          this.navToButton(RECOMMENDED_PORTFOLIO);
        }
      });
    } else {
      if (isLastStep) {
        this.navToButton(RECOMMENDED_PORTFOLIO);
      }
    }
  };

  navTo = route => e => {
    e.preventDefault();
    globals.history.push(route);
  };

  navToButton = route => {
    globals.history.push(route);
  };

  shouldBlockNavigation = location => {
    if ((Object.values(this.props.answers).length)) {
      if (location.pathname !== '/lifestyle') {
        return true;
      }
    }
    return false;
  };

  render() {
    const {questionsDataStatus, questions, answers, radioHandler, inputHandler, inputsHandler, checkboxHandler} = this.props;
    const {currentStep} = this.state;
    if (questionsDataStatus.fail) {
      return <OopsView/>;
    }

    return (
      <>
        <RouteLeavingModal
          when={!!Object.values(answers).length}
          navigate={this.navToButton}
          shouldBlockNavigation={this.shouldBlockNavigation}
          title={'Warning'}
          msg={'Your answers were not saved. Please use the Next or Prev buttons to save your Lifestyle.'}
        />
        <LifestyleView
          changeStep={this.changeStep}
          radioHandler={radioHandler}
          inputHandler={inputHandler}
          inputsHandler={inputsHandler}
          checkboxHandler={checkboxHandler}
          submitAnswers={this.submitAnswers}
          navTo={this.navTo}
          questionsData={questions}
          questionsDataStatus={questionsDataStatus}
          currentStep={currentStep}
          answers={answers}
        />
      </>
    );
  }

}

LifestyleContainer.propTypes = {
  //actions
  getQuestions: PropTypes.func.isRequired,
  setAnswers: PropTypes.func.isRequired,
  showAlert: PropTypes.func.isRequired,
  //data
  questionsData: PropTypes.object,
  questionsDataStatus: PropTypes.object,
};

const mapStateToProps = ({lifestyle: {questionsData, questionsDataStatus}}) => ({
  //questionsData: selectQuestions(questionsData),
  questionsData: questionsData,
  questionsDataStatus,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getQuestions: getQuestions.request,
  setAnswers: setAnswers.request,
  showAlert,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withHandlers(LifestyleContainer));
