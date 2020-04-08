import React from 'react';
import PropTypes from 'prop-types';
import {Tabs, TabPanel} from 'react-tabs';
import styles from './InterestsStyles.scss';
import {InputSlider, Tab, TabNav, Button, Spinner} from '../../controls';
import {RECOMMENDED_PORTFOLIO, LIFESTYLE, WORLD_VIEW} from '../../../navigation/routes';
import {ImageCheckboxForm, GoToWorldView, OopsView} from '../../common';


class InterestsView extends React.Component {
  static propTypes = {
    tabList: PropTypes.array.isRequired,
    handleFormData: PropTypes.func.isRequired,
    navTo: PropTypes.func.isRequired,
    dataStatus: PropTypes.object.isRequired,
    interestsData: PropTypes.object,
    onSliderChange: PropTypes.func.isRequired,
    sliderValue: PropTypes.number,
    onWeightSend: PropTypes.func.isRequired,
    isChangeWight: PropTypes.bool.isRequired,
    newWeightSent: PropTypes.bool.isRequired,
    isShow: PropTypes.bool,
    hasCheckedInterest: PropTypes.bool,
  };

  render() {
    const {
      tabList,
      tabColor,
      handleFormData,
      dataStatus,
      interestsData,
      onSliderChange,
      sliderValue,
      onWeightSend,
      isShow,
      isChangeWight,
      newWeightSent,
      hasCheckedInterest,
      navTo,
    } = this.props;

    if (dataStatus.loading) {
      return <Spinner size='lg'/>;
    }

    if (dataStatus.fail) {
      return <OopsView/>;
    }

    if (!isShow) {
      return (
        <div className={styles.interests}>
          <div className='topPanel'>
            <div className='contentContainer'>
              <h1>Interests</h1>
            </div>
          </div>
          <div className='mainContent'>
            <div className='contentContainer'>
              <GoToWorldView
                text='Please complete a World View path before starting Interests.'
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.interests}>
        <div className='topPanel'>
          <div className='contentContainer'>
            <h1>Interests</h1>
          </div>
        </div>
        <div className='mainContent'>
          <div className='contentContainer'>
            <p className={styles.interests__text}>Although you can create a personalized portfolio with only the World
              View assessment,
              you can personalize your investments even more by selecting a 1-10 special interests.
              We separated Interests into individual companies you may like,
              funds consisting of companies in interesting categories, and travel related funds.
              <span className={styles.tooltip}>Cannabis/Travel Fund Fees
                <span className={styles.tooltip__text}>
                  Note that the Cannabis and Travel funds are not Brains boutique funds
                  and will have some small backend fees that the issuing fund providers charge.
                  Brains doesn’t not charge any fees or commissions whatsoever on our end
                  for any of our funds, whether a Brains-created fund or from another provider.
                </span>
              </span>
            </p>
            <p className={styles.interests__text}>
              Your 1-10 selected interests can be up to 5% of your portfolio value. You get to choose the amount later
              on the Recommended Portfolio page.
            </p>

            <div className={styles.interests__slider}>

              <div className={`${styles.slider} ${!hasCheckedInterest ? 'disabled' : ''}`}>
                <div className={styles.slider__scale}>0</div>
                <div className={styles.slider__line}>
                  <InputSlider
                    tipFormatter={value => <span className={styles.percent}>Interests {value}%</span>}
                    tipProps={{overlayClassName: 'sliderTooltip'}}
                    step={1}
                    value={sliderValue}
                    min={0}
                    max={5}
                    onChange={value => onSliderChange(value)}
                  />
                </div>
                <div className={styles.slider__scale}>5</div>
              </div>

              {isChangeWight ?
                <div className={styles.sliderSendButton}>
                  <Button
                    title={'Set %'}
                    onClick={onWeightSend}
                    size={'sm'}
                    //disabled={!isChangeWight}
                  />
                </div> : null
              }
              {newWeightSent ?
                <div className={styles.weightSent}>Success!</div> : null
              }
            </div>

            <Tabs className={styles.tabs}>
              <TabNav>
                {tabList.map((tab, i) => (
                  <Tab color={tabColor[i]} key={i}>{tab}</Tab>
                ))}
              </TabNav>
              <TabPanel>
                <div className={`${styles.categories} panel`}>
                  <ImageCheckboxForm
                    data={interestsData[1].funds}
                    id={interestsData[1].id}
                    handleFormData={handleFormData}/>
                </div>
              </TabPanel>
              <TabPanel>
                <div className={`${styles.categories} panel`}>
                  <ImageCheckboxForm
                    data={interestsData[2].funds}
                    id={interestsData[2].id}
                    handleFormData={handleFormData}/>
                </div>
              </TabPanel>
              <TabPanel>
                <div className={`${styles.categories} panel`}>
                  <ImageCheckboxForm
                    data={interestsData[3].funds}
                    id={interestsData[3].id}
                    handleFormData={handleFormData}/>
                </div>
              </TabPanel>
            </Tabs>

            <div className={`${styles.buttons}`}>
              <div className='row mt-4 justify-content-center'>
                <div className='col-6 col-sm-4 px-sm-1 mb-4 order-sm-0'>
                  <Button
                    onClick={navTo(WORLD_VIEW)}
                    title={'Prev: World View'}
                    size={'md'}
                  />
                </div>

                <div className='col-6 col-sm-4 px-sm-1 mb-4 order-sm-2'>
                  <Button
                    onClick={navTo(LIFESTYLE)}
                    title={'Next: Lifestyle'}
                    size={'md'}
                  />
                </div>

                <div className='col-6 col-sm-4 px-sm-1 mb-4 order-sm-1'>
                  <Button
                    onClick={navTo(RECOMMENDED_PORTFOLIO)}
                    title={'Invest Now'}
                    size={'md'}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default InterestsView;
