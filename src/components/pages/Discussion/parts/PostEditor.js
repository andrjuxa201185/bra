import React from 'react';
import PropTypes from 'prop-types';
import styles from './DiscussionPostStyles.scss';
import { Button, Textarea } from '../../../controls';
import avatarImage from "../../../../assets/images/icons/user.png";

import ReactQuill from 'react-quill';

class PostEditor extends React.Component {
  static propTypes = {
    userName: PropTypes.string,
    userImage: PropTypes.string,
    onCreate: PropTypes.func.isRequired,
  };

  state = {
    text: '',
  };

  toolbarOptions = [
    [
      'bold', 'italic', 'underline', 'strike',
    ],
    [{ 'align': []}],
    [
      'link', { 'color': []}, //'image',
    ],
  ];

  handleChange = value => {
    this.setState({ text: value });
  };

  handleChangeTextarea = e => {
    this.setState({ text: e.target.value });
  }

  handleSubmit = () => {
    this.props.onCreate(this.state.text);
    this.setState({text: ''});
  };

  render() {
    const {user, error } = this.props;
    const { errors = {} } = error;
    const userAvatar = user && user.image || avatarImage;
    const userFirstName = user && user.first_name;
    const userLastName = user && user.last_name;

    return (
      <div className='panel mb-4'>
        <div className={styles.postEditor}>
          <div className={styles.post__body}>
            <div className={styles.post__image}>
              <img src={userAvatar} alt=''/>
            </div>
            <div className={styles.post__info}>
              <div className={styles.post__header}>
                <div className={styles.post__headerCol}>
                  <div className={`${styles.post__detailItem} ${styles.post__userName}`}>{userFirstName} {userLastName}</div>
                </div>
              </div>
              <div className={styles.post__content}>
                <div className={styles.textEditor}>
                  {/*<ReactQuill*/}
                  {/*  placeholder='Type your comment here'*/}
                  {/*  value={this.state.text}*/}
                  {/*  onChange={this.handleChange}*/}
                  {/*  modules={{toolbar: this.toolbarOptions}}*/}
                  {/*/>*/}
                  <Textarea
                    placeholder='Type your comment here'
                    value={this.state.text}
                    onChange={this.handleChangeTextarea}
                  />
                  <span className={styles.error}>{errors.text && errors.text[0]}</span>
                </div>
                <div className='d-flex justify-content-end'>
                  <div className={styles.postButton}>
                    <Button
                      onClick={this.handleSubmit}
                      style={'primal'}
                      title={'Post'}
                      transparent
                      size={'md'}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>);
  }
}

export default PostEditor;
