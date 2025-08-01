import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Header.module.sass';
import CONSTANTS from '../../constants';
import { clearUserStore } from '../../store/slices/userSlice';
import { getUser } from '../../store/slices/userSlice';
import withRouter from '../../hocs/withRouter';
import Message from './Message/Message';
import { selectCompletedEventsCount } from '../../store/slices/eventListSlice';
import Logo from './../../components/Logo';

class Header extends React.Component {
  componentDidMount() {
    if (!this.props.userStore.data) {
      this.props.getUser();
    }
  }

  logOut = () => {
    localStorage.clear();
    this.props.clearUserStore();
    this.props.navigate('/login', { replace: true });
  };

  startContests = () => {
    this.props.navigate('/startContest');
  };

  renderLoginButtons = () => {
    if (this.props.userStore.data) {
      return (
        <>
          <div className={styles.userInfo}>
            <img
              src={
                this.props.userStore.data.avatar === 'anon.png'
                  ? CONSTANTS.ANONYM_IMAGE_PATH
                  : `${CONSTANTS.publicURL}${this.props.userStore.data.avatar}`
              }
              alt="user"
            />
            <span>{`Hi, ${this.props.userStore.data.displayName}`}</span>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
              alt="menu"
            />
            <ul>
              {this.props.userStore.data.role === CONSTANTS.MODERATOR ? (
                <>
                  <li>
                    <Link
                      to="/moderator/offers"
                      style={{ textDecoration: 'none' }}
                    >
                      <span>View Offers</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/account" style={{ textDecoration: 'none' }}>
                      <span>My Account</span>
                    </Link>
                  </li>
                  <li>
                    <span onClick={this.logOut}>Logout</span>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                      <span>View Dashboard</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/account" style={{ textDecoration: 'none' }}>
                      <span>My Account</span>
                    </Link>
                  </li>
                  {this.props.userStore.data.role === CONSTANTS.CUSTOMER && (
                    <li>
                      <Link to="/events" style={{ textDecoration: 'none' }}>
                        <span>My Events</span>
                        <div className={styles.redBadgeContainer}>
                          {this.props.completedEventsCount > 0 && (
                            <span className={styles.redBadge}>
                              {this.props.completedEventsCount}
                            </span>
                          )}
                        </div>
                      </Link>
                    </li>
                  )}

                  <li>
                    <Link
                      to="http:/www.google.com"
                      style={{ textDecoration: 'none' }}
                    >
                      <span>Messages</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="http:/www.google.com"
                      style={{ textDecoration: 'none' }}
                    >
                      <span>Affiliate Dashboard</span>
                    </Link>
                  </li>
                  <li>
                    <span onClick={this.logOut}>Logout</span>
                  </li>
                </>
              )}
            </ul>
          </div>
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH}email.png`}
            className={styles.emailIcon}
            alt="email"
          />
        </>
      );
    }
    return (
      <>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <span className={styles.btn}>LOGIN</span>
        </Link>
        <Link to="/registration" style={{ textDecoration: 'none' }}>
          <span className={styles.btn}>SIGN UP</span>
        </Link>
      </>
    );
  };

  render() {
    if (this.props.isFetching) {
      return null;
    }
    return (
      <div className={styles.headerContainer}>
        <div className={styles.fixedHeader}>
          <span className={styles.info}>
            Squadhelp recognized as one of the Most Innovative Companies by Inc
            Magazine.
          </span>
          <a href="http://www.google.com">Read Announcement</a>
        </div>
        <div className={styles.loginSignnUpHeaders}>
          <div className={styles.numberContainer}>
            <img src={`${CONSTANTS.STATIC_IMAGES_PATH}phone.png`} alt="phone" />
            <span>(877)&nbsp;355-3585</span>
          </div>
          <div className={styles.userButtonsContainer}>
            {this.renderLoginButtons()}
          </div>
        </div>
        <div className={styles.navContainer}>
          <Logo className={styles.logo} />
          <div className={styles.leftNav}>
            <div className={styles.nav}>
              <ul>
                <li>
                  <span>NAME IDEAS</span>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                    alt="menu"
                  />
                  <ul>
                    <li>
                      <a href="http://www.google.com">Beauty</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">Consulting</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">E-Commerce</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">Fashion & Clothing</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">Finance</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">Real Estate</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">Tech</a>
                    </li>
                    <li className={styles.last}>
                      <a href="http://www.google.com">More Categories</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>CONTESTS</span>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                    alt="menu"
                  />
                  <ul>
                    <li>
                      <Link to="/how-it-works">HOW IT WORKS</Link>
                    </li>
                    <li>
                      <a href="http://www.google.com">PRICING</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">AGENCY SERVICE</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">ACTIVE CONTESTS</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">WINNERS</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">LEADERBOARD</a>
                    </li>
                    <li className={styles.last}>
                      <a href="http://www.google.com">BECOME A CREATIVE</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>Our Work</span>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                    alt="menu"
                  />
                  <ul>
                    <li>
                      <a href="http://www.google.com">NAMES</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">TAGLINES</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">LOGOS</a>
                    </li>
                    <li className={styles.last}>
                      <a href="http://www.google.com">TESTIMONIALS</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>Names For Sale</span>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                    alt="menu"
                  />
                  <ul>
                    <li>
                      <a href="http://www.google.com">POPULAR NAMES</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">SHORT NAMES</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">INTRIGUING NAMES</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">NAMES BY CATEGORY</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">VISUAL NAME SEARCH</a>
                    </li>
                    <li className={styles.last}>
                      <a href="http://www.google.com">SELL YOUR DOMAINS</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>Blog</span>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                    alt="menu"
                  />
                  <ul>
                    <li>
                      <a href="http://www.google.com">ULTIMATE NAMING GUIDE</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">
                        POETIC DEVICES IN BUSINESS NAMING
                      </a>
                    </li>
                    <li>
                      <a href="http://www.google.com">CROWDED BAR THEORY</a>
                    </li>
                    <li className={styles.last}>
                      <a href="http://www.google.com">ALL ARTICLES</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            {this.props.userStore.data &&
              this.props.userStore.data.role !== CONSTANTS.CREATOR &&
              this.props.userStore.data.role !== CONSTANTS.MODERATOR && (
                <div
                  className={styles.startContestBtn}
                  onClick={this.startContests}
                >
                  START CONTEST
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userStore: state.userStore,
  eventList: state.eventList,
  completedEventsCount: selectCompletedEventsCount(state),
});
const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(getUser()),
  clearUserStore: () => dispatch(clearUserStore()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
