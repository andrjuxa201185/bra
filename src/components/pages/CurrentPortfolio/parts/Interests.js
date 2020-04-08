import React, {useState} from 'react';

import styles from "./../../RecommendedPortfolio/parts/InterestsStyles.scss";


const PortfolioInterests = ({
                              data,
                            }) => {
  return (
    <div className={styles.interestFunds__container}>
      {data && Object.values(data).length ?
        <>
          <div className={styles.interestFunds__header}>
            <div className='d-flex justify-content-between align-items-center'>
                <p className={styles.interestFunds__headerText}>
                  Interest Funds
                </p>
            </div>
          </div>
          <div className={`d-flex justify-content-between`}>
          <div className='row'>
            {data && Object.values(data).map(({amount, name, id}) => {
              return (
                <div key={id}
                     className={`${styles.interestFunds__item} col-sm-6 ${styles.lineBefore}`}>
                  <span>{name}</span>
                  <span
                    className={styles.interestFunds__value}>{amount}$</span>
                </div>
              );
            })}
          </div>
        </div>
        </> : null}

    </div>
  );
};

export default PortfolioInterests;
