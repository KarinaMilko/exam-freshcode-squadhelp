import styles from './../HowItWorkPage/HowItWorkPage.module.sass';
import FaqSection from '../../components/HowItWork/FaqSection/FaqSection';
import IntroSection from '../../components/HowItWork/IntroSection/IntroSection';
import ServicesSection from '../../components/HowItWork/ServicesSection/ServicesSection';
import NamingContestSteps from '../../components/HowItWork/NamingContestSteps/NamingContestSteps';
import FaqSearchSection from '../../components/HowItWork/FaqSearchSection/FaqSearchSection';

function HowItWorkPage() {
  return (
    <div className={styles.atomContainer}>
      <IntroSection />
      <ServicesSection />
      <NamingContestSteps />
      <FaqSection />
      <FaqSearchSection />
    </div>
  );
}
export default HowItWorkPage;
