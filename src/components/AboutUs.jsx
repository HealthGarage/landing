import { useLanguage } from '../context/LanguageContext';
import './AboutUs.css';

const AboutUs = () => {
  const { t } = useLanguage();

  return (
    <section id="about-us" className="about-us">
      <div className="about-container">
        <div className="section-header">
          <h2>{t('aboutUs.title')}</h2>
          <p className="subtitle">{t('aboutUs.subtitle')}</p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
