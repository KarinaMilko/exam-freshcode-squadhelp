import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {
  getContests,
  clearContestsList,
  setNewCustomerFilter,
} from '../../store/slices/contestsSlice';
import CONSTANTS from '../../constants';
import ContestsContainer from '../ContestsContainer/ContestsContainer';
import ContestBox from '../ContestBox/ContestBox';
import styles from './CustomerDashboard.module.sass';
import TryAgain from '../TryAgain/TryAgain';

class CustomerDashboard extends React.Component {
  loadMore = startFrom => {
    this.props.getContests({
      limit: 8,
      offset: startFrom,
      contestStatus: this.props.customerFilter,
    });
  };

  componentDidMount() {
    this.props.clearContestsList();
    this.getContests();
  }

  getContests = () => {
    this.props.getContests({
      limit: 8,
      contestStatus: this.props.customerFilter,
    });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.customerFilter !== prevProps.customerFilter) {
      this.getContests();
    }
  }

  goToExtended = contest_id => {
    this.props.navigate(`/contest/${contest_id}`);
  };

  setContestList = () => {
    const array = [];
    const { contests } = this.props;
    for (let i = 0; i < contests.length; i++) {
      const contest = contests[i];

      const approvedOffersCount = contest.Offers
        ? contest.Offers.filter(
            offer => offer.moderationStatus === CONSTANTS.OFFER_STATUS_APPROVED
          ).length
        : 0;

      array.push(
        <ContestBox
          data={{ ...contest, count: approvedOffersCount }}
          key={`${contests[i].id}-${i}`}
          goToExtended={this.goToExtended}
        />
      );
    }
    return array;
  };

  componentWillUnmount() {
    this.props.clearContestsList();
  }

  tryToGetContest = () => {
    this.props.clearContestsList();
    this.getContests();
  };

  render() {
    const { error, haveMore } = this.props;
    const { customerFilter } = this.props;
    return (
      <div className={styles.mainContainer}>
        <div className={styles.filterContainer}>
          <div
            onClick={() =>
              this.props.newFilter(CONSTANTS.CONTEST_STATUS_ACTIVE)
            }
            className={classNames({
              [styles.activeFilter]:
                CONSTANTS.CONTEST_STATUS_ACTIVE === customerFilter,
              [styles.filter]:
                CONSTANTS.CONTEST_STATUS_ACTIVE !== customerFilter,
            })}
          >
            Active Contests
          </div>
          <div
            onClick={() =>
              this.props.newFilter(CONSTANTS.CONTEST_STATUS_FINISHED)
            }
            className={classNames({
              [styles.activeFilter]:
                CONSTANTS.CONTEST_STATUS_FINISHED === customerFilter,
              [styles.filter]:
                CONSTANTS.CONTEST_STATUS_FINISHED !== customerFilter,
            })}
          >
            Completed contests
          </div>
          <div
            onClick={() =>
              this.props.newFilter(CONSTANTS.CONTEST_STATUS_PENDING)
            }
            className={classNames({
              [styles.activeFilter]:
                CONSTANTS.CONTEST_STATUS_PENDING === customerFilter,
              [styles.filter]:
                CONSTANTS.CONTEST_STATUS_PENDING !== customerFilter,
            })}
          >
            Inactive contests
          </div>
        </div>
        <div className={styles.contestsContainer}>
          {error ? (
            <TryAgain getData={this.tryToGetContest} />
          ) : (
            <ContestsContainer
              isFetching={this.props.isFetching}
              loadMore={this.loadMore}
              navigate={this.props.navigate}
              haveMore={haveMore}
            >
              {this.setContestList()}
            </ContestsContainer>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state.contestsList;

const mapDispatchToProps = dispatch => ({
  getContests: data =>
    dispatch(getContests({ requestData: data, role: CONSTANTS.CUSTOMER })),
  clearContestsList: () => dispatch(clearContestsList()),
  newFilter: filter => dispatch(setNewCustomerFilter(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDashboard);
