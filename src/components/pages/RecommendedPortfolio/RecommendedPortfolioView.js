import React from 'react';
import PropTypes from 'prop-types';
import styles from './RecommendedPortfolioStyles.scss';
import {TabNav, Button, Spinner} from '../../controls';
import {DropDownInfo, GoToWorldView, Donut, OopsView, PortfolioExplanation, HoldingsTable} from '../../common';
// import Fund from './parts/Fund';
import FundWithSlider from './parts/FundWithSlider';
import {CURRENT_PORTFOLIO, RECOMMENDED_PORTFOLIO} from "../../../navigation/routes";
import PortfolioInterests from './parts/Interests';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {portfolioTopBasicText, portfolioTopAdjustText} from '../../../constants';
import { Tooltip } from "../../controls";
import {getQuizTitle, getChartDataFromFunds} from '../../../helpers/common';
import {DOMAIN_LANDING_URL} from "../../../service/apiConstants";
// import { getTotalPercentage } from '../../../helpers/fundValueCalculator';

const tabLinks = [
  {title: 'Recommended Portfolio', route: RECOMMENDED_PORTFOLIO, active: true},
  {title: 'Current Portfolio', route: CURRENT_PORTFOLIO, active: false},
];

class RecommendedPortfolioView extends React.Component {
  static propTypes = {
    //data
    fundsData: PropTypes.object,
    dataStatus: PropTypes.object,
    bf_contribution: PropTypes.number,
    if_contribution: PropTypes.number,
    currentTotalPercentage: PropTypes.number,
    is_all_out: PropTypes.bool,
    isAllowedPercentage: PropTypes.bool,
    is_tailored: PropTypes.bool,
    currentTab: PropTypes.number,
    current_portfolio: PropTypes.string,
    //actions
    changeTab: PropTypes.func,
    handleChangeFundSlider: PropTypes.func.isRequired,
    handleAfterChangeFundSlider: PropTypes.func.isRequired,
    handleReset: PropTypes.func.isRequired,
    onClickInvest: PropTypes.func.isRequired,
    onClickInvestMore: PropTypes.func.isRequired,
  };

  state = {
    holdingModalShown: false,
    howPageWorksShown: false,
  };

  howPageWorksControl = () => {
    const {howPageWorksShown} = this.state;
    this.setState({howPageWorksShown: !howPageWorksShown});
  };

  holdingModalControl = isOpen => () => {
    this.setState({holdingModalShown: isOpen});
  };

