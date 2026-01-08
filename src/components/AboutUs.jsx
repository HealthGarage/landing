import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faShieldAlt, faWrench, faComments, faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '../context/LanguageContext';
import './AboutUs.css';

const AboutUs = () => {
  const { t } = useLanguage();
  
  const reasons = [
    {
      icon: faClock,
      textKey: 'aboutUs.reasons.noTime'
    },
    {
      icon: faShieldAlt,
      textKey: 'aboutUs.reasons.unsafeToDrive'
    },
    {
      icon: faWrench,
      textKey: 'aboutUs.reasons.avoidUnnecessary'
    },
    {
      icon: faComments,
      textKey: 'aboutUs.reasons.honestAdvice'
    },
    {
      icon: faClipboardCheck,
      textKey: 'aboutUs.reasons.clearUnderstanding'
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
          <div className="reasons-grid">
            {reasons.map((item, index) => (
              <div key={index} className="reason-item">
                <div className="reason-icon">
                  <FontAwesomeIcon icon={item.icon} />
                </div>
                <p>{t(item.textKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
