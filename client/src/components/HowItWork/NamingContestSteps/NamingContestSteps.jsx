import styles from './../NamingContestSteps/NamingContestSteps.module.sass';
import CONSTANTS from './../../../constants';

const { STATIC_IMAGES_PATH } = CONSTANTS;

const steps = [
  {
    number: 'Step 1',
    text: 'Fill out your Naming Brief and begin receiving name ideas in minutes',
  },
  {
    number: 'Step 2',
    text: 'Rate the submissions and provide feedback to creatives. Creatives submit even more names based on your feedback.',
  },
  {
    number: 'Step 3',
    text: 'Our team helps you test your favorite names with your target audience. We also assist with Trademark screening.',
  },
  {
    number: 'Step 4',
    text: 'Pick a Winner. The winner gets paid for their submission.',
  },
];

function NamingContestSteps() {
  return (
    <div className={styles.namingContestContainer}>
      <section className={styles.namingContestSection}>
        <div className={styles.namingContestHeader}>
          <img
            className={styles.namingContestIcon}
            src={`${STATIC_IMAGES_PATH}how_it_work_icon/icon-27.svg`}
            alt="icon"
          />
          <h3 className={styles.namingContestTitle}>
            How Do Naming Contests Work?
          </h3>
        </div>
        <div className={styles.namingContestSteps}>
          <ul className={styles.namingContestList}>
            {steps.map(({ number, text, showArrow }, index) => (
              <li className={styles.namingContestStep}>
                <span className={styles.namingContestStepNumber}>{number}</span>
                <p className={styles.namingContestStepDescription}>{text}</p>
                <img
                  className={styles.namingContestArrow}
                  src={`${STATIC_IMAGES_PATH}how_it_work_icon/arrow-long-right-blue.svg`}
                  alt="Arrow Icon"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
export default NamingContestSteps;
