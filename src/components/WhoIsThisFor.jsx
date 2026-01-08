import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faShieldAlt, faWrench, faComments, faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '../context/LanguageContext';
import './WhoIsThisFor.css';

const WhoIsThisFor = () => {
  const { t } = useLanguage();
  
  const targetAudience = [
    {
      icon: faClock,
      textKey: 'whoIsThisFor.noTime'
    },
    {
      icon: faShieldAlt,
      textKey: 'whoIsThisFor.unsafeToDrive'
    },
    {
      icon: faWrench,
      textKey: 'whoIsThisFor.avoidUnnecessary'
    },
    {
      icon: faComments,
      textKey: 'whoIsThisFor.honestAdvice'
    },
    {
      icon: faClipboardCheck,
      textKey: 'whoIsThisFor.clearUnderstanding'
    }
  ];

  return (
    <section id="who-is-this-for" className="who-is-this-for">
      <div className="who-container">
        <div className="section-header">
          <h2>{t('whoIsThisFor.title')}</h2>
          <p className="subtitle">{t('whoIsThisFor.subtitle')}</p>
        </div>
        
        <div className="audience-grid">
          {targetAudience.map((item, index) => (
            <div key={index} className="audience-item">
              <div className="audience-icon">
                <FontAwesomeIcon icon={item.icon} />
              </div>
              <p>{t(item.textKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoIsThisFor;
