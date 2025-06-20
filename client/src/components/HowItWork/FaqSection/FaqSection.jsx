import React, { useState } from 'react';
import styles from './../FaqSection/FaqSection.module.sass';
import CONSTANTS from './../../../constants';

const { STATIC_IMAGES_PATH } = CONSTANTS;

const faqItemsLaunching = [
  {
    question: 'How long does it take to start receiving submissions?',
    answer:
      'For Naming contests, you will start receiving your submissions within few minutes of launching your contest. Since our creatives are located across the globe, you can expect to receive submissions 24 X 7 throughout the duration of the brainstorming phase.',
  },
  {
    question: 'How long do Naming Contests last?',
    answer:
      'You can choose a duration from 1 day to 7 days. We recommend a duration of 3 Days or 5 Days. This allows for sufficient time for entry submission as well as brainstorming with creatives. If you take advantage of our validation services such as Audience Testing and Trademark Research, both will be an additional 4-7 days (3-5 business days for Audience Testing and 1-2 business days for Trademark Research).',
  },
  {
    question: 'Where are the creatives located?',
    answer:
      'About 70% of our Creatives are located in the United States and other English speaking countries (i.e. United Kingdom, Canada, and Australia.). We utilize an advanced rating score algorithm to ensure that high quality creatives receive more opportunities to participate in our contests.',
  },
  {
    question: 'What if I do not like any submissions?',
    answer: (
      <div>
        <p>
          While it is unusually rare that you will not like any names provided,
          we have a few options in case this problem occurs:
        </p>
        <ul>
          <li>
            If the contest ends and you have not yet found a name that you’d
            like to move forward with, we can provide complimentary extension of
            your contest as well as a complimentary consultation with one of our
            branding consultants (a $99 value).
          </li>
          <li>
            By exploring our premium domain marketplace you can apply the
            contest award towards the purchase of any name listed for sale.
          </li>
          <li>
            If you choose the Gold package or Platinum package and keep the
            contest as 'Not Guaranteed', you can request a partial refund if you
            choose not to move forward with any name from your project. (Please
            note that the refund is for the contest award). Here is a link to
            our <a href="#">Refund Policy</a>.
          </li>
        </ul>
      </div>
    ),
  },
  {
    question: 'How much does it cost?',
    answer: (
      <div>
        Our naming competitions start at $299, and our logo design competitions
        start at $299. Also, there are three additional contest levels that each
        offer more features and benefits. See our <a href="#">Pricing Page</a>{' '}
        for details.
      </div>
    ),
  },
  {
    question:
      'I need both a Name and a Logo. Do you offer any discount for multiple contests?',
    answer: (
      <div>
        Yes! We have many contest bundles - our most popular being our Name,
        Tagline, and Logo bundle. Bundles allow you to purchase multiple
        contests at one time and save as much as from $75 - $400. You can learn
        more about our bundle options on our <a href="#">Pricing Page</a>.
      </div>
    ),
  },
  {
    question: 'What if I want to keep my business idea private?',
    answer:
      'You can select a Non Disclosure Agreement (NDA) option at the time of launching your competition. This will ensure that only those contestants who agree to the NDA will be able to read your project brief and participate in the contest. The contest details will be kept private from other users, as well as search engines.',
  },
  {
    question: 'Can you serve customers outside the US?',
    answer:
      "Absolutely. Atom services organizations across the globe. Our customers come from many countries, such as the United States, Australia, Canada, Europe, India, and MENA. We've helped more than 25,000 customers around the world.",
  },
  {
    question: 'Can I see any examples?',
    answer: (
      <div>
        <p>
          Our creatives have submitted more than 6 Million names and thousands
          of logos on our platform. Here are some examples of Names, Taglines,
          and Logos that were submitted in recent contests.
        </p>
        <ul>
          <li>
            <a href="#">Name Examples</a>
          </li>
          <li>
            <a href="#">Tagline Examples</a>
          </li>
          <li>
            <a href="#">Logo Examples</a>
          </li>
        </ul>
      </div>
    ),
  },
];
const faqItemsMarketplace = [
  {
    question: "What's included with a Domain Purchase?",
    answer:
      'When you purchase a domain from our premium domain marketplace, you will receive the exact match .com URL, a complimentary logo design (along with all source files), as well as a complimentary Trademark report and Audience Testing if you’re interested in validating your name.',
  },
  {
    question: 'How does the Domain transfer process work?',
    answer:
      'Once you purchase a Domain, our transfer specialists will reach out to you (typically on the same business day). In most cases we can transfer the domain to your preferred registrar (such as GoDaddy). Once we confirm the transfer details with you, the transfers are typically initiated to your account within 1 business day.',
  },
  {
    question:
      'If I purchase a Domain on installments, can I start using it to setup my website?',
    answer:
      'We offer payment plans for many domains in our Marketplace. If you purchase a domain on a payment plan, we hold the domain in an Escrow account until it is fully paid off. However our team can assist you with making any changes to the domains (such as Nameserver changes), so that you can start using the domain right away after making your first installment payment.',
  },
];
const faqItemsManaged = [
  {
    question: 'What are Managed Contests?',
    answer: (
      <div>
        The 'Managed' option is a fully managed service by Atom Branding
        experts. It includes a formal brief preparation by Atom team and
        management of your contest. Managed Contests are a great fit for
        companies that are looking for an 'Agency' like experience and they do
        not want to manage the contest directly. Our branding team has directly
        managed hundreds of branding projects and has learned several best
        practices that lead to successful project outcomes. Our team will apply
        all best practices towards the management of your branding project.
        Learn more about our <a href="#">Managed Contest Service</a>.
      </div>
    ),
  },
  {
    question: "What's a typical timeline for a Managed Contest?",
    answer: (
      <div>
        <p>The overall process takes 12-13 days.</p>
        <ul>
          <li>
            The Managed projects start with a project kick-off call with your
            Branding Consultant. You can schedule this call online immediately
            after making your payment.
          </li>
          <li>
            After your kick-off call, the Branding consultant will write your
            project brief and send for your approval within 1 business day.
          </li>
          <li>
            Upon your approval, the contest will go live. The branding
            consultant will help manage your project throughout the
            brainstorming phase (typically 5 days).
          </li>
          <li>
            Upon the completion of brainstorming phase, the branding consultant
            will work with you to test the top 6 names from your Shortlist (3-5
            Days). In addition, the branding consultant will coordinate the
            detailed Trademark screening (1-3 days).
          </li>
        </ul>
      </div>
    ),
  },
  {
    question: 'How much do Managed Contests cost?',
    answer: (
      <div>
        <p>
          We offer two levels of Managed Contests. Standard ($1499) and
          Enterprise ($2999). The Enterprise managed contest includes:
        </p>
        <ul>
          <li>
            (1) a $500 award amount (instead of $300), which will attract our
            top Creatives and provide more options to choose from;
          </li>
          <li>
            (2) we will ensure a senior member of our branding team is assigned
            to your project and the branding team will invest about 3X more time
            in the day-to-day management of your project;
          </li>
          <li>
            (3) you will receive more high-end trademark report and 5X more
            responses for your audience test.
          </li>
          <li>
            Here is a link to our <a href="#">Pricing page</a> with a detailed
            comparison of the two packages.
          </li>
        </ul>
      </div>
    ),
  },
  {
    question: 'Where are the Branding Consultants located?',
    answer:
      'All our branding consultants are based in our Headquarters (Hoffman Estates, IL). Our branding consultants have many years of experience in managing hundreds of branding projects for companies ranging from early stage startups to Fortune 500 corporations.',
  },
];
const faqItemsCreatives = [
  {
    question: 'Can anyone join your platform?',
    answer: (
      <div>
        We are open to anyone to signup. However, we have an extensive{' '}
        <a href="#">Quality Scoring</a> algorithm that assigns a quality score
        to each creative. As your quality score increases you will get more
        opportunities to participate in contests as well as higher payouts. To
        improve your quality score we recommend reviewing our{' '}
        <a href="#">Contest Tips and Best Practices</a>.
      </div>
    ),
  },
  {
    question: 'How much can I earn?',
    answer:
      'Creative earnings vary by contest type, level, and quality of submissions. Our top creatives earn more than $15,000 per month, while new creatives typically earn $250 - $500 per month as they build their portfolios.',
  },
  {
    question: 'How can I get paid?',
    answer: (
      <div>
        We offer multiple payment options including PayPal and direct deposit
        (ACH) payments for US-based creatives. For international creatives, we
        offer PayPal and wire transfers. Payments are issued within 15 business
        days after contest completion.
      </div>
    ),
  },
];

