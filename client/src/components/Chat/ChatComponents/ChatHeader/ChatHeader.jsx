import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {
  backToDialogList,
  changeChatFavorite,
  changeChatBlock,
} from '../../../../store/slices/chatSlice';
import styles from './ChatHeader.module.sass';
import CONSTANTS from '../../../../constants';

const ChatHeader = props => {
  const { interlocutor, backToDialogList, chatData, userId } = props;

  const avatar = interlocutor?.avatar || 'anon.png';
  const firstName = interlocutor?.firstName || 'Anonymous';

  const changeFavorite = (data, event) => {
    props.changeChatFavorite(data);
    event.stopPropagation();
  };

  const changeBlackList = (data, event) => {
    props.changeChatBlock(data);
    event.stopPropagation();
  };

  const isFavorite = (chatData, userId) => {
    const { favoriteCreator, favoriteCustomer, creatorId } = chatData;
    return creatorId === userId ? favoriteCreator : favoriteCustomer;
  };

  const isBlocked = (chatData, userId) => {
    const { blackListCreator, blackListCustomer, creatorId } = chatData;
    return creatorId === userId ? blackListCreator : blackListCustomer;
  };

  const getInterlocutorId = (chatData, userId) => {
    const { creatorId, customerId } = chatData;
    return creatorId === userId ? customerId : creatorId;
  };

  return (
    <div className={styles.chatHeader}>
      <div
        className={styles.buttonContainer}
        onClick={() => backToDialogList()}
      >
        <img
          src={`${CONSTANTS.STATIC_IMAGES_PATH}arrow-left-thick.png`}
          alt="back"
        />
      </div>
      <div className={styles.infoContainer}>
        <div>
          <img
            src={
              avatar === 'anon.png'
                ? CONSTANTS.ANONYM_IMAGE_PATH
                : `${CONSTANTS.publicURL}${avatar}`
            }
            alt="user"
          />
          <span>{firstName}</span>
        </div>
        {chatData && (
          <div>
            <i
              onClick={event =>
                changeFavorite(
                  {
                    interlocutorId: getInterlocutorId(chatData, userId),
                    favoriteFlag: !isFavorite(chatData, userId),
                  },
                  event
                )
              }
              className={classNames({
                'far fa-heart': !isFavorite(chatData, userId),
                'fas fa-heart': isFavorite(chatData, userId),
              })}
            />
            <i
              onClick={event =>
                changeBlackList(
                  {
                    interlocutorId: getInterlocutorId(chatData, userId),
                    blackListFlag: !isBlocked(chatData, userId),
                  },
                  event
                )
              }
              className={classNames({
                'fas fa-user-lock': !isBlocked(chatData, userId),
                'fas fa-unlock': isBlocked(chatData, userId),
              })}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const { interlocutor, chatData } = state.chatStore;
  return { interlocutor, chatData };
};

const mapDispatchToProps = dispatch => ({
  backToDialogList: () => dispatch(backToDialogList()),
  changeChatFavorite: data => dispatch(changeChatFavorite(data)),
  changeChatBlock: data => dispatch(changeChatBlock(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatHeader);
