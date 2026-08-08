import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faEye, faShieldHalved, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '../context/LanguageContext';
import './WhyUs.css';

const WhyUs = () => {
  const { t } = useLanguage();

  const advantages = [
    {
      icon: faTruck,
      titleKey: 'whyUs.advantages.mobile.title',
      descriptionKey: 'whyUs.advantages.mobile.description'
    },
    {
      icon: faEye,
      titleKey: 'whyUs.advantages.transparency.title',
      descriptionKey: 'whyUs.advantages.transparency.description'
    },
    {
      icon: faShieldHalved,
      titleKey: 'whyUs.advantages.noSurprises.title',
      descriptionKey: 'whyUs.advantages.noSurprises.description'
    },
    {
      icon: faCommentDots,
      titleKey: 'whyUs.advantages.consultation.title',
      descriptionKey: 'whyUs.advantages.consultation.description'
    }
  ];

  return (
    <section id="why-us" className="why-us">
      <div className="why-us-container">
        <div className="section-header">
          <h2>{t('whyUs.title')}</h2>
          <p className="subtitle">{t('whyUs.subtitle')}</p>
        </div>

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
    </section>
  );
};

export default WhyUs;
