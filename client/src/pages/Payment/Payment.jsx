import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import { pay, clearPaymentStore } from '../../store/slices/paymentSlice';
import PayForm from '../../components/PayForm/PayForm';
import styles from './Payment.module.sass';
import CONSTANTS from '../../constants';
import Error from '../../components/Error/Error';

const Payment = props => {
  const navigate = useNavigate();
  const location = useLocation();

  const { contests } = props.contestCreationStore;

  useEffect(() => {
    if (isEmpty(contests)) {
      navigate('/dashboard', { replace: true });
    }
  }, [contests, navigate]);

  const localFiles = location.state?.localFiles || {};

  const pay = values => {
    const { contests } = props.contestCreationStore;
    const contestArray = [];
    Object.keys(contests).forEach(key =>
      contestArray.push({ ...contests[key] })
    );

    const data = new FormData();

    contestArray.forEach(contest => {
      const file = localFiles[contest.contestType];
      if (file) {
        data.append('files', file);
        contest.haveFile = true;
      } else {
        contest.haveFile = false;
      }
    });

    const { number, expiry, cvc } = values;

    data.append('number', number);
    data.append('expiry', expiry);
    data.append('cvc', cvc);
    data.append('contests', JSON.stringify(contestArray));
    data.append('price', '100');
    props.pay({
      data: {
        formData: data,
      },
      navigate,
    });
  };

  const goBack = () => {
    navigate(-1);
  };

  const { error } = props.payment;
  const { clearPaymentStore } = props;

  return (
    <div className={styles.mainContainer}>
      <div className={styles.paymentContainer}>
        <span className={styles.headerLabel}>Checkout</span>
        {error && (
          <Error
            data={error.data}
            status={error.status}
            clearError={clearPaymentStore}
          />
        )}
        <PayForm sendRequest={pay} back={goBack} isPayForOrder />
      </div>
      <div className={styles.orderInfoContainer}>
        <span className={styles.orderHeader}>Order Summary</span>
        <div className={styles.packageInfoContainer}>
          <span className={styles.packageName}>Package Name: Standard</span>
          <span className={styles.packagePrice}>$100 USD</span>
        </div>
        <div className={styles.resultPriceContainer}>
          <span>Total:</span>
          <span>$100.00 USD</span>
        </div>
        <a href="http://www.google.com">Have a promo code?</a>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  payment: state.payment,
  contestCreationStore: state.contestCreationStore,
});

const mapDispatchToProps = dispatch => ({
  pay: ({ data, navigate }) => dispatch(pay({ data, navigate })),
  clearPaymentStore: () => dispatch(clearPaymentStore()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
