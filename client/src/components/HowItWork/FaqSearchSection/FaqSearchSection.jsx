import styles from './../FaqSearchSection/FaqSearchSection.module.sass';
import CONSTANTS from './../../../constants';

const { STATIC_IMAGES_PATH } = CONSTANTS;

const categories = [
  'Tech',
  'Clothing',
  'Finance',
  'Real Estate',
  'Crypto',
  'Short',
  'One Word',
];

function FaqSearchSection() {
  return (
    <>
      <div className={styles.faqSearchContainer}>
        <section className={styles.faqSearchSection}>
          <div className={styles.faqSearchWrapper}>
            <img
              src={`${STATIC_IMAGES_PATH}how_it_work_icon/search.svg`}
              alt="icon"
              className={styles.faqSearchIcon}
            />
            <input
              type="text"
              className={styles.faqSearchInput}
              placeholder="Search Over 200,000+ Premium Names"
            />

            <button className={styles.faqSearchButton}>
              <img
                src={`${STATIC_IMAGES_PATH}how_it_work_icon/search_white.svg`}
                alt="icon"
                className={styles.faqSearchButtonIcon}
              />
            </button>
          </div>
          <div className={styles.faqCategoryWrapper}>
            {categories.map((category, index) => (
              <a key={index} className={styles.faqCategoryLink} href="#">
                {category}
              </a>
            ))}
          </div>
        </section>
      </div>
      <button className={styles.buttonIcon}>
        <div className={styles.icon}>
          <img
            src={`${STATIC_IMAGES_PATH}how_it_work_icon/symbol.svg`}
            alt="icon"
            className={styles.iconSymbol}
          />
        </div>
      </button>
    </>
  );
}
export default FaqSearchSection;
