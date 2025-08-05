import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import EventsForm from '../../components/EventsForm/EventsForm';
import EventsList from '../../components/EventsList/EventsList';
import styles from './EventsPage.module.sass';
import CONSTANTS from './../../constants';

function EventsPage() {
  const user = useSelector(state => state.userStore.data);

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
