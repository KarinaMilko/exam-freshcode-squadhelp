import { connect } from 'react-redux';
import { useEffect } from 'react';
import { getOffersThunk, setFilter } from '../../store/slices/offerListSlice';
import CONSTANS from './../../constants';
import styles from './../ModeratorOffersPage/ModeratorOffersPage.module.sass';

const { OFFER_STATUS_PENDING, OFFER_STATUS_REJECTED, OFFER_STATUS_APPROVED } =
  CONSTANS;

function ModeratorOffersPage({
  getOffers,
  offers,
  isFetching,
  error,
  filter,
  setFilter,
}) {
  useEffect(() => {
    getOffers(filter);
  }, [filter]);

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
      <ul className={styles.offersList}>
        {offers.map(o => (
          <li key={o.id} className={styles.offerItem}>
            <p className={styles.offerInfo}>
              <span className={styles.label}>Contest: </span> {o.contestId}
            </p>
            <p className={styles.offerInfo}>
              <span className={styles.label}>Text: </span>
              {o.text}
            </p>
            {o.fileName && (
              <p className={styles.offerInfo}>
                <span className={styles.label}>File: </span> {o.fileName}
              </p>
            )}
            {o.originalFileName && (
              <p className={styles.offerInfo}>
                <span className={styles.label}>File_Name: </span>{' '}
                {o.originalFileName}
              </p>
            )}
            <p className={styles.offerInfo}>
              <span className={styles.label}>Status: </span> {o.status}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

const mapStateToProps = ({ offerList }) => offerList;

const mapDispatchToProps = dispatch => ({
  getOffers: filter => {
    dispatch(getOffersThunk(filter));
  },
  setFilter: newFilter => {
    dispatch(setFilter(newFilter));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModeratorOffersPage);
