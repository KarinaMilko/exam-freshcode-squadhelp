import { useState, useEffect } from 'react';
import { intervalToDuration } from 'date-fns';
import styles from './EventListItem.module.sass';
import CONSTANTS from './../../../constants';

const { STATIC_IMAGES_PATH } = CONSTANTS;

function EventListItem({
  event: { id, eventName, date, time, createdAt },
  remove,
}) {
  const [leftTime, setLeftTime] = useState('');
  const [progressBar, setProgressBar] = useState(100);

  useEffect(() => {
    const eventDate = new Date(`${date}T${time}`);
    const startDate = new Date(createdAt);
    const totalTime = eventDate - startDate;

    const showTimeDifference = () => {
      const nowDate = new Date();
      const timeLeft = eventDate - nowDate;

      if (timeLeft < 0 || totalTime <= 0) {
        setLeftTime('Event has passed');
        setProgressBar(100);
        return;
      }

      const timeDistance = intervalToDuration({
        start: nowDate,
        end: eventDate,
      });

      const percentProgress = Math.min(
        ((totalTime - timeLeft) / totalTime) * 100,
        100
      );
      setProgressBar(percentProgress);

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
      <div className={styles.progressBarContainer}>
        <div
          className={styles.progressBar}
          style={{ width: `${progressBar}%` }}
        ></div>
      </div>
      <p className={styles.eventItem}>{eventName}</p>
      <p className={styles.remainingTime}>{leftTime}</p>
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
