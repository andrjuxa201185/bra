import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import DashboardView from './DashboardView';
import { OopsView } from '../../common';
import { getAssessments, getOutlook } from '../../../store/dashboard/dashboardActions';
import { getPostsData } from '../../../store/posts/postsActions';
import { getLibraryData } from '../../../store/library/libraryActions';

class DashboardContainer extends Component {

  componentDidMount() {
    const {getAssessments, getOutlook, getPostsData, getLibraryData} = this.props;
    getAssessments();
    getOutlook();
    getPostsData();
    getLibraryData();
  }

  render() {
    const {
      snapshotData,
      assessmentsDataStatus,
      outlookDataStatus,
      hotDiscussions,
      libraryData,
      userProfile,
    } = this.props;
    if (assessmentsDataStatus.fail || outlookDataStatus.fail) {
      return <OopsView/>;
    }
    return (
      <DashboardView
        libraryData={libraryData}
        hotDiscussions={hotDiscussions}
        snapshotData={snapshotData}
        assessmentsDataStatus={assessmentsDataStatus}
        outlookDataStatus={outlookDataStatus}
        userProfile={userProfile}
      />
    );
  }
}

DashboardContainer.propTypes = {
  //actions
  getAssessments: PropTypes.func.isRequired,
  getOutlook: PropTypes.func.isRequired,
  getLibraryData: PropTypes.func.isRequired,
  getPostsData: PropTypes.func.isRequired,
  //data
  snapshotData: PropTypes.shape({
    interests_progress: PropTypes.number,
    lifestyle_progress:PropTypes.number,
    world_view_progress: PropTypes.number,
    outlook_meter_value:PropTypes.number,
  }),
  assessmentsDataStatus: PropTypes.object.isRequired,
  outlookDataStatus: PropTypes.object.isRequired,
  libraryData: PropTypes.array.isRequired,
  hotDiscussions: PropTypes.array.isRequired,
};

const mapStateToProps = ({
  dashboard: { snapshotData, assessmentsDataStatus, outlookDataStatus },
  posts: { hotDiscussions },
  userProfile,
  library: { libraryData }}) => ({
  snapshotData,
  assessmentsDataStatus,
  outlookDataStatus,
  hotDiscussions,
  userProfile,
  libraryData: libraryData.slice(0, 5),
});

const mapDispatchToProps = dispatch => bindActionCreators({

  getAssessments: getAssessments.request,
  getOutlook: getOutlook.request,
  getPostsData: getPostsData.request,
  getLibraryData: getLibraryData.request,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);

