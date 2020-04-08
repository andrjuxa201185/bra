import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styles from './MemberBenefitsStyles.scss';
import systemImage from '../../../assets/images/circle-diagram.png';
import costImage from '../../../assets/images/cost.png';
import ArrowRightIcon from '../../../assets/images/icons/arrow-right.svg';
import ArrowDownIcon from '../../../assets/images/icons/arrow-down.svg';
import {showAlert} from '../../../store/alert/alertActions';
import { bindActionCreators } from 'redux';

class MemberBenefitsView extends React.Component {
  propTypes = {
    showAlert: PropTypes.func.isRequired,
  };

  state = {
    label1: false,
    label2: false,
    label3: false,
  };

  handleOpen = label => {
    this.setState(state => ({
      [label]: !state[label],
    }));
  };

  render() {
    return (
      <div className={styles.interests}>
        <div className='topPanel'>
          <div className='contentContainer'>
            <h1>Member Benefits</h1>
          </div>
        </div>
        <div className='mainContent'>
          <div className='contentContainer'>
            <div className='panel mb-4'>
              <div className={styles.circlesContainer}>
                <h2 className={styles.circlesContainer__title}>Brains is a Place to Learn about
                  Investing and the World!
                </h2>
                <div className={styles.circles}>
                  <div className={`${styles.circle} ${styles.circle1}`}>
                    Brains is the only investment platform in the world that helps people like you get smarter about the
                    way you invest by tailoring
                    your portfolio to your unique
                    world view and lifestyle
                  </div>
                  <div className={`${styles.circle} ${styles.circle2}`}>
                    We have created investment strategies that will help
                    you achieve your financial goals
                    while focusing your investments
                    on a future that aligns with
                    your own vision and values
                  </div>
                  <div className={`${styles.circle} ${styles.circle3}`}>
                    And our Brains Experts
                    and member community are
                    there to help you learn about investing to make your journey
                    more inspiring
                  </div>
                </div>
              </div>
            </div>
            <div className='panel mb-4'>
              <div className={styles.systemInfo}>
                <h2 className={styles.systemInfo__title}>The Brains System is Based on State-of-the-Art Technology</h2>
                <div className={styles.systemInfo__img}>
                  <img src={systemImage} alt=''/>
                </div>

                <div className={styles.textColumns}>
                  <div className={styles.textColumns__item}>
                    <div className={`${styles.textColumns__title} ${styles.textColumns__title1}`}>A Model Created by
                      Experts
                    </div>
                    <p className={styles.textColumns__text}>
                      Our Brains team is made up of specialists in psychology, economics, data science, machine
                      learning, artificial intelligence, and wealth
                      management. Under the hood of our interactive
                      and easy to use Brains world model is a
                      sophisticated engine of proprietary algorithms.
                    </p>
                  </div>
                  <div className={styles.textColumns__item}>
                    <div className={`${styles.textColumns__title} ${styles.textColumns__title2}`}>Fun and Easy</div>
                    <p className={styles.textColumns__text}>
                      We’ve created these powerful technologies to
                      make investing simpler and more enjoyable for you.
                      You tell us who you are and what you believe in,
                      and we help you build a mix of investments unique to you.
                      No one else in our community will have your exact portfolio (
                      unless they’re your secret twin).
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='panel mb-4'>
              <div className={styles.communityInfo}>
                <h2 className={styles.communityInfo__title}>
                  {`Brains Membership is more than just about investing…
                    it’s a Supportive Community.`}
                </h2>
                <p className={styles.communityInfo__text}>
                  Brains is more than just an investing website. We are the only
                  platform in the world with a Discussion Board and Library for
                  you to chat with other members and learn about how world events
                  may affect your investment choices.
                </p>
                <div className={styles.accordion}>
                  <div className={styles.accordion__item}>
                    <div className={styles.accordion__header} onClick={() => this.handleOpen('label1')}>
                      <span className={styles.accordion__title}>Discussion Board</span>
                      {this.state.label1 ? <ArrowDownIcon/> : <ArrowRightIcon/>}
                    </div>
                    {this.state.label1 &&
                    <p className={styles.accordion__text}>
                      Our Brains Discussion Board is an exciting place where
                      you can see what other members are saying about current issues
                      like climate change, world conflicts, and technology.
                      You can participate in conversations, ask our experts and
                      other members questions, and learn about investing in real-time.
                    </p>}
                  </div>
                  <div className={styles.accordion__item}>
                    <div className={styles.accordion__header} onClick={() => this.handleOpen('label2')}>
                      <span className={styles.accordion__title}>Library</span>
                      {this.state.label2 ? <ArrowDownIcon/> : <ArrowRightIcon/>}
                    </div>
                    {this.state.label2 &&
                    <p className={styles.accordion__text}>
                      Our Brains Discussion Board is an exciting place where
                      you can see what other members are saying about current issues
                      like climate change, world conflicts, and technology.
                      You can participate in conversations, ask our experts and
                      other members questions, and learn about investing in real-time.
                    </p>}
                  </div>
                  <div className={styles.accordion__item}>
                    <div className={styles.accordion__header} onClick={() => this.handleOpen('label3')}>
                      <span className={styles.accordion__title}>Portfolio Updates</span>
                      {this.state.label3 ? <ArrowDownIcon/> : <ArrowRightIcon/>}
                    </div>
                    {this.state.label3 &&
                    <p className={styles.accordion__text}>
                      Our Brains Discussion Board is an exciting place where
                      you can see what other members are saying about current issues
                      like climate change, world conflicts, and technology.
                      You can participate in conversations, ask our experts and
                      other members questions, and learn about investing in real-time.
                    </p>}
                  </div>
                </div>
              </div>
            </div>
            <div className='panel mb-4'>
              <div className={styles.about}>
                <div className={styles.about__container}>
                  <h2 className={styles.about__title}>Brains is About You</h2>
                  <p className={styles.about__description}>
                    The core of our Brains investment strategy is customization for each individual member.
                    Our entire platform was built to take the time to understand who you are, and then help
                    you craft a personalized investment package that represents this unique you.
                  </p>
                </div>
                <div className={styles.about__list}>
                  <div className={`${styles.about__col} ${styles.about__colLeft}`}>
                    <div className={`${styles.about__item} ${styles.about__item1}`}>
                      <div className={styles.about__itemNumber}>1</div>
                      <div className={styles.about__titleItem}>Your World View</div>
                      <p>
                        We start by assessing your views of our future world. Will the world have flying taxis? How will
                        global warming affect the Earth? Do you foresee medical advances extending life?
                      </p>
                    </div>
                    <div className={`${styles.about__item} ${styles.about__item3}`}>
                      <div className={styles.about__itemNumber}>3</div>
                      <div className={styles.about__titleItem}>Your Lifestyle</div>
                      <p>
                        Job, family and education planning,
                        your current investments and risk
                        tolerance level are among many
                        important lifestyle factors that can
                        impact an investment strategy
                        that works best for you.
                      </p>
                    </div>
                  </div>
                  <div className={`${styles.about__col} ${styles.about__colRight}`}>
                    <div className={`${styles.about__item} ${styles.about__item2}`}>
                      <div className={styles.about__itemNumber}>2</div>
                      <div className={styles.about__titleItem}>Your Interests</div>
                      <p>
                        We look at your personal interests, from gardening to real estate, and allow you to pepper your
                        portfolio for further customization.
                      </p>
                    </div>
                    <div className={`${styles.about__item} ${styles.about__item4}`}>
                      <div className={styles.about__itemNumber}>4</div>
                      <div className={styles.about__titleItem}>Your Portfolio</div>
                      <p>
                        <span>
                          All of your information goes through multiple levels of algorithms, and you’re presented with
                        a mix of funds recommended just for you. We also show you what our experts have selected,
                        based on their research. You can adjust your fund mix further to your liking.
                        </span>
                        Brains provides you with all of the tools and guidance you need to create your own portfolio!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='panel mb-4'>
              <div className={styles.costInfo}>
                <div className={styles.costInfo__container}>
                  <div className={styles.costInfo__info}>
                    <h2 className={styles.costInfo__title}>
                      And Membership Only Costs One
                      Vanilla Latte (with soy milk) Per Month
                    </h2>
                    <p className={styles.costInfo__text}>
                      It’s true, your only cost to invest with Brains is $5 per month,
                      as much as one of your fancy coffees! Your membership fees include…
                    </p>
                    <ul className={styles.costInfo__list}>
                      <li className={styles.costInfo__listItem}>Investing in our exclusive funds that aren’t offered
                        anywhere
                        else (with no hidden fund charges, nothing. Seriously.)
                      </li>
                      <li className={styles.costInfo__listItem}>Full use of our Discussion Board and Library.</li>
                      <li className={styles.costInfo__listItem}>Alerts when world events occur with commentary
                        on how they may affect your portfolio.
                      </li>
                    </ul>
                    <p className={styles.costInfo__text}>
                      And occasionally we will offer you investment options in non-Brains
                      funds that we feel you might be interested in. Some of these non-Brains
                      funds might have small fees that go to the companies offering them.
                      We’ll always let you know which funds these are and how much they charge.
                    </p>
                  </div>
                  <div className={styles.costInfo__img}>
                    <img src={costImage} alt=''/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  showAlert,
}, dispatch);

export default connect(null, mapDispatchToProps)(MemberBenefitsView);
