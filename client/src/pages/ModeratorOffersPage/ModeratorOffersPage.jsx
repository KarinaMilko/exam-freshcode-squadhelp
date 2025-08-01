import { connect } from 'react-redux';
import { useEffect } from 'react';
import {
  getOffersThunk,
  setFilter,
  setPage,
  updateOffersStatusThunk,
} from '../../store/slices/offerListSlice';
import CONSTANS from './../../constants';
import styles from './../ModeratorOffersPage/ModeratorOffersPage.module.sass';

const {
  OFFER_STATUS_PENDING,
  OFFER_STATUS_REJECTED,
  OFFER_STATUS_APPROVED,
  CONTEST_FIELDS,
} = CONSTANS;

const Field = ({ label, value }) => {
  if (!value && value !== 0) return null;
  return (
    <p className={styles.offerInfo}>
      <span className={styles.label}>{label}: </span> {value}
    </p>
  );
};

function ModeratorOffersPage({
  getOffers,
  updateOffersStatus,
  offers,
  isFetching,
  error,
  filter,
  setFilter,
  setPage,
  page,
  totalPages,
}) {
  useEffect(() => {
    getOffers({ moderationStatus: filter, page });
  }, [filter, page]);

  return (
    <>
      <section className={styles.filterSection}>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="">All</option>
          <option value={OFFER_STATUS_PENDING}>Pending</option>
          <option value={OFFER_STATUS_APPROVED}>Approved</option>
          <option value={OFFER_STATUS_REJECTED}>Rejected</option>
        </select>
      </section>

      {isFetching ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <ul className={styles.offersList}>
            {!isFetching &&
              !error &&
              offers.map(o => (
                <li key={o.id} className={styles.offerItem}>
                  {o.Contest &&
                    CONTEST_FIELDS.map(({ label, key }) => (
                      <Field key={key} label={label} value={o.Contest[key]} />
                    ))}

                  {o.moderationStatus === OFFER_STATUS_PENDING && (
                    <div className={styles.actionButtons}>
                      <button
                        className={styles.approveButton}
                        onClick={() => {
                          updateOffersStatus(o.id, OFFER_STATUS_APPROVED);
                        }}
                      >
                        Approve
                      </button>
                      <button
                        className={styles.rejectButton}
                        onClick={() => {
                          updateOffersStatus(o.id, OFFER_STATUS_REJECTED);
                        }}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </li>
              ))}
          </ul>
          <div className={styles.pagination}>
            <button
              className={styles.pageButton}
              onClick={() => setPage(page - 1)}
              disabled={page <= 1}
            >
              Previous
            </button>
            <span className={styles.pageNumber}>
              Page {page} of {totalPages}
            </span>
            <button
              className={styles.pageButton}
              onClick={() => setPage(page + 1)}
              disabled={page >= totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </>
  );
}

const mapStateToProps = ({ offerList }) => offerList;

const mapDispatchToProps = dispatch => ({
  getOffers: ({ moderationStatus, page }) => {
    dispatch(getOffersThunk({ moderationStatus, page }));
  },
  setFilter: newFilter => {
    dispatch(setFilter(newFilter));
  },
  setPage: newPage => {
    dispatch(setPage(newPage));
  },
  updateOffersStatus: (id, status) => {
    dispatch(updateOffersStatusThunk({ id, status }));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModeratorOffersPage);
