import React from 'react';
import { Button } from '../../controls';
import styles from './ArticleStyles.scss';
import PropTypes from "prop-types";
import {CreateTopicModal} from "../../common";

const ArticleView = ({
  isTopicModalOpen,
  showTopicModal,
  hideTopicModal,
  articleData,
  onBack,
  createPost,
  postError}) => {
  return (
    <>
      <div className='topPanel'>
        <div className='contentContainer'>
          <h1>Research Library</h1>
        </div>
      </div>
      <div className='mainContent'>
        <div className='contentContainer'>
          <div className={styles.container}>
            <div className={styles.photo}>
              <img src={articleData.image} alt=''/>
            </div>

            <div className='d-flex align-items-start justify-content-between'>
              <div className={styles.cat}>{articleData.category.name}</div>
              <div className={styles.discuss}>
                <Button
                  title='Discuss'
                  size='sm'
                  transparent
                  onClick={showTopicModal}
                />
              </div>
            </div>

            <div className={styles.title}>
              {articleData.name}
            </div>
            <div className={styles.summary}>
              {articleData.summary}
            </div>
            <div className={styles.date}>
              {new Date(articleData.date).toLocaleString()}
            </div>
            <div className={styles.author}>
              {articleData.author}
            </div>
            <div className={styles.content} dangerouslySetInnerHTML={{__html: articleData.publication}}>
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
      </div>
      <CreateTopicModal
        title={'Discuss Article'}
        isOpen={isTopicModalOpen}
        hideTopicModal={hideTopicModal}
        articleId={articleData.id}
        categoriesData={[articleData.category.id]}
        nameTopic={articleData.name}
        createPost={createPost}
        error={postError}/>
    </>
  );
};

ArticleView.propTypes = {
  isTopicModalOpen: PropTypes.bool.isRequired,
  showTopicModal: PropTypes.func.isRequired,
  hideTopicModal: PropTypes.func.isRequired,
  articleData: PropTypes.object,
  onBack: PropTypes.func,
  createPost: PropTypes.func.isRequired,
};

export default ArticleView;
