import React from 'react';
import PropTypes from "prop-types";
import styles from './DiscussionTopicStyles.scss';
import {Link} from "react-router-dom";
import TimeIcon from '../../../../assets/images/icons/time.svg';
import ViewsIcon from '../../../../assets/images/icons/views.svg';
import CommentIcon from '../../../../assets/images/icons/comment.svg';
import avatarImage from '../../../../assets/images/icons/user.png';
import { format, distanceInWordsToNow, startOfYesterday } from 'date-fns';

class DiscussionTopic extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  render() {
    const { data } = this.props;
    const createdTime = +data.created_at * 1000;
    const dateToShow = createdTime < startOfYesterday() ? format(createdTime, 'MM/DD/YYYY') : distanceInWordsToNow(createdTime, {addSuffix: true});

    return (
      <div className={styles.topic} key={data.id}>

        <Link to={`discussion-board/comments/${data.id}`} className={styles.topic__image}>
          <img src={data.user.image || avatarImage} alt='user-image'/>
        </Link>

        <div className={styles.topic__info}>
          <Link to={`discussion-board/comments/${data.id}`} className={styles.topic__name}>{data.name}</Link>

          <div className={styles.topic__details}>

            <div className={styles.topic__detailsCol}>
              <div className={`${styles.topic__detailItem} ${styles.topic__userName}`}>{data.user.author}</div>
            </div>

            <div className={styles.topic__detailsCol}>
              <div className={`${styles.topic__detailItem} ${styles.topic__time}`}>
                <TimeIcon/>
                <span>{dateToShow}</span>
              </div>

              <div className={`${styles.topic__detailItem} ${styles.topic__views}`}>
                <ViewsIcon/>
                <span>{data.views_count}</span>
              </div>

              <div className={`${styles.topic__detailItem} ${styles.topic__comments}`}>
                <CommentIcon/>
                <span>{data.comments_count}</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    );
  }
}

export default DiscussionTopic;
