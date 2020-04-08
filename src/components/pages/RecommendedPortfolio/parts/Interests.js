import React, {useState} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import {Link} from "react-router-dom";
import styles from "./InterestsStyles.scss";
import {InputSlider} from '../../../controls';
import Arrow from '../../../../assets/images/icons/arrow-down.svg';
import {INTERESTS} from "../../../../navigation/routes";
import {
  selectData,
  selectInterestsData,
} from "../../../../store/portfolio/portfolioSelectors";
import {updateWeight} from "../../../../store/interests/interestsActions";
import {getPortfolio} from '../../../../store/portfolio/portfolioActions';

const PortfolioInterests = ({
                              data,
                              response_id,
                              if_contribution,
                              updateWeight,
                              getPortfolio,
                              isEdit = true,
                            }) => {
  let [weight, setWeight] = useState(if_contribution);
  let [isShow, setIsShow] = useState(!isEdit);

  const onSliderChange = weight => {
    setWeight(weight);
  };

  const onAfterSliderChange = () => {
    updateWeight({weight}, response_id, () => {
      getPortfolio();
    });
  };

  return (
    <div className={styles.interestFunds__container}>
      {data && Object.values(data).length ?
        <>
          <div className={styles.interestFunds__header}>
            <div className='d-flex justify-content-between align-items-center'>
              {isEdit
                ?
                  <>
                    <div className='d-flex justify-content-between flex-grow-1'>
                      <div className={styles.interestFunds__headerText}>
                      Special Interests
                      </div>
                      <div className={styles.interestFunds__headerText}>
                        {if_contribution}%
                      </div>
                    </div>

                    < div
                    className={`${styles.interestFunds__arrow} ${isShow ? styles.interestFunds__arrow_opened : ''}`}
                    onClick={() => setIsShow(!isShow)}
                  >
                      <Arrow/>
                    </div>
                  </>
                :
                  <p className={styles.interestFunds__headerText}>
                  Interest Funds
                  </p>
              }
            </div>
          </div>
          {isShow ?
            <>
              <p className={styles.interestFunds__text}>
                Your 1-10 selected interests can be up to 5% of your portfolio value.
              </p>

              <div className={`d-flex justify-content-between ${!isEdit ? 'mt-5' : ''}`}>
                <div className={isEdit ? styles.interestFunds : ''}>
                  {isEdit &&
                  <div className={styles.slider}>
                    <div className={styles.slider__scale}>0</div>
                    <div className={styles.slider__line}>
                      <InputSlider
                        tipFormatter={value => <span className={styles.percent}>Interests {value}%</span>}
                        tipProps={{overlayClassName: 'sliderTooltip'}}
                        step={1}
                        defaultValue={weight}
                        min={0}
                        max={5}
                        onChange={value => onSliderChange(value)}
                        onAfterChange={onAfterSliderChange}
                      />
                    </div>
                    <div className={styles.slider__scale}>5</div>
                  </div>
                  }
                  <div className={!isEdit ? 'row' : styles.interestFunds__values}>
                    {Object.values(data).map(({contribution, name, id}) => {
                      contribution = +contribution;
                      return (
                        <div key={id}
                             className={`${styles.interestFunds__item} ${!isEdit && `col-sm-6 ${styles.lineBefore}`}`}>
                          <span>{name}</span>
                          <span
                            className={styles.interestFunds__value}>{Math.round(contribution * 100) / 100}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </> : null
          }
        </> : null}
      {isEdit && <Link to={`${INTERESTS}/${response_id}`} className={styles.link}>+Add More Interests</Link>}
    </div>
  );
};

PortfolioInterests.propTypes = {
  data: PropTypes.object.isRequired,
  response_id: PropTypes.number.isRequired,
  if_contribution: PropTypes.number.isRequired,
  isEdit: PropTypes.bool,
  //actions
  updateWeight: PropTypes.func.isRequired,
  getPortfolio: PropTypes.func.isRequired,
};

const mapStateToProps = ({portfolio: {data, dataStatus}}) => ({
  data: selectInterestsData(data),
  if_contribution: selectData({data, prop: 'if_contribution'}),
  response_id: selectData({data, prop: 'response_id'}),
  dataStatus,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateWeight: updateWeight.request,
  getPortfolio: getPortfolio.request,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioInterests);
