import { connect, useSelector } from 'react-redux';
import { useEffect } from 'react';
import EventListItem from './EventListItem/EventListItem';
import CONSTANTS from './../../constants';
import styles from './EventsList.module.sass';
import {
  removeEvent,
  updateCompletedEventsCount,
} from '../../store/slices/eventListSlice';
import { countCompletedEvents } from './../../utils/functions';

const { STATIC_IMAGES_PATH } = CONSTANTS;

function EventsList({ events, remove, updateCompletedEventsCount }) {
  const user = useSelector(state => state.userStore.data);

  useEffect(() => {
    if (!user?.id) return;
    if (events.length === 0) return;
    localStorage.setItem(`events_${user.id}`, JSON.stringify(events));
  }, [events, user]);

  useEffect(() => {
    const countEvents = countCompletedEvents(events);
    updateCompletedEventsCount(countEvents);
  }, [events, updateCompletedEventsCount]);

  const mapEvents = e => <EventListItem key={e.id} event={e} remove={remove} />;
  const sortEvents = [...events].sort((a, b) => {
    const aEvent = new Date(`${a.date}T${a.time}`).getTime();
    const bEvent = new Date(`${b.date}T${b.time}`).getTime();
    return aEvent - bEvent;
  });

  return (
    <section className={styles.eventListContainer}>
      <div className={styles.titleContainer}>
        <h2 className={styles.eventListTitle}>Live upcomming checks</h2>
        <div className={styles.timerImgContainer}>
          <p className={styles.timer}>Remaining time</p>
          <img
            className={styles.timerImg}
            src={`${STATIC_IMAGES_PATH}clock.png`}
            alt="icon"
          />
        </div>
      </div>
      <ul className={styles.eventListTimer}>{sortEvents.map(mapEvents)}</ul>
    </section>
  );
}

const mapStateToProps = ({ eventList }) => ({
  events: eventList.events,
});

const mapDispatchToProps = dispatch => ({
  remove: id => dispatch(removeEvent(id)),
  updateCompletedEventsCount: count =>
    dispatch(updateCompletedEventsCount(count)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);
