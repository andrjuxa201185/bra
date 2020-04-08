import React from 'react';
import PropTypes from 'prop-types';
import styles from './CurrentPortfolioStyles.scss';
import {TabNav, SimpleProgress, Button, Tooltip, Spinner} from '../../controls';
import {
  CURRENT_PORTFOLIO, INTERESTS,
  LOGIN,
  RECOMMENDED_PORTFOLIO
} from "../../../navigation/routes";
import {
  Donut, GoToWorldView,
  HoldingsTable, OopsView
} from "../../common";
import {WORLD_VIEW} from '../../../navigation/routes';
import Interests from "./parts/Interests";
import {getChartDataFromFunds} from "../../../helpers/common";

const tabLinks = [
  {title: 'Recommended Portfolio', route: RECOMMENDED_PORTFOLIO, active: false},
  {title: 'Current Portfolio', route: CURRENT_PORTFOLIO, active: true},
];

class CurrentPortfolioView extends React.Component {
  static propTypes = {
    fundsData: PropTypes.object,
    navTo: PropTypes.func.isRequired,
  };

  state = {
    holdingModalShown: false,
  };

  renderContent() {
    const {
      fundsData,
      interestData,
      cash_balance,
      total_amount,
      onClickBuy,
      onClickSell,
      nextTradingWindowAt,
      isPending,
      isHoldingsPage,
      onCashAccount} = this.props;
    const {holdingModalShown} = this.state;

    return (
      <>
        {/*<DropDownInfo title={'How This Page Works'}>*/}
        {/*  <PortfolioExplanation />*/}
        {/*</DropDownInfo>*/}
        <p className={styles.infoBlock__text}>
          Below is a breakdown of the funds and stocks in your current portfolio. You can change
          your fund mix to a different World View/Interests or “Build Your Own” mix, or add more
          money from your bank to invest with the buttons on the left.
        </p>
        <div className='panel'>
          <div className={`d-flex flex-wrap `}>

            <div className={styles.portfolio__col1}>
              <div className={styles.legend}>
                <div className={styles.portfolio__container}>
                  <div className={styles.legend__header}>
                    <div className={styles.title}>Next Available Trading Window</div>
                    <div className={styles.title}>{nextTradingWindowAt}</div>
                  </div>

                  <div className={styles.legend__header}>
                    <div className={styles.title}>Total</div>
                    <div className={styles.title}>
                      {`$${total_amount}`}
                    </div>
                  </div>
                  <div className={'row'}>
                    <>
                      {Object.values(fundsData)
                        .sort((a, b) => a.positionByRecommended - b.positionByRecommended)
                        .map(item => (

                          <div data-tip data-for={item.name} className={styles.legend__row} key={item.id}>
                            <div className={styles.legend__colorWrapper}>
                                      <span className={styles.legend__color} style={{backgroundColor: `${item.color}`}}>
                                      </span>
                              <Tooltip text={item.definition}>
                                <span className={styles.legend__name}>{item.name}</span>
                              </Tooltip>
                            </div>
                            <span className={styles.legend__value}>${item.amount}</span>
                          </div>
                        ))}
                    </>
                  </div>

                  {cash_balance &&
                    <>
                      <div className={styles.legend__header}>
                        <div className={styles.title}>Cash Balances</div>
                      </div>
                      <div className={'row'}>
                      {
                        cash_balance.map(item =>

                          <div data-tip data-for={item.name} className={styles.legend__row} key={item.id}>
                            <div className={styles.legend__colorWrapper}>
                              <span className={styles.legend__color} style={{backgroundColor: `${item.color}`}}></span>
                              <Tooltip text={item.definition}>
                                <span className={`${styles.legend__name} ${styles.legend__balance}`}>{item.name}</span>
                              </Tooltip>
                            </div>
                            <span className={`${styles.legend__value} ${styles.legend__balance}`}>${item.amount}</span>
                          </div>
                        )
                      }
                      </div>
                    </>
                  }

                </div>
              </div>
              <Interests isEdit={false} data={interestData} />
            </div>

            <div className={styles.portfolio__col2}>
              <div className={styles.portfolio__container}>
                <Donut
                  chartData={getChartDataFromFunds(fundsData, 'recommended')}
                  highlightSliceById={1}
                />
              </div>
              <div className={styles.buttons}>
                <div className={styles.portfolio__container}>
                  <div className={styles.legend__header}>
                    <div className={`${styles.blueTitle}`}>Banking & Investing</div>
                  </div>
                  <div className={styles.buttons__group}>
                    <Button
                      title={'Transfer $ and Invest'}
                      size='md'
                      shadow
                      disabled={isPending}
                      onClick={onClickBuy}
                    />
                     <p className={styles.buttons__text}>
                       Transfer money from your bank to invest more in your
                       current portfolio or new fund mix.
                     </p>
                  </div>
                  <div className={styles.buttons__group}>
                    <Button
                      title={'Sell Funds & Transfer'}
                      size='md'
                      shadow
                      disabled={isPending}
                      onClick={onClickSell}
                    />
                    <p className={styles.buttons__text}>
                      Sell some of your Brains funds and transfer the money to
                      your bank (sold in proportion across all funds).
                     </p>
                  </div>
                  <div className={styles.buttons__group}>
                    <Button
                      title={'Cash Account'}
                      size='md'
                      shadow
                      disabled={isPending}
                      onClick={onCashAccount}
                    />
                     <p className={styles.buttons__text}>
                       Sell some of your Brains portfolio and hold in your Brains
                       cash account, or buy Brains funds with money from your
                       Brains cash account.
                     </p>

                  </div>
                  {
                     isPending &&
                        <div className={styles.legend__header}>
                          <p className={`${styles.buttons__text} ${styles.buttons__textPending}`}>
                            Investment is pending.
                          </p>
                        </div>
                    }
                  <div className={styles.legend__header}>
                    <div className={`${styles.blueTitle}`}>Change Fund Mix</div>
                  </div>
                  <p className={`${styles.infoText}`}>Go to
                    <a href='#' onClick={this.props.navTo(WORLD_VIEW)}> World View </a>
                     and
                    <a href='#' onClick={this.props.navTo(INTERESTS)}> Interests </a>
                    to create a new fund mix, or
                    <a href='#' onClick={this.props.navTo(RECOMMENDED_PORTFOLIO)}> Build Your Own </a>
                    fund mix on the Recommended Portfolio page.
                  </p>
                  <div>
                    <a
                      onClick={() => this.setState({holdingModalShown: true})}
                    >
                      Fund Holdings
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <HoldingsTable
          isOpen={holdingModalShown}
          closeModal={() => this.setState({holdingModalShown: false})}
        />
      </>
    );
  }

