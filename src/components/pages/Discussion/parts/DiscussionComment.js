import React from 'react';
import PropTypes from 'prop-types';
import styles from './DiscussionPostStyles.scss';
import avatarImage from '../../../../assets/images/icons/user.png';

import CommentIcon from '../../../../assets/images/icons/comment.svg';
import {distanceInWordsToNow, format, startOfYesterday} from "date-fns";

class DiscussionComment extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    subComment: PropTypes.bool,
    onReply: PropTypes.func,
  };

  render() {
    const { data, subComment, onReply, user } = this.props;
    const createdTime = +data.created_at * 1000;
    const dateToShow = createdTime < startOfYesterday() ? format(createdTime, 'MM/DD/YYYY') : distanceInWordsToNow(createdTime, {addSuffix: true});

    return (
      <div className={`panel mb-4 ${subComment ? styles.reply : ''}`}>
        <div className={styles.post}>
          <div className={styles.post__body}>
            <div className={styles.post__image}>
              <img src={data.user.image || avatarImage} alt=''/>
            </div>
            <div className={styles.post__info}>
              <div className={styles.post__header}>
                <div className={styles.post__headerCol}>
                  <div className={`${styles.post__detailItem} ${styles.post__userName}`}>{data.user.author}</div>
                </div>
                <div className={styles.post__headerCol}>
                  <div className={styles.post__time}>Posted: {dateToShow}</div>
                </div>
              </div>
              <div className={styles.post__content}>
                <div className={styles.post__text} dangerouslySetInnerHTML={{__html: data.text}} />
              </div>
            </div>
          </div>
          { !subComment && <div className={styles.comment__footer}>
            <div className={styles.post__footerCol}>
              {/*{user.utype !== 0 && <div className={styles.post__link} onClick={onReply(data.id)}>Reply</div>}*/}
              <div className={styles.post__link} onClick={onReply(data.id)}>Reply</div>
            </div>
            <div className={styles.post__footerCol}>
              {data.sub_comments && <div className={`${styles.post__detailItem} ${styles.post__comments}`}>
                <CommentIcon/>
                <span>{data.comments_count}</span>
              </div>}
            </div>
          </div>}
        </div>
      </div>);
  }
}

export default DiscussionComment;
