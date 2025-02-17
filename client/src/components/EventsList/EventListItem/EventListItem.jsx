import { useState, useEffect } from 'react';
import { intervalToDuration } from 'date-fns';
import styles from './EventListItem.module.sass';
import CONSTANTS from './../../../constants';

const { STATIC_IMAGES_PATH } = CONSTANTS;

function EventListItem({ event: { id, eventName, date, time }, remove }) {
  const [leftTime, setLeftTime] = useState('');

  useEffect(() => {
    const showTimeDifference = () => {
      const eventDate = new Date(`${date}T${time}`);
      const nowDate = new Date();

      if (eventDate < nowDate) {
        setLeftTime('Event has passed');
        return;
      }

      const timeDistance = intervalToDuration({
        start: nowDate,
        end: eventDate,
      });

      const viewTime = [];
      if (timeDistance.years > 0) viewTime.push(`${timeDistance.years}y`);
      if (timeDistance.months > 0) viewTime.push(`${timeDistance.months}m`);
      if (timeDistance.days > 0) viewTime.push(`${timeDistance.days}d`);
      if (timeDistance.hours > 0) viewTime.push(`${timeDistance.hours}h`);
      if (timeDistance.minutes > 0) viewTime.push(`${timeDistance.minutes}min`);
      if (timeDistance.seconds > 0) viewTime.push(`${timeDistance.seconds}s`);

      setLeftTime(viewTime.join(' '));
    };

    const interval = setInterval(showTimeDifference, 1000);
    return () => clearInterval(interval);
  }, [date, time]);

  return (
    <li className={styles.eventItems}>
      <p className={styles.eventItem}>
        <span className={styles.eventName}>{eventName}</span>
      </p>
      <p className={styles.remainingTime}>
        <span className={styles.timeTitle}>{leftTime}</span>
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
