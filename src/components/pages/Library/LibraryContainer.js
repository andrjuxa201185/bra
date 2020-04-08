import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import LibraryView from './LibraryView';
import {getCategories} from "../../../store/categories/categoriesActions";
import {getLibraryData} from "../../../store/library/libraryActions";
import {getAutocomplete} from "../../../store/autocomplete/autocompleteActions";

class LibraryContainer extends Component {
  static propTypes = {
    categoriesData: PropTypes.array.isRequired,
    categoriesDataStatus: PropTypes.object.isRequired,
    libraryData: PropTypes.array.isRequired,
    libraryDataStatus: PropTypes.object.isRequired,
    getCategories: PropTypes.func.isRequired,
    getLibraryData: PropTypes.func.isRequired,
    nextArticlesLink: PropTypes.string,
  };

  state = {
    isMoreMenuOpen: false,
    sortQuery: '',
    searchQuery: '',
    categoryId: 0,
  };

  handleDropMenuOpen = () => {
    this.setState(state => ({
      isMoreMenuOpen: !state.isMoreMenuOpen,
    }));
  };

  handleDropMenuClose = () => {
    this.setState({
      isMoreMenuOpen: false,
    });
  };

  handleGetNextArticles = link => e => {
    e.preventDefault();
    this.props.getLibraryData({link});
  };

  getArticlesByCategory = categoryId => {
    this.setState({categoryId});
  };

  handleSortArticles = query => () => {
    this.setState({sortQuery: query});
  };

  handleSearch = query => {
    this.setState({searchQuery: query});
    if (query.length > 2) {
      this.props.getAutocomplete('/library/articles', query);
    }
  };

  componentDidMount() {
    if (!this.props.categoriesDataStatus.loaded) {
      this.props.getCategories();
    }
    this.props.getLibraryData();
  }

  componentDidUpdate(prevProps, prevState) {
    const { categoryId, sortQuery } = this.state;
    if (categoryId !== prevState.categoryId || sortQuery !== prevState.sortQuery) {
      this.props.getLibraryData({ categoryId, sortQuery });
    }
  }

  render() {
    const {
      categoriesData,
      categoriesDataStatus,
      libraryData,
      libraryDataStatus,
      getLibraryData,
      nextArticlesLink,
      autocompleteData} = this.props;
    return (
      <LibraryView
        //data
        isMoreMenuOpen={this.state.isMoreMenuOpen}
        categoriesData={categoriesData}
        categoriesDataStatus={categoriesDataStatus}
        libraryData={libraryData}
        libraryDataStatus={libraryDataStatus}
        sortQuery={this.state.sortQuery}
        nextArticlesLink={nextArticlesLink}
        autocompleteData={autocompleteData}
        categoryId={this.state.categoryId}
        searchValue={this.state.searchQuery}
        //handlers
        onDropMenuOpen={this.handleDropMenuOpen}
        onDropMenuClose={this.handleDropMenuClose}
        getLibraryData={getLibraryData}
        onGetArticlesByCategory={this.getArticlesByCategory}
        onSortArticles={this.handleSortArticles}
        onGetNextArticles={this.handleGetNextArticles}
        onSearch={this.handleSearch}
      />
    );
  }
}

LibraryContainer.propTypes = {
  //data
  categoriesData: PropTypes.array,
  libraryData: PropTypes.array,
  autocompleteData: PropTypes.array,
  //actions
  getCategories: PropTypes.func.isRequired,
  getLibraryData: PropTypes.func.isRequired,
  getAutocomplete: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  categories: {categoriesData, categoriesDataStatus},
  library: {libraryData, libraryDataStatus, nextArticlesLink},
  autocomplete: {autocompleteData},
}) => ({
  categoriesData,
  categoriesDataStatus,
  libraryData,
  libraryDataStatus,
  nextArticlesLink,
  autocompleteData,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getCategories: getCategories.request,
  getLibraryData: getLibraryData.request,
  getAutocomplete: getAutocomplete.request,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LibraryContainer);
