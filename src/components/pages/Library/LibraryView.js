import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {Button, TabButtons, Search} from '../../controls';
import {DropDownInfo, DropDownMenu, OopsView} from '../../common';
import styles from './LibraryStyles.scss';
import MoreIcon from '../../../assets/images/round.svg';

const LibraryView = ({
  onDropMenuOpen,
  onDropMenuClose,
  isMoreMenuOpen,
  categoriesData,
  categoriesDataStatus,
  categoryId,
  libraryData,
  libraryDataStatus,
  onGetNextArticles,
  nextArticlesLink,
  onSortArticles,
  onSearch,
  searchValue,
  onGetArticlesByCategory,
  autocompleteData}) => {
  if (libraryDataStatus.fail || categoriesDataStatus.fail) {
    return <OopsView />;
  }

  return (
    <>
      <div className='topPanel'>
        <div className='contentContainer'>
          <div className='d-flex justify-content-between align-items-center'>
            <h1>Research Library</h1>
            <DropDownMenu
              menuIsOpen={isMoreMenuOpen}
              onClose={onDropMenuClose}
              size={'lg'}
              dropListData={[
                {text: 'Sort By Latest', handler: onSortArticles('latest')},
                {text: 'Sort by most Viewed', handler: onSortArticles('viewed')},
              ]}>
              <div className={styles.moreButton} onClick={onDropMenuOpen}>
                <span>more</span>
                <MoreIcon />
              </div>
            </DropDownMenu>
          </div>
          <TabButtons buttons={categoriesData} onClick={onGetArticlesByCategory} />
        </div>
      </div>
      <div className='mainContent'>
        <div className='contentContainer'>
          <DropDownInfo
            title={'Brains Expert Assessment'}
            subtitle={` / ${categoriesData.length && categoriesData.find(category => category.id === categoryId).name}`}
            text={categoriesData.length && categoriesData.find(category => category.id === categoryId).definition}
          />
          <Search
            onSearch={onSearch}
            searchValue={searchValue}
            autocompleteData={autocompleteData}
            path={'library/article'}/>

          <div className='d-flex flex-wrap'>
            {libraryData.length ? libraryData.map(article => {
              return (
                <div key={article.id} className='col-md-4 col-sm-6'>
                  <article className={styles.article}>
                    <Link to={`library/article/${article.id}`} className={styles.article__img}>
                      <img src={article.image} alt='img'/>
                    </Link>
                    <div className={styles.article__cat}>
                      {article.category.name}
                    </div>
                    <Link to={`library/article/${article.id}`} className={styles.article__title}>
                      {article.name}
                    </Link>
                  </article>
                </div>
              );
            }): null}
          </div>
          <div className='d-flex justify-content-center'>
            <div className={styles.loadmore}>
              <Button
                title={'Load More'}
                size={'md'}
                onClick={onGetNextArticles(nextArticlesLink)}
                disabled={!nextArticlesLink}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

LibraryView.propTypes = {
  //data
  isMoreMenuOpen: PropTypes.bool.isRequired,
  categoriesData: PropTypes.array,
  libraryData: PropTypes.array,
  nextArticlesLink: PropTypes.string,
  searchValue: PropTypes.string,
  autocompleteData: PropTypes.array,
  categoryId: PropTypes.number,
  categoriesDataStatus: PropTypes.object,
  libraryDataStatus: PropTypes.object,
  //handlers
  onDropMenuOpen: PropTypes.func.isRequired,
  onGetNextArticles: PropTypes.func.isRequired,
  onSortArticles: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onGetArticlesByCategory: PropTypes.func.isRequired,
  getLibraryData: PropTypes.func,
};

export default LibraryView;
