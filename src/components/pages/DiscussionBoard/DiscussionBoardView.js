import React from 'react';
import PropTypes from 'prop-types';
import styles from './DiscussionBoardStyles.scss';
import {List, DropDownInfo, DropDownMenu, CreateTopicModal, OopsView} from '../../common';
import {Button, TabButtons, Search} from '../../controls';
import DiscussionTopic from './parts/DiscussionTopic';
import MoreIcon from '../../../assets/images/round.svg';
import {DOMAIN_LANDING_URL} from "../../../service/apiConstants";

class DiscussionBoardView extends React.Component {
  static propTypes = {
    //data
    categoriesData: PropTypes.array.isRequired,
    categoriesDataStatus: PropTypes.object.isRequired,
    categoryId: PropTypes.number,
    postsData: PropTypes.array,
    postsDataStatus: PropTypes.object.isRequired,
    nextPostsLink: PropTypes.string,
    myDiscussions: PropTypes.array,
    hotTopics: PropTypes.array,
    isMoreMenuOpen: PropTypes.bool.isRequired,
    isTopicModalOpen: PropTypes.bool.isRequired,
    //handlers
    showTopicModal: PropTypes.func.isRequired,
    onDropMenuOpen: PropTypes.func.isRequired,
    hideTopicModal: PropTypes.func.isRequired,
    onSortPosts: PropTypes.func.isRequired,
    onGetNextPosts: PropTypes.func.isRequired,
    onGetPostsByCategory: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    searchValue: PropTypes.string,
    autocompleteData: PropTypes.array,
    createPost: PropTypes.func.isRequired,
  };

  render() {
    const {
      categoriesData,
      categoriesDataStatus,
      categoryId,
      postsData,
      postsDataStatus,
      myDiscussions,
      hotTopics,
      onDropMenuOpen,
      onDropMenuClose,
      isMoreMenuOpen,
      isTopicModalOpen,
      showTopicModal,
      hideTopicModal,
      onSortPosts,
      onGetNextPosts,
      nextPostsLink,
      onGetPostsByCategory,
      onSearch,
      searchValue,
      autocompleteData,
      createPost,
      error,
    } = this.props;

    if (postsDataStatus.fail || categoriesDataStatus.fail) {
      return <OopsView />;
    }

    return (
      <div className={styles.discussionBoard}>
        <div className='topPanel'>
          <div className='contentContainer'>
            <div className='d-flex justify-content-between align-items-center'>
              <h1>Discussion Board</h1>
              <DropDownMenu
                menuIsOpen={isMoreMenuOpen}
                onClose={onDropMenuClose}
                size={'lg'}
                dropListData={[
                  {text: 'Create a Topic', handler: showTopicModal},
                  {text: 'Board Guide', linkTo: `${DOMAIN_LANDING_URL}/discussion-board-library.php`},
                  {text: 'Sort By Latest', handler: onSortPosts('latest')},
                  {text: 'Sort by Most Discussed', handler: onSortPosts('discussed')},
                  {text: 'Sort by most Viewed', handler: onSortPosts('viewed')},
                ]}>
                <div className={styles.moreButton} onClick={onDropMenuOpen}>
                  <span>more</span>
                  <MoreIcon />
                </div>
              </DropDownMenu>
            </div>
            <TabButtons buttons={categoriesData} onClick={onGetPostsByCategory} />
          </div>
        </div>

        <div className='mainContent'>
          <div className='contentContainer'>

            <DropDownInfo
              title={'Brains Expert Assessment'}
              subtitle={` / ${categoriesData.length && categoriesData.find(category => category.id === categoryId).name}`}
              text={categoriesData.length && categoriesData.find(category => category.id === categoryId).definition}
            />

            <div className='d-flex flex-wrap'>
              <div className='col-md-8'>
                <Search
                  onSearch={onSearch}
                  searchValue={searchValue}
                  autocompleteData={autocompleteData}
                  path={'discussion-board/comments'}
                />
                <div className='panel mb-4'>
                  <div className={styles.disscussionTopics}>
                    {postsData && postsData.map(item => (
                      <DiscussionTopic data={item} key={item.id}/>
                    ))}
                  </div>
                </div>
                {nextPostsLink && <div className={styles.button}>
                  <Button
                    onClick={onGetNextPosts(nextPostsLink)}
                    style={'primal'}
                    size={'md'}
                    title={'Load More'}
                    transparent
                    disabled={!nextPostsLink}/>
                </div>}
              </div>

              <div className='col-md-4'>
                <div className={styles.discussionNews}>
                  <div className={styles.discussionNews__item}>
                    <h3>My Discussions</h3>
                    <div className='panel'>
                      <div className={styles.discussionList}>
                        {myDiscussions.length ? <List data={myDiscussions} path={'discussion-board/comments'}/> : <p>You have no discussions yet...</p>}
                      </div>
                    </div>
                  </div>
                  <div className={styles.discussionNews__item}>
                    <h3>Hot Topics</h3>
                    <div className='panel'>
                      <div className={styles.discussionList}>
                        {hotTopics.length ? <List data={hotTopics} path={'discussion-board/comments'}/> : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <CreateTopicModal
          title={'Create a Topic'}
          isOpen={isTopicModalOpen}
          hideTopicModal={hideTopicModal}
          categoriesData={categoriesData.slice(1)}
          createPost={createPost}
          error={error}/>
      </div>
    );
  }
}

export default DiscussionBoardView;
