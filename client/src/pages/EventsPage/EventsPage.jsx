import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import EventsForm from '../../components/EventsForm/EventsForm';
import EventsList from '../../components/EventsList/EventsList';
import styles from './EventsPage.module.sass';
import CONSTANTS from './../../constants';
import { setEvents, setUserId } from '../../store/slices/eventListSlice';

function EventsPage() {
  const user = useSelector(state => state.userStore.data);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.id) {
      dispatch(setUserId(user.id));
      const savedEvents =
        JSON.parse(localStorage.getItem(`events_${user.id}`)) || [];
      dispatch(setEvents(savedEvents));
    }
  }, [user?.id, dispatch]);

  if (!user || user.role !== CONSTANTS.CUSTOMER) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <div className={styles.eventsPageContainer}>
        <h1 className={styles.mainHeader}>Form Of Events</h1>
        <div className={styles.formContainer}>
          <EventsForm />
          <EventsList />
        </div>
      </div>
    </>
  );
}

export default EventsPage;
