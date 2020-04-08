import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import { Button, Input } from "../../controls";
import styles from './ReferFriendStyles.scss';

class ReferFriendView extends Component {
  render() {
    const {
      onInputChange,
      emails,
      onAddClick,
      maxItems,
      onSubmit,
      errors,
    } = this.props;
    return (
      <>
        <div className='topPanel'>
          <div className='contentContainer'>
            <h1>Refer a Friend</h1>
          </div>
        </div>
        <div className='mainContent'>
          <div className='contentContainer'>
            <div className='panel'>
              <div className={styles.send}>
                <div className={styles.send__img}>
                  <img src={require('../../../assets/images/icons/presentBox.png')} alt='present'/>
                </div>
                <h2 className={styles.send__title}>
                  Give the Gift of Brains to All of Your Friends and Earn 100 for Each Friend!
                </h2>
                <p className={styles.send__text}>
                  Just add your friends’ emails below and we’ll send them an invite.
                  You can list 10 emails here and start again to add more if you wish.
                </p>
                <p className={`${styles.send__text} ${styles.send__textInfo}`}>
                  *You will receive 50 in your Brains account for each of your
                  referred friends after they’ve been a Brains Member for one year.
                </p>
                <div className={styles.send__form}>
                  {Object.values(emails).map((item, i) => (
                    <>
                      <div key={i} className={`mb-4 ${styles.inputWrapper}`}>
                        <Input
                          value={item.email}
                          placeholder={'Your Friend\'s Email'}
                          onChange={onInputChange(i)}
                          error={errors.length && errors.find(item => item.index == i) && errors.find(item => item.index == i).value}
                        />
                        {Object.values(emails).length === i + 1 && !maxItems &&
                          <div className={styles.addBtn} onClick={onAddClick}>+</div>
                        }
                      </div>
                    </>
                  ))
                  }
                  {maxItems && <div className={styles.send__info}>You can send invites and try again!</div>}
                  <Button
                    onClick={onSubmit}
                    title='Send Invites'
                  />
                </div>
                <div className={styles.send__separator}/>
              </div>

            </div>
          </div>
        </div>
      </>
    );
  }
}

ReferFriendView.propTypes = {

};

// const mapDispatchToProps = dispatch => bindActionCreators({
//
// }, dispatch);

export default connect(null)(ReferFriendView);
