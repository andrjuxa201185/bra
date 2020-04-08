import React from 'react';
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';
import {
  DISCUSSION_BOARD,
  LIBRARY,
  REFER_FRIEND,
  CURRENT_PORTFOLIO
} from "../../../navigation/routes";
import {List} from '../../common';
import {Tab, TabNav, LinearProgress, ImageProgress, Button} from '../../controls';
import {Tabs, TabPanel} from 'react-tabs';
import styles from './DashboardStyles.scss';
import {WORLD_VIEW, INTERESTS, LIFESTYLE} from '../../../navigation/routes';
import {globals} from "../../../store/globals";
import { CurrentPortfolio } from '../../pages/index';
import Activity from "./parts/ActivityContainer";
import PerfomanceContainer from "./parts/PerfomanceContainer";

const tabList = [
  'snapshot',
  'holdings',
  'activity',
  'performance',
];

class DashboardView extends React.Component {
  static propTypes = {
    libraryData: PropTypes.array,
    hotDiscussions: PropTypes.array,
    snapshotData: PropTypes.shape({
      interests_progress: PropTypes.number,
      lifestyle_progress: PropTypes.number,
      world_view_progress: PropTypes.number,
      outlook_meter_value: PropTypes.number,
    }),
    assessmentsDataStatus: PropTypes.object.isRequired,
    outlookDataStatus: PropTypes.object.isRequired,
  };

  navTo = route => {
    globals.history.push(route);
  };

  renderAssessment() {
    const {assessmentsDataStatus, snapshotData} = this.props;
    if (assessmentsDataStatus.loaded && snapshotData) {
      return (
        <div className={styles.processBlockContainer}>
          <h2>Brains Assessments</h2>
          <div className='panel'>
            <div className={styles.processBlock}>

              <div className={styles.processBlockRow}>
                <LinearProgress
                  type={'primary'}
                  value={snapshotData.world_view_progress}
                  progressTitle='World View'
                  status
                  updateLink={WORLD_VIEW}
                />
              </div>
              <div className={styles.processBlockRow}>
                <LinearProgress
                  type={'primary'}
                  value={snapshotData.interests_progress}
                  progressTitle='Interests'
                  status
                  updateLink={INTERESTS}
                />
              </div>

              <div className={styles.processBlockRow}>
                <LinearProgress
                  type={'primary'}
                  value={snapshotData.lifestyle_progress}
                  progressTitle='LifeStyle'
                  status
                  updateLink={LIFESTYLE}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  renderOutlook() {
    const {outlookDataStatus, snapshotData} = this.props;
    if (outlookDataStatus.loaded && snapshotData) {
      return (
        <div className={styles.processBlockContainer}>
          <h2>World Outlook Meter</h2>
          <p>
            As you respond to questions in the World View assessment,
            the World Outlook Meter changes to reflect whether your
            overall world view is more on the sunny or gloomy side.
          </p>
          <div className='panel'>
            <div className={styles.processBlock}>
              <ImageProgress
                value={Math.round(snapshotData.outlook_meter_value)}
              />
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    const {libraryData, hotDiscussions, userProfile} = this.props;
    return (
      <div className={styles.dashboard}>
        <Tabs className={styles.tabs}>
          <div className='topPanel'>
            <div className='contentContainer'>
              <h1>Dashboard</h1>
              <TabNav>
                {tabList.map((tab, i) => (
                  <Tab key={i}>{tab}</Tab>
                ))}
              </TabNav>
            </div>
          </div>
          <div className='mainContent'>
            <div className='contentContainer'>
              <TabPanel>
                <div className={styles.infoBlocks}>
                  <div className={styles.infoBlocksItem}>
                    <div className={styles.infoBlock}>

                      <p className={styles.infoBlockText}>
                        Earn <span>$100</span> for each friend referred!
                        {/*If three of your friends join you get a free <span>year</span> of Brains Membership,*/}
                        {/*a <span>$70 value!</span>*/}
                      </p>
                      <div className={'align-self-center'}>
                        <Button
                          title={'Invite Friends'}
                          onClick={() => this.navTo(REFER_FRIEND)}
                          size={'sm'}
                          //transparent
                        />
                      </div>
                    </div>
                  </div>

                  <div className={styles.infoBlocksItem}>
                    <div className={styles.infoBlock}>
                      <p className={styles.infoBlockText}>
                        Connect to your bank account and invest more for your future with Brains boutique funds.
                      </p>
                      <div className={'align-self-center'}>
                        <Button
                          title={'Invest More'}
                          onClick={() => this.navTo(CURRENT_PORTFOLIO)}
                          size={'sm'}
                          //transparent
                        />
                      </div>
                    </div>
                  </div>

                  <div className={styles.infoBlocksItem}>
                    <div className={styles.infoBlock}>
                      <p className={styles.infoBlockText}>
                        <Link to={DISCUSSION_BOARD} className={styles.link}>Discuss</Link>&nbsp;
                        your thoughts or&nbsp;
                        <Link to={LIBRARY} className={styles.link}>read</Link>&nbsp;
                        about world events with our Brains Community.
                      </p>
                      <div className={'align-self-center'}>
                        <Button
                          title={'Community'}
                          onClick={() => this.navTo(DISCUSSION_BOARD)}
                          size={'sm'}
                          //transparent
                        />
                      </div>
                    </div>
                  </div>

                  <div className={styles.infoBlocksItem}>
                    <div className={`${styles.infoBlock} ${styles.infoBlockValue}`}>
                      <span className={styles.infoBlockData}>${userProfile && userProfile.data ? userProfile.data.investment_amount : '0.00' }</span>
                      <p className={styles.infoBlockTitle}>Portfolio Value</p>
                    </div>
                  </div>
                </div>

                {this.renderAssessment()}
                {this.renderOutlook()}
                <div className={styles.dashboardNews}>
                  <div className='d-flex flex-wrap mx-n3'>
                    {hotDiscussions.length ?
                      <div className='col-md-8 px-md-3 mb-5'>
                        <h3>The Latest Library Articles</h3>
                        <div className='panel'>
                          <div className={styles.dashboardList}>
                            <List data={libraryData} path={'library/article'}/>
                          </div>
                        </div>
                      </div>
                      : null}
                    {hotDiscussions.length ?
                      <div className='col-md-4 px-md-3'>
                        <h3>Hot Topics</h3>
                        <div className='panel'>
                          <div className={styles.dashboardList}>
                            <List data={hotDiscussions} path={'discussion-board/comments'}/>
                          </div>
                        </div>
                      </div>
                      : null}
                  </div>
                </div>

              </TabPanel>
              <TabPanel>
                <CurrentPortfolio isHoldingsPage={true}/>
              </TabPanel>
              <TabPanel>
                <Activity />
              </TabPanel>
              <TabPanel>
                <PerfomanceContainer />
                <div className='stub'>
                  <div className='stub__text'>
                    Сurrently the section is over development.
                  </div>
                </div>
              </TabPanel>
            </div>
          </div>
        </Tabs>
      </div>
    );
  }
}

export default DashboardView;
