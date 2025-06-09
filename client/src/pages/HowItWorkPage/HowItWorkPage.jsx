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
            frameBorder="0"
            allow="fullscreen; picture-in-picture"
            allowFullScreen
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
              <div className={styles.serviceBtn}>
                <a className={styles.serviceLink} href="/start-contest">
                  Launch a Contest
                  <img
                    className={styles.serviceArrow}
                    src={`${STATIC_IMAGES_PATH}how_it_work_icon/icon-arrow-long-right.svg`}
                    alt="Arrow Icon"
                  />
                </a>
              </div>
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
                you can purchase instantly. All names include a matching URL and
                a complimentary Logo Design
              </p>
              <div className={styles.serviceBtn}>
                <a
                  className={styles.serviceLink}
                  href="/premium-domains-for-sale/all"
                >
                  Explore Names For Sale
                  <img
                    className={styles.serviceArrow}
                    src={`${STATIC_IMAGES_PATH}how_it_work_icon/icon-arrow-long-right.svg`}
                    alt="Arrow Icon"
                  />
                </a>
              </div>
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
                Our Managed contests combine the power of crowdsourcing with the
                rich experience of our branding consultants. Get a complete
                agency-level experience at a fraction of Agency costs
              </p>
              <div className={styles.serviceBtn}>
                <a className={styles.serviceLink} href="/managed-contests">
                  Learn More
                  <img
                    className={styles.serviceArrow}
                    src={`${STATIC_IMAGES_PATH}how_it_work_icon/icon-arrow-long-right.svg`}
                    alt="Arrow Icon"
                  />
                </a>
              </div>
            </li>
          </ul>
        </section>
      </div>
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
              <li className={styles.namingContestStep}>
                <span className={styles.namingContestStepNumber}>Step 1</span>
                <p className={styles.namingContestStepDescription}>
                  Fill out your Naming Brief and begin receiving name ideas in
                  minutes
                </p>
                <img
                  className={styles.namingContestArrow}
                  src={`${STATIC_IMAGES_PATH}how_it_work_icon/arrow-long-right-blue.svg`}
                  alt="Arrow Icon"
                />
              </li>
              <li className={styles.namingContestStep}>
                <span className={styles.namingContestStepNumber}>Step 2</span>
                <p className={styles.namingContestStepDescription}>
                  Rate the submissions and provide feedback to creatives.
                  Creatives submit even more names based on your feedback.
                </p>
                <img
                  className={styles.namingContestArrow}
                  src={`${STATIC_IMAGES_PATH}how_it_work_icon/arrow-long-right-blue.svg`}
                  alt="Arrow Icon"
                />
              </li>
              <li className={styles.namingContestStep}>
                <span className={styles.namingContestStepNumber}>Step 3</span>
                <p className={styles.namingContestStepDescription}>
                  Our team helps you test your favorite names with your target
                  audience. We also assist with Trademark screening.
                </p>
                <img
                  className={styles.namingContestArrow}
                  src={`${STATIC_IMAGES_PATH}how_it_work_icon/arrow-long-right-blue.svg`}
                  alt="Arrow Icon"
                />
              </li>
              <li className={styles.namingContestStep}>
                <span className={styles.namingContestStepNumber}>Step 4</span>
                <p className={styles.namingContestStepDescription}>
                  Pick a Winner. The winner gets paid for their submission.
                </p>
              </li>
            </ul>
          </div>
        </section>
      </div>
      <div className={styles.faqContainer}>
        <section className={styles.faqSection}>
          <div className={styles.faqHeader}>
            <h3 className={styles.faqTitle}>Frequently Asked Questions</h3>
            <ul className={styles.faqCategories}>
              <li className={styles.faqCategory}>
                <a className={styles.faqLink} href="#launching-a-contest">
                  Launching A Contest
                </a>
              </li>
              <li className={styles.faqCategory}>
                <a className={styles.faqLink} href="#buying-from-marketplace">
                  Buying From Marketplace
                </a>
              </li>
              <li className={styles.faqCategory}>
                <a className={styles.faqLink} href="#managed-contests">
                  Managed Contests
                </a>
              </li>
              <li className={styles.faqCategory}>
                <a className={styles.faqLink} href="#for-creatives">
                  For Creatives
                </a>
              </li>
            </ul>
          </div>
          <div className={styles.faqContent}>
            <h4 className={styles.faqSubtitle} id="launching-a-contest">
              Buying From Marketplace
            </h4>
            <ul className={styles.faqList}>
              <li className={styles.faqItem}>
                <div className={styles.faqQuestion}>
                  How long does it take to start receiving submissions?
                  <img
                    src={`${STATIC_IMAGES_PATH}how_it_work_icon/icon-plus.svg`}
                    alt="icon"
                  />
                </div>
              </li>
              <li className={styles.faqItem}>
                <div className={styles.faqQuestion}>
                  How long do Naming Contests last?
                  <img
                    src={`${STATIC_IMAGES_PATH}how_it_work_icon/icon-plus.svg`}
                    alt="icon"
                  />
                </div>
              </li>
              <li className={styles.faqItem}>
                <div className={styles.faqQuestion}>
                  Where are the creatives located?
                  <img
                    src={`${STATIC_IMAGES_PATH}how_it_work_icon/icon-plus.svg`}
                    alt="icon"
                  />
                </div>
              </li>
              <li className={styles.faqItem}>
                <div className={styles.faqQuestion}>
                  What if I do not like any submissions?
                  <img
                    src={`${STATIC_IMAGES_PATH}how_it_work_icon/icon-plus.svg`}
                    alt="icon"
                  />
                </div>
              </li>
              <li className={styles.faqItem}>
                <div className={styles.faqQuestion}>
                  How much does it cost?
                  <img
                    src={`${STATIC_IMAGES_PATH}how_it_work_icon/icon-plus.svg`}
                    alt="icon"
                  />
                </div>
              </li>
              <li className={styles.faqItem}>
                <div className={styles.faqQuestion}>
                  I need both a Name and a Logo. Do you offer any discount for
                  multiple contests?
                  <img
                    src={`${STATIC_IMAGES_PATH}how_it_work_icon/icon-plus.svg`}
                    alt="icon"
                  />
                </div>
              </li>
              <li className={styles.faqItem}>
                <div className={styles.faqQuestion}>
                  What if I want to keep my business idea private?
                  <img
                    src={`${STATIC_IMAGES_PATH}how_it_work_icon/icon-plus.svg`}
                    alt="icon"
                  />
                </div>
              </li>
              <li className={styles.faqItem}>
                <div className={styles.faqQuestion}>
                  Can you serve customers outside the US?
                  <img
                    src={`${STATIC_IMAGES_PATH}how_it_work_icon/icon-plus.svg`}
                    alt="icon"
                  />
                </div>
              </li>
              <li className={styles.faqItem}>
                <div className={styles.faqQuestion}>
                  Can I see any examples?
                  <img
                    src={`${STATIC_IMAGES_PATH}how_it_work_icon/icon-plus.svg`}
                    alt="icon"
                  />
                </div>
              </li>
            </ul>
          </div>
          <div className={styles.faqContent}>
            <h4 className={styles.faqSubtitle} id="buying-from-marketplace">
              Buying From Marketplace
            </h4>
            <ul className={styles.faqList}>
              <li className={styles.faqItem}>
                <div className={styles.faqQuestion}>
                  What's included with a Domain Purchase?
                  <img
                    src={`${STATIC_IMAGES_PATH}how_it_work_icon/icon-plus.svg`}
                    alt="icon"
                  />
                </div>
              </li>
              <li className={styles.faqItem}>
                <div className={styles.faqQuestion}>
                  How does the Domain transfer process work?
                  <img
                    src={`${STATIC_IMAGES_PATH}how_it_work_icon/icon-plus.svg`}
                    alt="icon"
                  />
                </div>
              </li>
              <li className={styles.faqItem}>
                <div className={styles.faqQuestion}>
                  If I purchase a Domain on installments, can I start using it
                  to setup my website?
                  <img
                    src={`${STATIC_IMAGES_PATH}how_it_work_icon/icon-plus.svg`}
                    alt="icon"
                  />
                </div>
              </li>
            </ul>
          </div>
          <div className={styles.faqContent}>
            <h4 className={styles.faqSubtitle} id="managed-contests">
              Managed Contests
            </h4>
            <ul className={styles.faqList}>
              <li className={styles.faqItem}>
                <div className={styles.faqQuestion}>
                  What are Managed Contests?
                  <img
                    src={`${STATIC_IMAGES_PATH}how_it_work_icon/icon-plus.svg`}
                    alt="icon"
                  />
                </div>
              </li>
              <li className={styles.faqItem}>
                <div className={styles.faqQuestion}>
                  What's a typical timeline for a Managed Contest?
                  <img
                    src={`${STATIC_IMAGES_PATH}how_it_work_icon/icon-plus.svg`}
                    alt="icon"
                  />
                </div>
              </li>
              <li className={styles.faqItem}>
                <div className={styles.faqQuestion}>
                  How much do Managed Contests cost?
                  <img
                    src={`${STATIC_IMAGES_PATH}how_it_work_icon/icon-plus.svg`}
                    alt="icon"
                  />
                </div>
              </li>
              <li className={styles.faqItem}>
                <div className={styles.faqQuestion}>
                  Where are the Branding Consultants located?
                  <img
                    src={`${STATIC_IMAGES_PATH}how_it_work_icon/icon-plus.svg`}
                    alt="icon"
                  />
                </div>
              </li>
            </ul>
          </div>
          <div className={styles.faqContent}>
            <h4 className={styles.faqSubtitle} id="for-creatives">
              For Creatives
            </h4>
            <ul className={styles.faqList}>
              <li className={styles.faqItem}>
                <div className={styles.faqQuestion}>
                  Can anyone join your platform?
                  <img
                    src={`${STATIC_IMAGES_PATH}how_it_work_icon/icon-plus.svg`}
                    alt="icon"
                  />
                </div>
              </li>
              <li className={styles.faqItem}>
                <div className={styles.faqQuestion}>
                  Can I start participating immediately upon signing up?
                  <img
                    src={`${STATIC_IMAGES_PATH}how_it_work_icon/icon-plus.svg`}
                    alt="icon"
                  />
                </div>
              </li>
              <li className={styles.faqItem}>
                <div className={styles.faqQuestion}>
                  How Do I Get Paid?
                  <img
                    src={`${STATIC_IMAGES_PATH}how_it_work_icon/icon-plus.svg`}
                    alt="icon"
                  />
                </div>
              </li>
            </ul>
          </div>
        </section>
      </div>
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
            <a className={styles.faqCategoryLink} href="#">
              Tech
            </a>
            <a className={styles.faqCategoryLink} href="#">
              Clothing
            </a>
            <a className={styles.faqCategoryLink} href="#">
              Finance
            </a>
            <a className={styles.faqCategoryLink} href="#">
              Real Estate
            </a>
            <a className={styles.faqCategoryLink} href="#">
              Crypto
            </a>
            <a className={styles.faqCategoryLink} href="#">
              Short
            </a>
            <a className={styles.faqCategoryLink} href="#">
              One Word
            </a>
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
    </div>
  );
}
export default HowItWorkPage;
