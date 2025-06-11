import styles from './../IntroSection/IntroSection.module.sass';

function IntroSection() {
  return (
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
          frameBorder="0"
          allow="fullscreen; picture-in-picture"
          allowFullScreen
        ></iframe>
      </section>
    </div>
  );
}

export default IntroSection;
