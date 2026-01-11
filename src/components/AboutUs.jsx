import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt, faTruck, faHeartPulse } from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '../context/LanguageContext';
import './AboutUs.css';

const AboutUs = () => {
  const { t } = useLanguage();
  
  const advantages = [
    {
      icon: faTruck,
      titleKey: 'aboutUs.advantages.mobile.title',
      descriptionKey: 'aboutUs.advantages.mobile.description'
    },
    {
      icon: faShieldAlt,
      titleKey: 'aboutUs.advantages.honest.title',
      descriptionKey: 'aboutUs.advantages.honest.description'
    },
    {
      icon: faHeartPulse,
      titleKey: 'aboutUs.advantages.diagnostics.title',
      descriptionKey: 'aboutUs.advantages.diagnostics.description'
    }
  ];

  return (
    <section id="about-us" className="about-us">
      <div className="about-container">
        <div className="section-header">
          <h2>{t('aboutUs.title')}</h2>
          <p className="subtitle">{t('aboutUs.subtitle')}</p>
        </div>
        
        <div className="about-content">
          <div className="advantages-grid">
            {advantages.map((item, index) => (
              <div key={index} className="advantage-card">
                <div className="advantage-icon">
                  <FontAwesomeIcon icon={item.icon} />
                </div>
                <h3>{t(item.titleKey)}</h3>
                <p>{t(item.descriptionKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
