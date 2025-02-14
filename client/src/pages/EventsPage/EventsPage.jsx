import EventsForm from '../../components/EventsForm/EventsForm';
import styles from './EventsPage.module.sass';

function EventsPage() {
  return (
    <>
      <div className={styles.eventsPageContainer}>
        <h1 className={styles.mainHeader}>Form Of Events</h1>
        <div className={styles.formContainer}>
          <EventsForm />
        </div>
      </div>
    </>
  );
}

export default EventsPage;