  render() {
    const {holdingModalShown, howPageWorksShown} = this.state;
    const {
      fundsData,
      bf_contribution, dataStatus,
      handleReset,
      if_contribution, is_all_out,
      is_tailored,
      changeTab, currentTab, current_portfolio,
      onClickInvest, handleChangeFundSlider,
      isAllowedPercentage, currentTotalPercentage,
      handleAfterChangeFundSlider,
      isPending,
      isRebalance,
      onRebalance,
      onClickInvestMore,
      rebalanceDataStatus,
    } = this.props;
    console.log(this.props)

    if (dataStatus.loading || rebalanceDataStatus.loading) {
      return <Spinner size='lg'/>;
    }

    if (dataStatus.fail) {
      return <OopsView/>;
    }

    if (!fundsData) {
      return (
        <div className={styles.portfolio}>
          <div className='topPanel'>
            <div className='contentContainer'>
              <h1>Portfolio</h1>
              <TabNav links={tabLinks}/>
            </div>
          </div>
          <div className='mainContent'>
            <div className='contentContainer'>
              <GoToWorldView
                text='The Recommended Portfolio is a dynamic, information-packed page… which you can only access after completing one of the three World View paths.'
              />
            </div>
          </div>
        </div>
      );
    }
    if (dataStatus.loaded) {
      return (
        <div className={styles.portfolio}>
          <div className='topPanel'>
            <div className='contentContainer'>
              <h1>Portfolio {current_portfolio && `(${getQuizTitle(current_portfolio)})`}</h1>
              <TabNav links={tabLinks}/>
            </div>
          </div>
          {/*{currentTab === 1 &&*/}
          {/*<div className={styles.tabs}>*/}
            {/*<DropDownInfo*/}
              {/*title={'How This Page Works'}*/}
            {/*>*/}
              {/*<PortfolioExplanation/>*/}
            {/*</DropDownInfo>*/}
           {/**/}
          {/*</div>*/}
          {/*}*/}
          <div className={styles.tabs}>
            <div className={styles.topText}>
              {currentTab === 0
                ? <h4 className={styles.congratulations__title}>Congratulations on creating your World View!</h4>
                : null
              }
              <p className={styles.congratulations__text}>
                {currentTab === 0
                  ? portfolioTopBasicText
                  : portfolioTopAdjustText
                }
              </p>
              <p className={styles.topText__additionalText}>
                {currentTab === 0
                  ? <span>Read more about our Brains model on our blog, <a href={`${DOMAIN_LANDING_URL}/`} target='_blank' rel='noopener noreferrer'>A Revolutionary Platform.</a></span>
                  : <span>Stan Corey, our compliance advisor, has written a nice blog <a href={`${DOMAIN_LANDING_URL}/`} target='_blank' rel='noopener noreferrer'>The Value of a Diversified Portfolio.</a></span>
                }
              </p>
              <a onClick={this.howPageWorksControl} className={styles.topText__howPageWorks}>
                + How This Page Works
              </a>
            </div>
          </div>
          {howPageWorksShown
            ? <div className={styles.tabs}>
              <PortfolioExplanation/>
            </div>
            : null
          }
          <Tabs selectedIndex={currentTab} className={styles.tabs} onSelect={changeTab}>
            <TabList className={styles.tabNav}>
              <Tab selectedClassName={styles.tabNav__btn_active}
                   className={styles.tabNav__btn}>Basic</Tab>
              <Tab selectedClassName={styles.tabNav__btn_active}
                   className={styles.tabNav__btn}>Build Your Own</Tab>
            </TabList>

            <TabPanel>
              <div className='panel'>
                <div className={`d-flex flex-wrap `}>

                  <div className={styles.portfolio__col1}>
                    <div className={styles.legend}>
                      <div className={styles.portfolio__container}>
                        <div className={styles.legend__header}>
                          <div className={styles.title}>Total</div>
                          <div className={styles.title}>
                            {if_contribution ? `${bf_contribution}% + ${if_contribution}% Interests = 100%` : `${bf_contribution}%`}
                          </div>
                        </div>
                        <div className={'row'}>
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
                                <span className={styles.legend__value}>{item.recommended}%</span>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                    <div className={`${is_all_out ? 'hidden' : ''}`}>
                      <PortfolioInterests isEdit={false}/>
                    </div>
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
                        <div className={!is_all_out || (is_all_out && is_tailored) ? '' : 'hidden'}>
                          <div className={styles.legend__header}>
                            <div className={`${styles.blueTitle}`}>Invest Now!</div>
                          </div>
                        </div>
                        {isRebalance && <div className={is_all_out ? 'hidden' : styles.buttons__group}>
                          <Button
                            title={'Invest More'}
                            size='md'
                            shadow
                            disabled={isPending}
                            onClick={onClickInvestMore}
                          />

                          <p className={styles.buttons__text}>
                            Transfer money from your bank to invest in Brains funds.
                          </p>
                        </div>}
                        <div className={is_all_out ? 'hidden' : styles.buttons__group}>
                          <Button
                            title={isRebalance ? 'Change Fund Mix' : 'Basic Portfolio'}
                            size='md'
                            shadow
                            disabled={isPending}
                            onClick={isRebalance ? () => onRebalance(false) : onClickInvest(false)}
                          />
                          <p className={styles.buttons__text}>
                            {
                              isRebalance
                                ? 'Change your current fund mix to the new World View and Interests fund mix you just created.'
                                : 'Invest now in the portfolio from your World View, Interests, and Lifestyle.'
                            }
                          </p>

                          {
                            isPending &&
                              <p className={`${styles.buttons__text} ${styles.buttons__textPending}`}>
                                Investment is pending.
                              </p>
                          }
                        </div>
                        <div>
                          <a
                             onClick={this.holdingModalControl(true)}
                          >
                            Fund Holdings
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>

            <TabPanel>
              <div className='panel'>
                <div className={`row mx-0`}>
                  <div className={styles.portfolio__col1}>
                    <div className={styles.funds__header}>
                      <div className='d-flex flex-wrap align-items-end'>
                        <div className='d-flex flex-wrap col-sm-12 px-0'>
                          <div className='col-6 px-0'>
                            <div className={styles.title}>Brains Funds</div>
                          </div>
                          <div className='col-6 px-0 d-flex justify-content-end'>
                            <div className={styles.title}>Current Weight</div>
                          </div>
                        </div>
                        {/*<div className={`${styles.btnSave} col-3`}>*/}
                          {/*{isTailoredChanged ?*/}
                            {/*<Button*/}
                              {/*onClick={handleSubmit}*/}
                              {/*title='Save'*/}
                              {/*size='md'*/}
                            {/*/> : null*/}
                          {/*}*/}
                        {/*</div>*/}
                      </div>

                    </div>
                    <div className={styles.funds}>
                      {Object.values(fundsData)
                        .sort((a, b) => a.positionByTailoring - b.positionByTailoring)
                        .map(({is_locked, name, expert, recommended, tailored, id, color, isOpened, definition}) => (
                          <div key={id}>
                            <FundWithSlider
                              id={id}
                              tailored={tailored}
                              max={bf_contribution}
                              color={color}
                              text={definition}
                              title={name}
                              onAfterChange={handleAfterChangeFundSlider}
                              onChange={handleChangeFundSlider}
                            />
                          </div>
                        ))}
                    </div>
                    <div className={styles.funds__bottom}>
                      <div className='d-flex justify-content-between'>
                        <div className={styles.title}>Total</div>
                        <div
                          className={`${!isAllowedPercentage ? styles.title__red : ''} ${styles.title} `}
                        >
                          {if_contribution ? `${currentTotalPercentage}% + ${if_contribution}% Interests = ${currentTotalPercentage + if_contribution}%` : `${currentTotalPercentage}%`}
                        </div>
                      </div>
                      {
                        !isAllowedPercentage ?
                          <div className='d-flex justify-content-end'>
                            <div className={styles.funds__warning} onClick={handleReset}>
                              Total needs to be exactly 100%
                            </div>
                          </div> : null
                      }
                      <div className='d-flex justify-content-end'>
                        <div className={styles.funds__reset} onClick={handleReset}>
                          Reset to Basic
                        </div>
                      </div>
                    </div>
                    <div className={`${is_all_out ? 'hidden' : ''}`}>
                      <PortfolioInterests/>
                    </div>
                  </div>

                  <div className={styles.portfolio__col2}>
                    <div className={styles.buttons}>
                      <div className={styles.portfolio__container}>
                        <div className={!is_all_out || (is_all_out && is_tailored) ? '' : 'hidden'}>
                          <div className={styles.legend__header}>
                            <div className={`${styles.blueTitle}`}>Invest Now!</div>
                          </div>
                        </div>
                        <div className={!is_all_out || (is_all_out && is_tailored) ? styles.buttons__group : 'hidden'}>
                          <Button
                            style='green'
                            title={isRebalance ? 'Invest More' : 'Build Your Own'}
                            size='md'
                            shadow
                            disabled={isPending}
                            onClick={isRebalance ? onClickInvestMore : onClickInvest(true)}
                          />

                          <p className={styles.buttons__text}>
                            {
                              isRebalance
                                ? 'Transfer money from your bank to invest in Brains funds.'
                                : 'Invest now in the portfolio from your World View, Interests, and Lifestyle.'
                            }
                          </p>

                          {!isAllowedPercentage ?
                            <div className={styles.funds__warning} onClick={handleReset}>
                              Total needs to be exactly 100%
                            </div>: null
                          }
                        </div>
                        <div className={is_all_out ? 'hidden' : styles.buttons__group}>
                          <Button
                            title={isRebalance ? 'Change Fund Mix' : 'Basic Portfolio'}
                            size='md'
                            shadow
                            disabled={isPending}
                            onClick={isRebalance ? () => onRebalance(false) : onClickInvest(false)}
                          />
                          <p className={styles.buttons__text}>
                            {
                              isRebalance
                                ? 'Change your current fund mix to the new World View and Interests fund mix you just created.'
                                : 'Invest now in the portfolio from your World View, Interests, and Lifestyle.'
                            }
                          </p>
                          {
                            isPending &&
                              <p className={`${styles.buttons__text} ${styles.buttons__textPending}`}>
                                Investment is pending.
                              </p>
                          }
                        </div>
                        <div>
                          <a
                            onClick={this.holdingModalControl(true)}
                          >
                            Fund Holdings
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
          </Tabs>
          <HoldingsTable
            isOpen={holdingModalShown}
            closeModal={this.holdingModalControl(false)}
          />
        </div>
      );
    }
    return null
  }
}

export default RecommendedPortfolioView;
