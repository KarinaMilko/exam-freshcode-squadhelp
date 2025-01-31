import React from 'react';
import styles from './../HowItWorkPage/HowItWorkPage.module.sass';
import CONSTANTS from './../../constants';

const { STATIC_IMAGES_PATH } = CONSTANTS;
function HowItWorkPage() {
  return (
    <div className={styles.atomContainer}>
      <div className={styles.introContainer}>
        <section className={styles.introSection}>
          <div className={styles.introTextBlock}>
            <h4 className={styles.introSubtitle}>World's #1 Naming Platform</h4>
            <h1 className={styles.introTitle}>How Does Atom Work?</h1>
            <p className={styles.introDescription}>
              Atom helps you come up with a great name for your business by
              combining the power of crowdsourcing with sophisticated technology
              and Agency-level validation services.
            </p>
          </div>
          <iframe
            className={styles.introVideo}
            src="https://iframe.mediadelivery.net/embed/239474/327efcdd-b1a2-4891-b274-974787ae8362"
            frameborder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowfullscreen
          ></iframe>
        </section>
      </div>
      <div className={styles.servicesContainer}>
        <section className={styles.servicesSection}>
          <div className={styles.servicesHeader}>
            <span className={styles.servicesSubtitle}>Our Services</span>
            <h2 className={styles.servicesTitle}>3 Ways To Use Atom</h2>
            <p className={styles.servicesDescription}>
              Atom offers 3 ways to get you a perfect name for your business.
            </p>
          </div>
          <div className={styles.servicesOptions}>
            <ul className={styles.servicesList}>
              <li className={styles.serviceCard}>
                <img
                  className={styles.serviceIconWrapper}
                  src={`${STATIC_IMAGES_PATH}how_it_work_icon/g1.svg`}
                  alt="icon"
                />
                <h3 className={styles.serviceTitle}>Launch a Contest</h3>
                <p className={styles.serviceDescription}>
                  Work with hundreds of creative experts to get custom name
                  suggestions for your business or brand. All names are
                  auto-checked for URL availability.
                </p>
                <a className={styles.serviceLink} href="/start-contest">
                  Launch a Contest
                  <img
                    className={styles.serviceArrow}
                    src={`${STATIC_IMAGES_PATH}arrow-long-right.svg`}
                    alt="Arrow Icon"
                  />
                </a>
              </li>
              <li className={styles.serviceCard}>
                <img
                  className={styles.serviceIconWrapper}
                  src={`${STATIC_IMAGES_PATH}how_it_work_icon/g2.svg`}
                  alt="icon"
                />
                <h3 className={styles.serviceTitle}>Explore Names For Sale</h3>
                <p className={styles.serviceDescription}>
                  Our branding team has curated thousands of pre-made names that
                  you can purchase instantly. All names include a matching URL
                  and a complimentary Logo Design
                </p>
                <a
                  className={styles.serviceLink}
                  href="/premium-domains-for-sale/all"
                >
                  Explore Names For Sale
                  <img
                    className={styles.serviceArrow}
                    src={`${STATIC_IMAGES_PATH}arrow-long-right.svg`}
                    alt="Arrow Icon"
                  />
                </a>
              </li>
              <li className={styles.serviceCard}>
                <img
                  className={styles.serviceIconWrapper}
                  src={`${STATIC_IMAGES_PATH}how_it_work_icon/g3.svg`}
                  alt="icon"
                />
                <h3 className={styles.serviceTitle}>
                  Agency-level Managed Contests
                </h3>
                <p className={styles.serviceDescription}>
                  Our Managed contests combine the power of crowdsourcing with
                  the rich experience of our branding consultants. Get a
                  complete agency-level experience at a fraction of Agency costs
                </p>
                <a className={styles.serviceLink} href="/managed-contests">
                  Learn More
                  <img
                    className={styles.serviceArrow}
                    src={`${STATIC_IMAGES_PATH}arrow-long-right.svg`}
                    alt="Arrow Icon"
                  />
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}

export default HowItWorkPage;
