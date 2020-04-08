import React from 'react';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import DiscussionBoardView from './DiscussionBoardView';
import {getCategories} from "../../../store/categories/categoriesActions";
import {getPostsData, createPost} from "../../../store/posts/postsActions";
import {getAutocomplete} from "../../../store/autocomplete/autocompleteActions";
import {showAlert} from "../../../store/alert/alertActions";

class DiscussionBoardContainer extends React.Component {
  static propTypes = {
    categoriesData: PropTypes.array.isRequired,
    categoriesDataStatus: PropTypes.object.isRequired,
    postsData: PropTypes.array,
    postsDataStatus: PropTypes.object.isRequired,
    myDiscussions: PropTypes.array,
    hotDiscussions: PropTypes.array,
    nextPostsLink: PropTypes.string,
    getCategories: PropTypes.func.isRequired,
    getPostsData: PropTypes.func.isRequired,
    autocompleteData: PropTypes.array,
    getAutocomplete: PropTypes.func.isRequired,
    createPost: PropTypes.func.isRequired,
  };

  state = {
    isMoreMenuOpen: false,
    isTopicModalOpen: false,
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

  handleShowTopicModal = () => {
    this.setState({isTopicModalOpen: true});
    this.handleDropMenuClose();
    // if (this.props.user.utype !== 0) {
    //   this.setState({isTopicModalOpen: true});
    //   this.handleDropMenuClose();
    // } else {
    //   this.props.showAlert({
    //     title: 'Warning',
    //     msg: 'Уou are not allowed to create a discussion',
    //   });
    // }
  };

  handleHideTopicModal = () => {
    this.setState({isTopicModalOpen: false});
  };

  handleGetNextPosts = link => e => {
    e.preventDefault();
    this.props.getPostsData({link});
  };

  getPostsByCategory = categoryId => {
    this.setState({categoryId});
  };

  handleSortPosts = query => () => {
    this.setState({sortQuery: query});
  };

  handleSearch = query => {
    this.setState({searchQuery: query});
    if (query.length > 2) {
      this.props.getAutocomplete('/discussion/posts', query);
    }
  };

  componentDidMount() {
    if (!this.props.categoriesDataStatus.loaded) {
      this.props.getCategories();
    }
    this.props.getPostsData();
  }

  componentDidUpdate(prevProps, prevState) {
    const { categoryId, sortQuery } = this.state;
    if (categoryId !== prevState.categoryId || sortQuery !== prevState.sortQuery) {
      this.props.getPostsData({ categoryId, sortQuery });
    }
  }

  render() {
    const {
      categoriesData,
      categoriesDataStatus,
      postsData,
      postsDataStatus,
      myDiscussions,
      hotDiscussions,
      nextPostsLink,
      autocompleteData,
      createPost,
      error} = this.props;

    return (
      <DiscussionBoardView
        onDropMenuOpen={this.handleDropMenuOpen}
        isMoreMenuOpen={this.state.isMoreMenuOpen}
        isTopicModalOpen={this.state.isTopicModalOpen}
        showTopicModal={this.handleShowTopicModal}
        hideTopicModal={this.handleHideTopicModal}
        onDropMenuClose={this.handleDropMenuClose}

        categoriesData={categoriesData}
        categoriesDataStatus={categoriesDataStatus}
        categoryId={this.state.categoryId}
        postsData={postsData}
        postsDataStatus={postsDataStatus}
        myDiscussions={myDiscussions}
        hotTopics={hotDiscussions}
        onGetPostsByCategory={this.getPostsByCategory}
        onSortPosts={this.handleSortPosts}
        onGetNextPosts={this.handleGetNextPosts}
        nextPostsLink={nextPostsLink}
        searchValue={this.state.searchQuery}
        onSearch={this.handleSearch}
        autocompleteData={autocompleteData}
        createPost={createPost}
        error={error}
      />
    );
  }
}

const mapStateToProps = ({
    categories: {categoriesData, categoriesDataStatus},
    posts: {postsData, postsDataStatus, nextPostsLink, myDiscussions, hotDiscussions, error},
    autocomplete: {autocompleteData},
    userProfile: {data},
  }) => ({
    categoriesData,
    categoriesDataStatus,
    postsData,
    postsDataStatus,
    myDiscussions,
    hotDiscussions,
    nextPostsLink,
    autocompleteData,
    error,
    user: data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getCategories: getCategories.request,
  getPostsData: getPostsData.request,
  getAutocomplete: getAutocomplete.request,
  createPost: createPost.request,
  showAlert,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DiscussionBoardContainer);

