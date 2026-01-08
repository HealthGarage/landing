import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faBan, faShieldHalved, faCheckCircle, faClock } from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '../context/LanguageContext';
import './ImportantInfo.css';

const ImportantInfo = () => {
  const { t } = useLanguage();
  
  const infoItems = [
    {
      icon: faInfoCircle,
      textKey: 'importantInfo.diagnosticsGuidance'
    },
    {
      icon: faBan,
      textKey: 'importantInfo.noEmergency'
    },
    {
      icon: faShieldHalved,
      textKey: 'importantInfo.errorClearingSafe'
    },
    {
      icon: faCheckCircle,
      textKey: 'importantInfo.pricesConfirmed'
    },
    {
      icon: faClock,
      textKey: 'importantInfo.eveningTariffs'
    }
  ];

  return (
    <section id="important-info" className="important-info">
      <div className="important-container">
        <div className="section-header">
          <h2>{t('importantInfo.title')}</h2>
        </div>
        
        <div className="info-grid">
          {infoItems.map((item, index) => (
            <div key={index} className="info-item">
              <div className="info-icon">
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

export default ImportantInfo;
