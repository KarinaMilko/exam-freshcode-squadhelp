import styles from './EventListItem.module.sass';
import CONSTANTS from './../../../constants';

const { STATIC_IMAGES_PATH } = CONSTANTS;

function EventListItem({ event: { eventName } }) {
  return (
    <li className={styles.eventItems}>
      <p className={styles.eventItem}>
        <span className={styles.eventName}>{eventName}</span>
      </p>
      <p className={styles.remainingTime}>
        <span className={styles.timeTitle}>6m 18s</span>
      </p>
    </li>
  );
}

export default EventListItem;
