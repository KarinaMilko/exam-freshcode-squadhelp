import styles from './../ServicesSection/ServicesSection.module.sass';
import CONSTANTS from './../../../constants';

const { STATIC_IMAGES_PATH } = CONSTANTS;

const services = [
  {
    img: 'g1.svg',
    title: 'Launch a Contest',
    description:
      'Work with hundreds of creative experts to get custom name suggestions for your business or brand. All names are auto-checked for URL availability.',
    link: '/start-contest',
    linkText: 'Launch a Contest',
  },
  {
    img: 'g2.svg',
    title: 'Explore Names For Sale',
    description:
      'Our branding team has curated thousands of pre-made names that you can purchase instantly. All names include a matching URL and a complimentary Logo Design',
    link: '/premium-domains-for-sale/all',
    linkText: 'Explore Names For Sale',
  },
  {
    img: 'g3.svg',
    title: 'Agency-level Managed Contests',
    description:
      'Our Managed contests combine the power of crowdsourcing with the rich experience of our branding consultants. Get a complete agency-level experience at a fraction of Agency costs',
    link: '/managed-contests',
    linkText: 'Learn More',
  },
];
function ServicesSection() {
  return (
    <div className={styles.servicesContainer}>
      <section className={styles.servicesSection}>
        <div className={styles.servicesHeader}>
          <span className={styles.servicesSubtitle}>Our Services</span>
          <h2 className={styles.servicesTitle}>3 Ways To Use Atom</h2>
          <p className={styles.servicesDescription}>
            Atom offers 3 ways to get you a perfect name for your business.
          </p>
        </div>
        <ul className={styles.servicesList}>
          {services.map(
            ({ img, title, description, link, linkText }, index) => (
              <li key={index} className={styles.serviceCard}>
                <img
                  className={styles.serviceIconWrapper}
                  src={`${STATIC_IMAGES_PATH}how_it_work_icon/${img}`}
                  alt="icon"
                />
                <h3 className={styles.serviceTitle}>{title}</h3>
                <p className={styles.serviceDescription}>{description}</p>
                <div className={styles.serviceBtn}>
                  <a className={styles.serviceLink} href={link}>
                    {linkText}
                    <img
                      className={styles.serviceArrow}
                      src={`${STATIC_IMAGES_PATH}how_it_work_icon/icon-arrow-long-right.svg`}
                      alt="Arrow Icon"
                    />
                  </a>
                </div>
              </li>
            )
          )}
        </ul>
      </section>
    </div>
  );
}
export default ServicesSection;
