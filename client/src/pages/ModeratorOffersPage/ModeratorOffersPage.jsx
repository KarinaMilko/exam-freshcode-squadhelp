import { connect } from 'react-redux';
import { useEffect } from 'react';
import { getOffersThunk } from '../../store/slices/offerListSlice';

function ModeratorOffersPage({ getOffers, offers, isFetching, error }) {
  useEffect(() => {
    getOffers();
  }, []);

  return (
    <ul>
      {offers.map(o => (
        <li style={{ marginTop: '15px' }}>{JSON.stringify(o)}</li>
      ))}
    </ul>
  );
}

const mapStateToProps = ({ offerList }) => offerList;

const mapDispatchToProps = dispatch => ({
  getOffers: () => {
    dispatch(getOffersThunk());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModeratorOffersPage);
