import React from 'react';
import PropTypes from 'prop-types';
import {Button} from '../../controls';
import styles from './WorldViewStyles.scss';

const WorldViewView = ({selectPortfolio, selectedPortfolio}) => {
  return (
    <div>
      <div className='topPanel'>
        <div className='contentContainer'>
          <h1>World View</h1>
        </div>
      </div>
      <div className='mainContent'>
        <div className='contentContainer'>
          <div>
            <h2>Create Your First Portfolio</h2>
            <p className='mb-5 mt-4'>
              World View is the foundation of your customized portfolio, where you are asked what you think the world
              will be like in the future. We recommend that you select the Deep Dive path below because it will allow us
              to hone in more on your vision. But if you don’t have a lot of time now you can take the Express path,
              which is still personalized but shorter, or the Experts path, which will lead to a portfolio based on our
              economic and financial specialists’ recommendations (they have PhDs, so they’re quite smart!).
            </p>
            <p className='mb-5 mt-4'>
              No matter which of the three pathways you follow today, you can invest today and always come back and
              retake a pathway or choose another!
            </p>
          </div>
          <div className='panel mb-5'>
            <div className={styles.circles__container}>
              <h2 className={styles.circles__title}>Select the Best Way to Create Your World View</h2>

              <div className={styles.circles__body}>

                <a href='#'
                   onClick={selectPortfolio('express')}
                   className={`
                   ${styles.circle}
                   ${styles.circle__express}
                   ${selectedPortfolio && selectedPortfolio.alias === 'express' && styles.circle_active}`}>
                  <div className={styles.circle__title}>
                    Express Portfolio
                  </div>
                  <div className={styles.circle__text}>5 Minutes</div>
                </a>

                <a href='#'
                   onClick={selectPortfolio('deep_dive')}
                   className={`
                   ${styles.circle}
                   ${styles.circle__deep}
                   ${selectedPortfolio && selectedPortfolio.alias === 'deep_dive' && styles.circle_active}
                   `}>
                  <div className={styles.circle__title}>
                    Deep Dive Portfolio
                  </div>
                  <div className={styles.circle__text}>15 Minutes</div>
                </a>

                <a href='#'
                   onClick={selectPortfolio('expert')}
                   className={`
                   ${styles.circle}
                   ${styles.circle__expert}
                   ${selectedPortfolio && selectedPortfolio.alias === 'expert' && styles.circle_active}
                   `}>
                  <div className={styles.circle__title}>
                    Experts Portfolio
                  </div>
                  <div className={styles.circle__text}>1 Minute</div>
                </a>

              </div>
            </div>
          </div>
          {selectedPortfolio ?
            <div>
              <div className={`${styles.explainer} panel mb-5 px-4 py-5`}>
                <h3>{selectedPortfolio.title}</h3>
                {selectedPortfolio.description.length ?
                  selectedPortfolio.description.map((item, i) => (<p key={i}>{item}</p>)) : null
                }
              </div>
              <div className={styles.button}>
                <Button
                  onClick={selectedPortfolio.action}
                  title={`Go to the ${selectedPortfolio.title}`}
                />
              </div>
            </div> : null
          }
        </div>
      </div>
    </div>
  );
};

WorldViewView.propTypes = {
  selectPortfolio: PropTypes.func.isRequired,
  selectedPortfolio: PropTypes.object,
};

export default WorldViewView;
