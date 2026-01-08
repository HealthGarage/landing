import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCity, faIndustry, faRoad, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '../context/LanguageContext';
import './ServiceArea.css';

const ServiceArea = () => {
  const { t } = useLanguage();
  
  return (
    <section id="service-area" className="service-area">
      <div className="service-area-container">
        <div className="section-header">
          <h2>{t('serviceArea.title')}</h2>
          <p>{t('serviceArea.subtitle')}</p>
        </div>
        
        <div className="areas">
          <div className="area">
            <div className="area-icon">
              <FontAwesomeIcon icon={faCity} />
            </div>
            <h4>{t('serviceArea.tallinn.title')}</h4>
            <p>{t('serviceArea.tallinn.description')}</p>
          </div>
          <div className="area">
            <div className="area-icon">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </div>
            <h4>{t('serviceArea.maardu.title')}</h4>
            <p>{t('serviceArea.maardu.description')}</p>
          </div>
          <div className="area">
            <div className="area-icon">
              <FontAwesomeIcon icon={faIndustry} />
            </div>
            <h4>{t('serviceArea.kehra.title')}</h4>
            <p>{t('serviceArea.kehra.description')}</p>
          </div>
          <div className="area">
            <div className="area-icon">
              <FontAwesomeIcon icon={faRoad} />
            </div>
            <h4>{t('serviceArea.outside.title')}</h4>
            <p>{t('serviceArea.outside.description')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceArea;
