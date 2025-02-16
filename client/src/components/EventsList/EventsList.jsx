import { connect } from 'react-redux';
import EventListItem from './EventListItem/EventListItem';
import CONSTANTS from './../../constants';
import styles from './EventsList.module.sass';
import { removeEvent } from '../../store/slices/eventListSlice';

const { STATIC_IMAGES_PATH } = CONSTANTS;

function EventsList({ events, remove }) {
  const mapEvents = e => <EventListItem key={e.id} event={e} remove={remove} />;

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
      <ul className={styles.eventListTimer}>{events.map(mapEvents)}</ul>
    </section>
  );
}

const mapStateToProps = ({ eventList }) => eventList;

const mapDispatchToProps = dispatch => ({
  remove: id => dispatch(removeEvent(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);
