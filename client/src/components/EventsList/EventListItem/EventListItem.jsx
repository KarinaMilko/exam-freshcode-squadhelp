import styles from './EventListItem.module.sass';
import CONSTANTS from './../../../constants';

const { STATIC_IMAGES_PATH } = CONSTANTS;

function EventListItem({ event: { id, eventName }, remove }) {
  return (
    <li className={styles.eventItems}>
      <p className={styles.eventItem}>
        <span className={styles.eventName}>{eventName}</span>
      </p>
      <p className={styles.remainingTime}>
        <span className={styles.timeTitle}>6m 18s</span>
      </p>
      <button
        className={styles.trashItems}
        onClick={() => {
          remove(id);
        }}
      >
        <img
          className={styles.imgItems}
          src={`${STATIC_IMAGES_PATH}trash.svg`}
          alt="icon"
        />
      </button>
    </li>
  );
}

export default EventListItem;
