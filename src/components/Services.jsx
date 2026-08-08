import { useState, useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faClipboardCheck, faCode, faCheck, faCalculator, faCircleInfo, faTriangleExclamation, faXmark, faCarSide } from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '../context/LanguageContext';
import './Services.css';

const Services = () => {
  const { t } = useLanguage();
  const [activeServiceType, setActiveServiceType] = useState('onsite'); // 'onsite' or 'mobile'
  const [activeView, setActiveView] = useState('services'); // 'services' or 'calculator'
  const [distance, setDistance] = useState(30);
  const [pricingModel, setPricingModel] = useState('standard'); // 'standard' or 'alternative'
  const [selectedService, setSelectedService] = useState('basic'); // 'basic', 'full', or 'coding'
  const [region, setRegion] = useState('general'); // 'general' or 'tallinn'
  const [isSupportedCarsOpen, setIsSupportedCarsOpen] = useState(false);

  // Close supported cars modal on Escape key
  useEffect(() => {
    if (!isSupportedCarsOpen) return;
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsSupportedCarsOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isSupportedCarsOpen]);

  // On-site services for Maardu
  const maarduOnsiteServices = [
    {
      icon: faSearch,
      titleKey: 'services.onsite.basicDiagnostic.title',
      price: '15 €',
      featuresKey: 'services.onsite.basicDiagnostic.features'
    },
    {
      icon: faClipboardCheck,
      titleKey: 'services.onsite.fullDiagnostic.title',
      price: '30 €',
      featuresKey: 'services.onsite.fullDiagnostic.features'
    },
    {
      icon: faCode,
      titleKey: 'services.onsite.coding.title',
      price: '45 € / ' + t('services.hour'),
      featuresKey: 'services.onsite.coding.features',
      isCoding: true
    }
  ];

  // Mobile services
  const mobileServices = [
    {
      icon: faSearch,
      titleKey: 'services.mobile.basicDiagnostic.title',
      price: '15 € + ' + t('services.kilometrage'),
      featuresKey: 'services.mobile.basicDiagnostic.features'
    },
    {
      icon: faClipboardCheck,
      titleKey: 'services.mobile.fullDiagnostic.title',
      price: '30 € + ' + t('services.kilometrage'),
      featuresKey: 'services.mobile.fullDiagnostic.features'
    },
    {
      icon: faCode,
      titleKey: 'services.mobile.coding.title',
      price: '45 € / ' + t('services.hour'),
      featuresKey: 'services.mobile.coding.features',
      isCoding: true
    }
  ];

  const sliderMin = pricingModel === 'alternative' ? 30 : 0;
  const sliderMax = 200;
  const distanceValue = Math.max(Number(distance) || 0, sliderMin);

  const calculateMobilePrice = useCallback(() => {
    const dist = distanceValue;
    if (isNaN(dist) || dist < 0) return null;

    let serviceFee = 0;
    let pricePerKm = 0;
    let total = 0;

    // Special pricing for Tallinn 18:00-19:00 (only for standard model)
    if (region === 'tallinn' && pricingModel === 'standard') {
      pricePerKm = 0.7;
      if (selectedService === 'basic') serviceFee = 15;
      else if (selectedService === 'full') serviceFee = 30;
      total = serviceFee + (dist * pricePerKm);
    } else {
      // General pricing
      if (pricingModel === 'standard') {
        // Standard: Service fee + distance
        if (selectedService === 'basic') serviceFee = 15;
        else if (selectedService === 'full') serviceFee = 30;

        if (dist <= 50) pricePerKm = 0.5;
        else if (dist <= 100) pricePerKm = 0.4;
        else pricePerKm = 0.35;

        total = serviceFee + (dist * pricePerKm);
      } else {
        // Alternative: No service fee, higher distance rate, min 30km
        serviceFee = 0;

        if (dist <= 50) pricePerKm = 1.5;
        else if (dist <= 100) pricePerKm = 1.2;
        else pricePerKm = 0.9;

        total = dist * pricePerKm;
      }
    }

    return {
      serviceFee,
      pricePerKm,
      distance: dist,
      total: total.toFixed(2)
    };
  }, [distanceValue, pricingModel, selectedService, region]);

  const currentServices = activeServiceType === 'onsite' ? maarduOnsiteServices : mobileServices;
  const sliderMarks = pricingModel === 'alternative'
    ? [{ value: 30, label: '30' }, { value: 50, label: '50' }, { value: 100, label: '100' }, { value: 150, label: '150' }, { value: 200, label: '200 km' }]
    : [{ value: 0, label: '0' }, { value: 50, label: '50' }, { value: 100, label: '100' }, { value: 150, label: '150' }, { value: 200, label: '200 km' }];


  const renderServices = () => (
    <div className="services-grid">
      {currentServices.map((service, index) => (
        <div key={index} className="service-card">
          <div className="service-icon">
            <FontAwesomeIcon icon={service.icon} />
          </div>
          <h3>{t(service.titleKey)}</h3>
          <div className="service-price">{service.price}</div>
          <ul className="service-features">
            {t(service.featuresKey).map((feature, idx) => (
              <li key={idx}>
                <FontAwesomeIcon icon={faCheck} className="checkmark" />
                {feature}
              </li>
            ))}
          </ul>
          {service.isCoding && (
            <button
              type="button"
              className="supported-cars-link"
              onClick={() => setIsSupportedCarsOpen(true)}
            >
              <FontAwesomeIcon icon={faCarSide} />
              {t(`${service.titleKey.replace('.title', '')}.supportedCarsLink`)}
            </button>
          )}
        </div>
      ))}
    </div>
  );

  const renderSupportedCarsModal = () => {
    if (!isSupportedCarsOpen) return null;

    return (
      <div
        className="modal-backdrop"
        onClick={() => setIsSupportedCarsOpen(false)}
        role="presentation"
      >
        <div
          className="supported-cars-modal"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="supported-cars-title"
        >
          <button
            type="button"
            className="modal-close"
            onClick={() => setIsSupportedCarsOpen(false)}
            aria-label={t('services.supportedCarsModal.close')}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <h3 id="supported-cars-title">{t('services.supportedCarsModal.title')}</h3>
          <p>{t('services.supportedCarsModal.description')}</p>
          <ul className="supported-cars-list">
            {t('services.supportedCarsModal.brands').map((brand, idx) => (
              <li key={idx}>
                <FontAwesomeIcon icon={faCheck} className="checkmark" />
                {brand}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const renderCalculator = () => {
    const calculatedPrice = calculateMobilePrice();
    
    return (
      <div className="mobile-calculator">
        <h3>{t('services.calculator.title')}</h3>
        <p className="calculator-description">{t('services.calculator.description')}</p>

        {/* Pricing Model Tabs */}
        <div className="pricing-model-tabs">
          <button 
            className={`model-tab ${pricingModel === 'standard' ? 'active' : ''}`}
            onClick={() => setPricingModel('standard')}
          >
            {t('services.calculator.standard')}
          </button>
          <button 
            className={`model-tab ${pricingModel === 'alternative' ? 'active' : ''}`}
            onClick={() => setPricingModel('alternative')}
          >
            {t('services.calculator.alternative')}
          </button>
        </div>

        {/* Region Selection */}
        <div className="region-selection">
          <label>{t('services.calculator.selectRegion')}</label>
          <div className="region-buttons">
            <button 
              className={`region-btn ${region === 'general' ? 'active' : ''}`}
              onClick={() => setRegion('general')}
            >
              {t('services.calculator.generalRegion')}
            </button>
            <button 
              className={`region-btn ${region === 'tallinn' ? 'active' : ''}`}
              onClick={() => setRegion('tallinn')}
            >
              {t('services.calculator.tallinnRegion')}
            </button>
          </div>
          {pricingModel === 'standard' && region === 'tallinn' && (
            <p className="rush-hour-note">{t('services.calculator.rushHourNote')}</p>
          )}
        </div>

        {/* Service Selection (only for standard model) */}
        {pricingModel === 'standard' && (
          <div className="service-selection">
            <label>{t('services.calculator.selectService')}</label>
            <div className="service-buttons">
              <button 
                className={`service-btn ${selectedService === 'basic' ? 'active' : ''}`}
                onClick={() => setSelectedService('basic')}
              >
                {t('services.calculator.basicDiag')}
              </button>
              <button 
                className={`service-btn ${selectedService === 'full' ? 'active' : ''}`}
                onClick={() => setSelectedService('full')}
              >
                {t('services.calculator.fullDiag')}
              </button>
            </div>
          </div>
        )}

        {/* Distance Slider */}
        <div className="distance-input">
          <div className="label-with-value">
            <label>{t('services.calculator.distance')}</label>
            <span className="distance-value">{distanceValue} km</span>
          </div>
          <div className="slider-container">
            <input
              type="range"
              min={sliderMin}
              max={sliderMax}
              step="1"
              value={distanceValue}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="distance-slider"
            />
            <div className="slider-labels">
              {sliderMarks.map((mark) => {
                const percent = ((mark.value - sliderMin) / (sliderMax - sliderMin)) * 100;
                return (
                  <span
                    key={mark.value}
                    className="slider-mark"
                    style={{ left: `calc(${percent}% + ${10 - percent * 0.2}px)` }}
                  >
                    {mark.label}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Price Breakdown */}
        {calculatedPrice && (
          <div className="price-result">
            <h4>{t('services.calculator.priceBreakdown')}</h4>
            <div className="breakdown-items">
              {pricingModel === 'standard' && (
                <div className="breakdown-item">
                  <span>{t('services.calculator.serviceFee')}:</span>
                  <span>{calculatedPrice.serviceFee} €</span>
                </div>
              )}
              <div className="breakdown-item">
                <span>{t('services.calculator.distanceFee')} ({calculatedPrice.pricePerKm} € / km):</span>
                <span>{(calculatedPrice.distance * calculatedPrice.pricePerKm).toFixed(2)} €</span>
              </div>
              <div className="breakdown-divider"></div>
              <div className="breakdown-item total">
                <span>{t('services.calculator.total')}:</span>
                <span>{calculatedPrice.total} €</span>
              </div>
            </div>
            <p className="coding-note">
              <FontAwesomeIcon icon={faCircleInfo} /> Перед кодингом всегда будет выполнена обычная диагностика.
            </p>
            {pricingModel === 'alternative' && (
              <div>
                <p className="alternative-note">
                  <FontAwesomeIcon icon={faCircleInfo} /> {t('services.calculator.alternativeNote')}
                </p>
                <p className="alternative-restriction">
                  <FontAwesomeIcon icon={faTriangleExclamation} /> {t('services.calculator.alternativeRestriction')}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="services" className="services">
      <div className="services-container">
        <div className="section-header">
          <h2>{t('services.title')}</h2>
        </div>

        {/* Service Type Tabs: On-site vs Mobile */}
        <div className="service-type-tabs">
          <button 
            className={`type-tab ${activeServiceType === 'onsite' ? 'active' : ''}`}
            onClick={() => {
              setActiveServiceType('onsite');
              setActiveView('services');
            }}
          >
            {t('services.types.onsite')}
          </button>
          <button 
            className={`type-tab ${activeServiceType === 'mobile' ? 'active' : ''}`}
            onClick={() => {
              setActiveServiceType('mobile');
              setActiveView('services');
            }}
          >
            {t('services.types.mobile')}
          </button>
        </div>

        {/* View Tabs for Mobile (Services vs Calculator) */}
        {activeServiceType === 'mobile' && (
          <div className="view-tabs">
            <button 
              className={`view-tab ${activeView === 'services' ? 'active' : ''}`}
              onClick={() => setActiveView('services')}
            >
              <FontAwesomeIcon icon={faCheck} /> {t('services.viewTabs.services')}
            </button>
            <button 
              className={`view-tab ${activeView === 'calculator' ? 'active' : ''}`}
              onClick={() => setActiveView('calculator')}
            >
              <FontAwesomeIcon icon={faCalculator} /> {t('services.viewTabs.calculator')}
            </button>
          </div>
        )}

        {/* Render Services or Calculator */}
        {activeView === 'services' ? renderServices() : renderCalculator()}
      </div>

      {renderSupportedCarsModal()}
    </section>
  );
};

export default Services;
