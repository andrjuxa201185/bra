import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from "prop-types";
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from "redux";
import SideBarView from './SideBarView';
import { getUserProfile } from '../../../store/userProfile/userProfileActions';
import { logout } from "../../../store/auth/authActions";
import {getRouteWV} from '../../../helpers/common';
import {
  DASHBOARD,
  DISCUSSION_BOARD,
  INTERESTS,
  LIBRARY,
  LIFESTYLE,
  RECOMMENDED_PORTFOLIO,
  WORLD_VIEW,
} from "../../../navigation/routes";
import DashBoardIcon from "../../../assets/images/icons/dashboard-icon.svg";
import WorldViewIcon from "../../../assets/images/icons/world-view-icon.svg";
import InterestsIcon from "../../../assets/images/icons/interests-icon.svg";
import LifestyleIcon from "../../../assets/images/icons/lifestyle-icon.svg";
import DiscussionIcon from "../../../assets/images/icons/discussion-icon.svg";
import LibraryIcon from "../../../assets/images/icons/library-icon.svg";
import PortfolioIcon from "../../../assets/images/icons/portfolio-icon.svg";
import { globals } from '../../../store/globals';

class SideBarContainer extends Component {

  state = {
    currentRoute: '',
    navItems: [
      {
        text: 'dashboard',
        alias: 'dashboard',
        linkTo: DASHBOARD,
        icon: DashBoardIcon,
      },
      {
        text: 'world view',
        alias: 'world_view',
        linkTo: WORLD_VIEW,
        icon: WorldViewIcon,
      },
      {
        text: 'interests',
        alias: 'interests',
        linkTo: INTERESTS,
        icon: InterestsIcon,
      },
      {
        text: 'lifestyle',
        alias: 'lifestyle',
        linkTo: LIFESTYLE,
        icon: LifestyleIcon,
      },
      {
        text: 'discussion board',
        alias: 'discussion_board',
        linkTo: DISCUSSION_BOARD,
        icon: DiscussionIcon,
      },
      {
        text: 'library',
        alias: 'library',
        linkTo: LIBRARY,
        icon: LibraryIcon,
      },
      {
        text: 'recommended portfolio',
        alias: 'recommended_portfolio',
        linkTo: RECOMMENDED_PORTFOLIO,
        icon: PortfolioIcon,
      },
    ],
  };

  componentDidMount() {
    const {profileDataStatus, getUserProfile} = this.props;
    if (!profileDataStatus.loaded) {
      getUserProfile();
    }
  }

  // static getDerivedStateFromProps(props, state) {
  //   const {navItems} = state;
  //
  //   navItems[1] = {
  //     text: 'world view',
  //     linkTo: getRouteWV(props.currentQuiz),
  //     icon: WorldViewIcon,
  //   };
  //   return {
  //     ...state,
  //     navItems,
  //   };
  // }

  logout = () => {
    this.props.logout();
  };
  
  navTo = route => e => {
    e.preventDefault();
    const {getUserProfile} = this.props;
    if (route.alias === 'world_view') {
      getUserProfile(currentQuiz => {
        // this.setState({currentRoute: route.alias});
        globals.history.push(getRouteWV(currentQuiz));
      });
      return null;
    }
    //this.setState({currentRoute: route.alias});
    globals.history.push(route.linkTo);

  };

  render() {
    const {navItems} = this.state;
    const {headerbar} = this.props;

    return (
      <SideBarView
        headerbar={headerbar}
        navItems={navItems}
        logout={this.logout}
        navTo={this.navTo}
      />
    );
  }
}

SideBarContainer.propTypes = {
  profileDataStatus: PropTypes.object.isRequired,
  currentQuiz: PropTypes.string,
  headerbar:PropTypes.bool,
  //actions
  logout: PropTypes.func.isRequired,
  getUserProfile: PropTypes.func.isRequired,
};

const mapStateToProps = ({userProfile: {dataStatus, data}}) => ({
  profileDataStatus: dataStatus,
  currentQuiz: data ? data.current_quiz : null,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  logout,
  getUserProfile: getUserProfile.request,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SideBarContainer);
