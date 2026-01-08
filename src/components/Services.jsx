import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faClipboardCheck, faScrewdriverWrench, faOilCan, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '../context/LanguageContext';
import './Services.css';

const Services = () => {
  const { t } = useLanguage();
  const [activeRegion, setActiveRegion] = useState('kehra');
  
  const kehraServices = [
    {
      icon: faSearch,
      titleKey: 'services.basicDiagnostic.title',
      descriptionKey: 'services.basicDiagnostic.description',
      featuresKey: 'services.basicDiagnostic.features'
    },
    {
      icon: faClipboardCheck,
      titleKey: 'services.fullDiagnostic.title',
      descriptionKey: 'services.fullDiagnostic.description',
      featuresKey: 'services.fullDiagnostic.features'
    },
    {
      icon: faScrewdriverWrench,
      titleKey: 'services.repair.title',
      descriptionKey: 'services.repair.description',
      featuresKey: 'services.repair.features'
    },
    {
      icon: faOilCan,
      titleKey: 'services.maintenance.title',
      descriptionKey: 'services.maintenance.description',
      featuresKey: 'services.maintenance.features'
    }
  ];

  const otherServices = [
    {
      icon: faSearch,
      titleKey: 'services.basicDiagnostic.title',
      descriptionKey: 'services.basicDiagnostic.description',
      featuresKey: 'services.basicDiagnostic.features'
    },
    {
      icon: faClipboardCheck,
      titleKey: 'services.fullDiagnostic.title',
      descriptionKey: 'services.fullDiagnostic.description',
      featuresKey: 'services.fullDiagnostic.features'
    }
  ];

  const currentServices = activeRegion === 'kehra' ? kehraServices : otherServices;

  return (
    <section id="services" className="services">
      <div className="services-container">
        <div className="section-header">
          <h2>{t('services.title')}</h2>
          <p>{t('services.subtitle')}</p>
        </div>

        {/* Region Tabs */}
        <div className="region-tabs">
          <button 
            className={`region-tab ${activeRegion === 'kehra' ? 'active' : ''}`}
            onClick={() => setActiveRegion('kehra')}
          >
            {t('services.regions.kehra')}
          </button>
          <button 
            className={`region-tab ${activeRegion === 'other' ? 'active' : ''}`}
            onClick={() => setActiveRegion('other')}
          >
            {t('services.regions.other')}
          </button>
        </div>
        
        <div className="services-grid">
          {currentServices.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">
                <FontAwesomeIcon icon={service.icon} />
              </div>
              <h3>{t(service.titleKey)}</h3>
              <p className="service-description">{t(service.descriptionKey)}</p>
              <ul className="service-features">
                {t(service.featuresKey).map((feature, idx) => (
                  <li key={idx}>
                    <FontAwesomeIcon icon={faCheck} className="checkmark" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
