import React from 'react';
import PropTypes from 'prop-types';
import styles from './DiscussionStyles.scss';
import DiscussionPost from './parts/DiscussionPost';
import DiscussionComment from './parts/DiscussionComment';
import PostEditor from './parts/PostEditor';
import {CreateTopicModal, DropDownMenu} from '../../common';
import MoreIcon from '../../../assets/images/round.svg';
import {Button} from "../../controls";
import {DOMAIN_LANDING_URL} from "../../../service/apiConstants";

class DiscussionView extends React.Component {
  static propTypes = {
    postComments: PropTypes.array,
    isMoreMenuOpen: PropTypes.bool.isRequired,
    onDropMenuOpen: PropTypes.func.isRequired,
    isTopicModalOpen: PropTypes.bool.isRequired,
    mainTopic: PropTypes.object.isRequired,
    user: PropTypes.object,
    nextCommentsLink: PropTypes.string,
    replyCommentId: PropTypes.number,
    categoriesData: PropTypes.array.isRequired,
    showTopicModal: PropTypes.func.isRequired,
    hideTopicModal: PropTypes.func.isRequired,
    onGetNextComments: PropTypes.func.isRequired,
    getPostComments: PropTypes.func.isRequired,
    setReplyCommentId: PropTypes.func.isRequired,
    createPost: PropTypes.func.isRequired,
    onCommentCreate:  PropTypes.func.isRequired,
  };

  handleCommentCreate = (discussionId, parentId) => text => {
    this.props.onCommentCreate({ discussionId, parentId, text });
    this.props.setReplyCommentId(null)();
  };

  render() {
    const {
      postComments,
      mainTopic,
      onDropMenuOpen,
      onDropMenuClose,
      isMoreMenuOpen,
      isTopicModalOpen,
      showTopicModal,
      hideTopicModal,
      nextCommentsLink,
      onGetNextComments,
      getPostComments,
      replyCommentId,
      setReplyCommentId,
      categoriesData,
      createPost,
      error,
      errorComment,
      user,
      onBack} = this.props;
    return (
      <div className={styles.discussion}>
        <div className='topPanel'>
          <div className='contentContainer'>
            <div className='d-flex justify-content-between align-items-center'>
              <h1>Discussion</h1>
              <DropDownMenu
                menuIsOpen={isMoreMenuOpen}
                onClose={onDropMenuClose}
                size={'lg'}
                dropListData={[
                  {text: 'Create a Topic', handler: showTopicModal},
                  {text: 'Board Guide', linkTo: `${DOMAIN_LANDING_URL}/discussion-board-library.php`},
                ]}>
                <div className={styles.moreButton} onClick={onDropMenuOpen}>
                  <span>more</span>
                  <MoreIcon />
                </div>
              </DropDownMenu>
            </div>
          </div>
        </div>
        <div className='mainContent'>
          <div className='contentContainer'>
            <div className={styles.discussion__topPanel}>
              <h2 className={styles.discussion__title}>
                {mainTopic.category.name}
              </h2>
            </div>
            <div className={styles.disscussions}>
              <DiscussionPost data={mainTopic}/>
              {/*{user.utype !== 0 && <PostEditor user={user} error={errorComment} onCreate={this.handleCommentCreate(mainTopic.id)} />}*/}
              <PostEditor user={user} error={errorComment} onCreate={this.handleCommentCreate(mainTopic.id)} />
              {postComments.length ? postComments.map(item => (
                <div key={item.id}>
                  <DiscussionComment data={item} onReply={setReplyCommentId} user={user}/>
                  {replyCommentId === item.id && user.utype !== 0 && <PostEditor error={errorComment} onCreate={this.handleCommentCreate(mainTopic.id, item.id)} user={user}/>}
                  {/*<PostEditor error={errorComment} onCreate={this.handleCommentCreate(mainTopic.id, item.id)} user={user}/>*/}
                  {item.sub_comments.length ? item.sub_comments.map(subComment => (
                    <DiscussionComment data={subComment} key={subComment.id} subComment/>)): ''}
                  {item.sub_comments_pagination.next && <div className='d-flex justify-content-end mb-4'>
                    <div className={styles.loadmoreComments}>
                      <Button
                        title={'See More Comments'}
                        size={'sm'}
                        onClick={() => getPostComments({link: item.sub_comments_pagination.next, parentId: item.id})}
                        transparent
                      />
                    </div>
                  </div>}
                </div>
              )): ''}
              {nextCommentsLink && <div className='d-flex justify-content-center'>
                <div className={styles.loadmore}>
                  <Button
                    title={'Load More'}
                    size={'md'}
                    onClick={onGetNextComments(nextCommentsLink)}
                  />
                </div>
              </div>}
            </div>
            <div className={styles.back}>
              <Button
                title='Back'
                size='md'
                transparent
                onClick={onBack}
              />
            </div>
          </div>

        </div>
        <CreateTopicModal
          title={'Create a Topic'}
          isOpen={isTopicModalOpen}
          hideTopicModal={hideTopicModal}
          categoriesData={categoriesData}
          createPost={createPost}
          error={error}/>
      </div>);
  }
}

export default DiscussionView;
