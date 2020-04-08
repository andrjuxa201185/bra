import React, {Component} from 'react';
import PropTypes from 'prop-types';
import connect from "react-redux/es/connect/connect";
import animateScrollTo from 'animated-scroll-to';
import {EXPRESS_PORTFOLIO, DEEP_PORTFOLIO, EXPERT_PORTFOLIO} from '../../../navigation/routes';
import WorldViewView from './WorldViewView';
import { globals } from "../../../store/globals";
import { getRouteWV } from "../../../helpers/common";

class WorldViewContainer extends Component {

  state = {
    selectedPortfolio: null,
    portfolioTypes: {
      deep_dive: {
        alias: 'deep_dive',
        action: () => globals.history.push(DEEP_PORTFOLIO),
        title: 'Deep Dive Portfolio',
        description: ['Our Brains Deep Dive is the best way to assess your future view of the world to give you the most personalized portfolio on the planet… possibly even the universe! Simply answer a few questions in each of the eight world categories below and we’ll recommend an exciting portfolio just for you. When you are done you can invest right away, or continue with the Interests and Lifestyle questions to create an even more customized portfolio.'],
      },
      express: {
        alias: 'express',
        action: () => globals.history.push(EXPRESS_PORTFOLIO),
        title: 'Express Portfolio',
        description: [
          'If you are short on time now, you can take our Express path. With Express, you just need to answer one question in each of our eight World View categories and then you’re ready to invest!',
          'You can always come back later when you have more time and take the Deep Dive assessment and simply rebalance your portfolio then.',
        ],
      },
      expert: {
        alias: 'expert',
        action: () => globals.history.push(EXPERT_PORTFOLIO),
        title: 'Experts Portfolio',
        description: [
          'Our Experts path is based on our Brains economic and financial experts’ view of the current world climate. They’ve answered all of the Deep Dive questions so you don’t have to!',
          'You will also have an opportunity to personalize your portfolio a bit before you invest, and can even come back after you invest to take more time on the Deep Dive assessment if you want.',
        ],
      },
    },
  };

  componentDidMount() {
    const { currentQuiz } = this.props;
    if (currentQuiz) {
      globals.history.push(getRouteWV(currentQuiz));
    }
  }

  selectPortfolio = type => e => {
    e.preventDefault();
    const {portfolioTypes} = this.state;
    this.setState({selectedPortfolio: portfolioTypes[type]});
    setTimeout(() => {
      animateScrollTo(600);
    });
  };

  navTo = route => e => {
    e.preventDefault();
    globals.history.push(route);
  };

  render() {
    const {selectedPortfolio} = this.state;
    return (
      <WorldViewView
        selectedPortfolio={selectedPortfolio}
        selectPortfolio={this.selectPortfolio}
      />
    );
  }
}

WorldViewContainer.propTypes = {
  currentQuiz: PropTypes.string,
};

const mapStateToProps = ({userProfile: {data}}) => ({
  currentQuiz: data ? data.current_quiz : null,
});


export default connect(mapStateToProps)(WorldViewContainer);