function FaqSection() {
  const [openIndex, setOpenIndex] = useState([]);

  const toggleAnswer = key => {
    setOpenIndex(prev =>
      prev.includes(key) ? prev.filter(i => i !== key) : [...prev, key]
    );
  };
  const renderFaqSection = (title, items, prefix) => (
    <div className={styles.faqContent}>
      <h4 className={styles.faqSubtitle} id={prefix}>
        {title}
      </h4>
      <ul className={styles.faqList}>
        {items.map((item, index) => {
          const key = `${prefix}-${index}`;
          const isOpen = openIndex.includes(key);
          return (
            <li
              className={`${styles.faqItem} ${isOpen ? styles.openItem : ''}`}
              key={key}
            >
              <div
                className={`${styles.faqQuestion} ${
                  isOpen ? styles.openQuestion : ''
                }`}
                onClick={() => toggleAnswer(key)}
              >
                {item.question}
                <img
                  src={`${STATIC_IMAGES_PATH}how_it_work_icon/${
                    isOpen ? 'icon-close.svg' : 'icon-plus.svg'
                  }`}
                  alt={isOpen ? 'close icon' : 'plus icon'}
                />
              </div>
              {isOpen && (
                <div className={`${styles.faqAnswer} ${styles.showAnswer}`}>
                  {item.answer}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
  return (
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
        <div>
          {renderFaqSection(
            'Launching A Contest',
            faqItemsLaunching,
            'launching-a-contest'
          )}
          {renderFaqSection(
            'Buying From Marketplace',
            faqItemsMarketplace,
            'buying-from-marketplace'
          )}
          {renderFaqSection(
            'Managed Contests',
            faqItemsManaged,
            'managed-contests'
          )}
          {renderFaqSection(
            'For Creatives',
            faqItemsCreatives,
            'for-creatives'
          )}
        </div>
      </section>
    </div>
  );
}

export default FaqSection;
