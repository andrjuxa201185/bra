import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";
import {Spinner} from '../../controls';
import DiscussionView from './DiscussionView';
import {getPostComments, createPostComment, createPost} from "../../../store/posts/postsActions";
import {getCategories} from "../../../store/categories/categoriesActions";
import {globals} from "../../../store/globals";
import {showAlert} from "../../../store/alert/alertActions";

class DiscussionContainer extends React.Component {

  static propTypes = {
    comments: PropTypes.array,
    mainTopic: PropTypes.object,
    postCommentsStatus: PropTypes.object,
    nextCommentsLink: PropTypes.string,
    showTopicModal: PropTypes.func,
    getPostComments: PropTypes.func,
    userAvatar: PropTypes.string,
    userName: PropTypes.string,
    getCategories: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    createComment: PropTypes.func.isRequired,
    categoriesData: PropTypes.array,
    createPost: PropTypes.func.isRequired,
  };

  state = {
    isMoreMenuOpen: false,
    isTopicModalOpen: false,
    replyCommentId: null,
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

  handleGetNextComments = link => e => {
    e.preventDefault();
    this.props.getPostComments({link});
  };

  setReplyCommentId = id => () => {
    this.setState({replyCommentId: id});
  };

  fetchPostComments = () => {
    const { getPostComments, match } = this.props;
    const discussionId = match.params.id;
    getPostComments({ discussionId });
  };

  goBack = e => {
    e.preventDefault();
    globals.history.goBack();
  };

  componentDidMount() {
    this.fetchPostComments();
    if (!this.props.categoriesDataStatus.loaded) {
      this.props.getCategories();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.fetchPostComments();
    }
  }

  render() {
    const {
      comments,
      mainTopic,
      userAvatar,
      userFirstName,
      userLastName,
      nextCommentsLink,
      postCommentsStatus,
      getPostComments,
      createComment,
      categoriesData,
      createPost,
      error,
      errorComment,
      user} = this.props;
    if (!mainTopic) return <Spinner size={'lg'}/>;
    return (
      <DiscussionView
        postComments={comments}
        mainTopic={mainTopic}
        onDropMenuOpen={this.handleDropMenuOpen}
        onDropMenuClose={this.handleDropMenuClose}
        isMoreMenuOpen={this.state.isMoreMenuOpen}
        isTopicModalOpen={this.state.isTopicModalOpen}
        showTopicModal={this.handleShowTopicModal}
        hideTopicModal={this.handleHideTopicModal}
        user={user}
        userAvatar={userAvatar}
        userFirstName={userFirstName}
        userLastName={userLastName}
        nextCommentsLink={nextCommentsLink}
        onGetNextComments={this.handleGetNextComments}
        getPostComments={getPostComments}
        replyCommentId={this.state.replyCommentId}
        setReplyCommentId={this.setReplyCommentId}
        onCommentCreate={createComment}
        categoriesData={categoriesData}
        createPost={createPost}
        error={error}
        errorComment={errorComment}
        onBack={this.goBack}
      />
    );
  }
}

const mapStateToProps = ({
  posts: { post: { comments, mainTopic, status: postCommentsStatus, nextCommentsLink, errorComment}, error},
  userProfile: {data},
  categories: {categoriesData, categoriesDataStatus},
}) => ({
  comments,
  mainTopic,
  postCommentsStatus,
  nextCommentsLink,
  user: data,
  categoriesData: categoriesData.slice(1),
  categoriesDataStatus,
  error,
  errorComment,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getCategories: getCategories.request,
  getPostComments: getPostComments.request,
  createComment: createPostComment.request,
  createPost: createPost.request,
  showAlert,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DiscussionContainer));

