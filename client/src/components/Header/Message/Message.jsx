import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { hideMessage } from '../../../store/slices/eventListSlice';
import styles from './../Message/Message.module.sass';
import CONSTANTS from './../../../constants';

const { STATIC_IMAGES_PATH } = CONSTANTS;

function Message({ timeOutMessage, time, date, eventId, hideMessage }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, [eventId]);

  if (!timeOutMessage || !time || !date) {
    return null;
  }

  const eventDateTime = new Date(`${date}T${time}`);
  const [hoursBefor, minutesBefor] = timeOutMessage.split(':').map(Number);

  const messageStartTime = new Date(eventDateTime);
  messageStartTime.setHours(messageStartTime.getHours() - hoursBefor);
  messageStartTime.setMinutes(messageStartTime.getMinutes() - minutesBefor);

  const checkTime = () => {
    const today = new Date();
    setIsVisible(today >= messageStartTime && today < eventDateTime);
  };

  useEffect(() => {
    checkTime();
    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, [timeOutMessage, time, date]);

  const handleCloseMessage = () => {
    hideMessage(eventId);
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div className={styles.msgContainer}>
          <div className={styles.msgTitle}>
            Time to update the event in {`${time}`}!
            <img
              src={`${STATIC_IMAGES_PATH}close.svg`}
              alt="close"
              onClick={handleCloseMessage}
              className={styles.btnClose}
            />
          </div>
        </div>
      )}
    </>
  );
}

const mapDispatchToProps = {
  hideMessage,
};

export default connect(null, mapDispatchToProps)(Message);
