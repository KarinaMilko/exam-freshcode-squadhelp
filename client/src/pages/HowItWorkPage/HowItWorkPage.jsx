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
    </div>
  );
}

export default HowItWorkPage;