  renderStub = () => {
    return (
      <div className='stub'>
        <div className='stub__text'>
          Once you invest money here will be displayed you to the current portfolio.
        </div>
      </div>
    );
  };

  render() {
    const {fundsData, navTo, dataStatus, isHoldingsPage, isCompleteWorldView} = this.props;
    if (dataStatus.loading) {
      return <Spinner size='lg'/>;
    }

    if (dataStatus.fail) {
      return <OopsView/>;
    }

    if (dataStatus.loaded && !isCompleteWorldView) {
      return (
        <div className={styles.portfolio}>
          <div className='topPanel'>
            <div className='contentContainer'>
              <h1>Portfolio</h1>
              <TabNav links={tabLinks} />
            </div>
          </div>
          <div className='mainContent'>
            <div className='contentContainer'>
              <GoToWorldView
                text='Once you invest money here will be displayed you to the current portfolio.'
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      isHoldingsPage
        ?
        (
          fundsData
            ?
            this.renderContent()
            :
            this.renderStub()
        )
        :
        <div className={styles.portfolio}>
          <div className='topPanel'>
            <div className='contentContainer'>
              <h1>Current Portfolio</h1>
              <TabNav links={tabLinks} />
            </div>
          </div>
          <div className='mainContent'>
            <div className='contentContainer'>
              {
                fundsData ?
                  this.renderContent() :
                  this.renderStub()
              }
            </div>
          </div>
        </div>
    );
  }
}

export default CurrentPortfolioView;
