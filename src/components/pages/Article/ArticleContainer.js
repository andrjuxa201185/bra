import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { withRouter } from 'react-router-dom';
import ArticleView from './ArticleView';
import {getArticle} from "../../../store/library/libraryActions";
import {globals} from "../../../store/globals";
import {createPost} from "../../../store/posts/postsActions";
import {showAlert} from "../../../store/alert/alertActions";

class ArticleContainer extends Component {
  state = {
    isTopicModalOpen: false,
  };

  goBack = e => {
    e.preventDefault();
    globals.history.goBack();
  };

  handleShowTopicModal = () => {
    this.setState({isTopicModalOpen: true});
    // if (this.props.userProfile.data.utype === 0) {
    //   this.setState({isTopicModalOpen: true});
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

  componentDidMount() {
    const { getArticle, match } = this.props;
    getArticle(match.params.id);
  }

  render() {
    const {articleData, createPost, postError} = this.props;
    if (!articleData.length) return null;

    return (
      <ArticleView
        isTopicModalOpen={this.state.isTopicModalOpen}
        showTopicModal={this.handleShowTopicModal}
        hideTopicModal={this.handleHideTopicModal}
        articleData={articleData[0]}
        onBack={this.goBack}
        createPost={createPost}
        postError={postError}
      />
    );
  }

}

ArticleContainer.propTypes = {
  getArticle: PropTypes.func.isRequired,
  articleData: PropTypes.array,
  createPost: PropTypes.func.isRequired,
  match: PropTypes.object,
};

const mapStateToProps = ({
   library: {article: {articleData}},
   posts: { error },
   userProfile,
 }) => ({
  articleData,
  postError: error,
  userProfile,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getArticle: getArticle.request,
  createPost: createPost.request,
  showAlert,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleContainer));
