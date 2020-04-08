import React, { useState } from 'react';
import FundsIcon1 from '../../../assets/images/icons/funds-icon-1.svg';
import FundsIcon2 from '../../../assets/images/icons/Brain_icon.svg';
import FundsIcon3 from '../../../assets/images/icons/Tailor_icon.svg';
import styles from './PortfolioExplanationStyles.scss';

const PortfolioExplanation = () => {
  let [openedText, setOpenedIndex] = useState(null);

  const setOpenedText = index => {
    index === openedText ? setOpenedIndex(null) : setOpenedIndex(index);
  };

  return (
    <div className={styles.container}>
      <p>
        You will be using this page regularly as a Member of the Brains community, so it is worth taking a few moments
          to understand how it works. Let’s start from the top of the page and move down.
      </p>
      <div className={styles.pullDown}>
        <h4 className={styles.pullDown__title} onClick={() => setOpenedText(1)}>
          <span>
            Recommended/Current Portfolio Tabs
          </span>
          <span>{openedText === 1 ? '-': '+'}</span>
        </h4>
        {openedText === 1 ?
          <>
            <p>
              The <b>Recommended Portfolio</b> tab takes you to the portfolio we recommended based on your World View,
              Interests,
              and Lifestyle assessments. Once you become a member and officially invest with brains, you’ll be able to see
              the portfolio you’ve invested in on the next tab, <b>Current Portfolio</b>.
            </p>
            <p>
              The <b>colored circle and funds below</b> show you the Brains funds we recommend that you invest in, and
              on the
              Current Portfolio page that information represents the funds you are currently invested in.
            </p>
          </>:null
        }
      </div>
      <div className={styles.pullDown}>
        <h4 className={styles.pullDown__title} onClick={() => setOpenedText(2)}>
          <span>
            Recommended and Build Your Own
          </span>
          <span>{openedText === 2 ? '-': '+'}</span>
        </h4>
        {openedText === 2 ?
          <>
            <p>
              If you are happy with the <b>Recommended Portfolio</b> you created using
              the Brains World View model, just click the <b>Basic Portfolio</b> button
              on the right (web) or <b>Invest Now</b> button (app). If this <b>Basic portfolio </b>
              isn’t exactly what you’re interested in, you can select your own funds in our <b>Build Your Own</b> area.
            </p>
            {/*<ul className={styles.iconsList}>*/}
            {/*  <li>*/}
            {/*    <div className={styles.iconsList__icon}>*/}
            {/*      <FundsIcon1/>*/}
            {/*    </div>*/}
            {/*    <span>*/}
            {/*      The first colored bar for each fund is the amount of that fund we recommend*/}
            {/*    based on your assessments.*/}
            {/*    </span>*/}

            {/*  </li>*/}
            {/*  <li>*/}
            {/*    <div className={styles.iconsList__icon}>*/}
            {/*      <FundsIcon2/>*/}
            {/*    </div>*/}
            {/*     The second colored bar for each fund is what our Brains Experts recommend based on their*/}
            {/*    assessment of the current world situation.*/}
            {/*  </li>*/}
            {/*  <li>*/}
            {/*    <div className={styles.iconsList__icon}>*/}
            {/*      <FundsIcon3/>*/}
            {/*    </div>*/}
            {/*     The final colored bar defaults to your Recommended Portfolio mix, but you can tailor each fund you*/}
            {/*    would like to invest in here to your liking.*/}
            {/*  </li>*/}
            {/*</ul>*/}
            <p>
              If you wish to create a personalized portfolio that is different
              than the one created by your World View model, go to the <b>Build Your
              Own</b> section. Fund allocations are pre-set to your <b>Basic portfolio</b>,
              but you can change the percent to want to invest in any fund by moving
              the slider bar. Just remember that all of your selections, including
              your Interests, must add to 100%. When you are comfortable with your
              selections, select the <b>Build Your Own</b> invest button on the right,
              or <b>Invest Now</b> on our app.
            </p>
            <p>
              Remember that you can always add Interests to your portfolio as
              well – just go back to that section and select up to 10 Interests.
            </p>
          </>: null
        }
      </div>
      <div className={styles.pullDown}>
        <h4 className={styles.pullDown__title} onClick={() => setOpenedText(3)}>
          <span>
            Interests Funds
          </span>
          <span>{openedText === 3 ? '-': '+'}</span>
        </h4>
        {openedText === 3 ?
          <p>
            You can invest in up to ten Interests companies/funds, which can consist of 0-5% of your total portfolio value. We
            limit Interests because we don’t want you taking too much risk in any one investment!
          </p>: null
        }

      </div>
      <div className={styles.pullDown}>
        <h4 className={styles.pullDown__title} onClick={() => setOpenedText(4)}>
          <span>
            Connecting to Your Bank
          </span>
          <span>{openedText === 4 ? '-': '+'}</span>
        </h4>
        {openedText === 4 ?
          <p>
            If you are investing for the first time with Brains, once you click one of the three invest buttons you will
            be taken through our “onboarding” process with our custodian, Folio Investments, Inc. Folio Investments, Inc. helps Brains
            connect
            to your bank so you can buy and sell our investments. The onboarding process should take about 10 minutes.
          </p> : null
        }
      </div>
      <div className={styles.pullDown}>
        <h4 className={styles.pullDown__title} onClick={() => setOpenedText(5)}>
          <span>
            Investing After You Are a Member
          </span>
          <span>{openedText === 5 ? '-': '+'}</span>
        </h4>
        {openedText === 5 ?
          <p>
            Once you are a Brains Member and invested in your first portfolio,
            you may want to change your portfolio a bit in our <b>Build Your Own</b> section,
            select our <b>Experts portfolio</b>, or add more money from your bank to invest
            in your current or different portfolio mix. When you are ready to invest
            again or need to move money to/from Brains to your bank, visit
            the <b>Current Portfolio</b> area in this section or your Holdings tab on your dashboard.
          </p> : null
        }
      </div>
    </div>
  );
};

PortfolioExplanation.propTypes = {};

export default PortfolioExplanation;
