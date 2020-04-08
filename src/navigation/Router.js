import React from 'react';
import {connect} from 'react-redux';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';

import {
  LoginContainer,
  ForceLoginContainer,
  GuestLoginContainer,
  Dashboard,
  RegistrationContainer,
  ForgotPassword,
  ChangePassword,
  WorldView,
  ExpertPortfolio,
  DeepPortfolio,
  ExpressPortfolio,
  Interests,
  Lifestyle,
  AfterRegistration,
  RecommendedPortfolio,
  CurrentPortfolio,
  Library,
  MemberBenefits,
  Article,
  DiscussionBoard,
  Discussion,
  Settings,
  ReferFriend,
  VerificationContainer,
  InviteCheckMailContainer,
  PortfolioCreateContainer,
} from '../components/pages';

import * as ROUTES from './routes';
import MainLayout from "../components/MainLayout/MainLayout";

// eslint-disable-next-line
const RouterComponent = ({token}) => {
  const loginedConfig = [
    {
      id: 'dashboard',
      path: ROUTES.DASHBOARD,
      component: Dashboard,
      exact: true,
    },
    {
      id: 'world-view',
      path: ROUTES.WORLD_VIEW,
      component: WorldView,
      exact: true,
    },
    {
      id: 'expert-portfolio',
      path: ROUTES.EXPERT_PORTFOLIO,
      component: ExpertPortfolio,
      exact: true,
    },
    {
      id: 'deep-portfolio',
      path: ROUTES.DEEP_PORTFOLIO,
      component: DeepPortfolio,
      exact: true,
    },
    {
      id: 'express-portfolio',
      path: ROUTES.EXPRESS_PORTFOLIO,
      component: ExpressPortfolio,
      exact: true,
    },
    {
      id: 'interests',
      path: ROUTES.INTERESTS,
      component: Interests,
    },
    {
      id: 'lifestyle',
      path: ROUTES.LIFESTYLE,
      component: Lifestyle,
      exact: true,
    },
    {
      id: 'after-registration',
      path: ROUTES.AFTER_REGISTRATION,
      component: AfterRegistration,
      exact: true,
      withoutLayout: true,
    },
    {
      id: 'recommended-portfolio',
      path: ROUTES.RECOMMENDED_PORTFOLIO,
      component: RecommendedPortfolio,
      exact: true,
    },
    {
      id: 'current-portfolio',
      path: ROUTES.CURRENT_PORTFOLIO,
      component: CurrentPortfolio,
      exact: true,
    },
    {
      id: 'library',
      path: ROUTES.LIBRARY,
      component: Library,
      exact: true,
    },
    {
      id: 'member-benefits',
      path: ROUTES.MEMBER_BENEFITS,
      component: MemberBenefits,
      exact: true,
    },
    {
      id: 'discussion-board',
      path: ROUTES.DISCUSSION_BOARD,
      component: DiscussionBoard,
      exact: true,
    },
    {
      id: 'article',
      path: ROUTES.ARTICLE,
      component: Article,
      exact: true,
    },
    {
      id: 'settings',
      path: ROUTES.SETTINGS,
      component: Settings,
      exact: true,
    },
    {
      id: 'discussion',
      path: ROUTES.DISCUSSION,
      component: Discussion,
      exact: true,
    },
    {
      id: 'refer-friend',
      path: ROUTES.REFER_FRIEND,
      component: ReferFriend,
      exact: true,
    },
    {
      id: 'registration-portfolio',
      path: ROUTES.PORTFOLIO,
      component: PortfolioCreateContainer,
      exact: true,
    },
    {
      id: 'account-verification',
      path: ROUTES.ACCOUNT_VERIFICATION,
      component: VerificationContainer,
      exact: true,
      withoutLayout: true,
    },
  ];
  const notLoginedConfig = [
    {
      id: 'login',
      path: ROUTES.LOGIN,
      component: LoginContainer,
      exact: true,
    },
    {
      id: 'guest-login',
      path: ROUTES.GUEST_LOGIN,
      component: GuestLoginContainer,
      exact: true,
    },
    {
      id: 'registration',
      path: ROUTES.REGISTRATION,
      component: RegistrationContainer,
      exact: true,
    },
    {
      id: 'forgot-password',
      path: ROUTES.FORGOT_PASSWORD,
      component: ForgotPassword,
      exact: true,
    },
    {
      id: 'change-password',
      path: ROUTES.CHANGE_PASSWORD,
      component: ChangePassword,
      // exact: true,
    },
    {
      id: 'account-verification',
      path: ROUTES.ACCOUNT_VERIFICATION,
      component: VerificationContainer,
      exact: true,
    },
    {
      id: 'invite-check-mail',
      path: ROUTES.INVITE_CHECK_MAIL,
      component: InviteCheckMailContainer,
      exact: true,
    },
  ];
  const commonConfig = [
    {
      id: 'force_login',
      path: ROUTES.FORCE_LOGIN,
      component: ForceLoginContainer,
      exact: true,
    },
  ];
  const is_login_config = token ? loginedConfig : notLoginedConfig;
  const config = [...is_login_config, ...commonConfig];

  return (
    <Switch>
      {config.map(route => (
        <Route
          key={route.id}
          path={route.path}
          render={routeProps => {
            const Component = route.component;
            if (route.withoutLayout) {
              return <Component {...routeProps}/>;
            }
            if (token && (route.id !== 'force_login')) {
              return (<MainLayout><Component/></MainLayout>);
            }
            return <Component {...routeProps}/>;
          }
          }
          exact={!!route.exact}
        />
      ))}
      <Redirect to={{pathname: token ? ROUTES.DASHBOARD : ROUTES.LOGIN}}/>
    </Switch>
  );
};

const mapStateToProps = ({auth: {token}}) => ({
  token: token,
});

export default withRouter(connect(mapStateToProps)(RouterComponent));
