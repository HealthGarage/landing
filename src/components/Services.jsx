import { useState, useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faClipboardCheck, faCode, faCheck, faCalculator, faCircleInfo, faTriangleExclamation, faXmark, faCarSide, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '../context/LanguageContext';
import './Services.css';

const CODING_HOUR_RATE = 45;
const MECHANICAL_HOUR_RATE = 25;

const Services = () => {
  const { t } = useLanguage();
  const [activeServiceType, setActiveServiceType] = useState('onsite'); // 'onsite' or 'mobile'
  const [activeView, setActiveView] = useState('services'); // 'services' or 'calculator'
  const [distance, setDistance] = useState(30);
  const [pricingModel, setPricingModel] = useState('standard'); // 'standard' or 'alternative'
  const [selectedService, setSelectedService] = useState('basic'); // 'basic', 'full', or 'coding'
  const [isSupportedCarsOpen, setIsSupportedCarsOpen] = useState(false);
  const [isOnsiteTooltipOpen, setIsOnsiteTooltipOpen] = useState(false);

  // Close supported cars modal on Escape key
  useEffect(() => {
    if (!isSupportedCarsOpen) return;
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsSupportedCarsOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isSupportedCarsOpen]);

  // Close on-site tooltip when tapping/clicking outside of it (for touch devices)
  useEffect(() => {
    if (!isOnsiteTooltipOpen) return;
    const handleClickOutside = (e) => {
      if (!e.target.closest('.info-tooltip-wrapper')) {
        setIsOnsiteTooltipOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOnsiteTooltipOpen]);

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
    },
    {
      icon: faScrewdriverWrench,
      titleKey: 'services.onsite.mechanicalDiagnostic.title',
      price: '25 € / ' + t('services.hour'),
      featuresKey: 'services.onsite.mechanicalDiagnostic.features'
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
    },
    {
      icon: faScrewdriverWrench,
      titleKey: 'services.mobile.mechanicalDiagnostic.title',
      price: '25 € / ' + t('services.hour'),
      featuresKey: 'services.mobile.mechanicalDiagnostic.features'
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
    let codingFee = 0;
    let mechanicalFee = 0;
    let total = 0;

    if (selectedService === 'coding') {
      if (pricingModel === 'standard') {
        // Standard coding: basic diagnostic fee + distance rate + 1h coding
        serviceFee = 15;
        pricePerKm = 0.3;
        codingFee = CODING_HOUR_RATE;
        total = serviceFee + (dist * pricePerKm) + codingFee;
      } else {
        // Alternative coding: single per-km rate already covers diagnostic + coding
        serviceFee = 0;
        codingFee = 0;

        if (dist <= 50) pricePerKm = 2.0;
        else if (dist <= 100) pricePerKm = 1.5;
        else pricePerKm = 1.2;

        total = dist * pricePerKm;
      }
    } else if (selectedService === 'mechanical') {
      if (pricingModel === 'standard') {
        // Standard mechanical diagnostic: basic diagnostic fee + distance rate + 1h mechanical work
        serviceFee = 15;
        pricePerKm = 0.3;
        mechanicalFee = MECHANICAL_HOUR_RATE;
        total = serviceFee + (dist * pricePerKm) + mechanicalFee;
      } else {
        // Alternative mechanical diagnostic: single per-km rate already covers everything
        serviceFee = 0;
        mechanicalFee = 0;
        pricePerKm = 2.5;

        total = dist * pricePerKm;
      }
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
      codingFee,
      mechanicalFee,
      distance: dist,
      total: total.toFixed(2)
    };
  }, [distanceValue, pricingModel, selectedService]);

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

        {/* Service Selection */}
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
            <button
              className={`service-btn ${selectedService === 'coding' ? 'active' : ''}`}
              onClick={() => setSelectedService('coding')}
            >
              {t('services.calculator.coding')}
            </button>
            <button
              className={`service-btn ${selectedService === 'mechanical' ? 'active' : ''}`}
              onClick={() => setSelectedService('mechanical')}
            >
              {t('services.calculator.mechanicalDiag')}
            </button>
          </div>
        </div>

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
              {calculatedPrice.serviceFee > 0 && (
                <div className="breakdown-item">
                  <span>{t('services.calculator.serviceFee')}:</span>
                  <span>{calculatedPrice.serviceFee} €</span>
                </div>
              )}
              <div className="breakdown-item">
                <span>{t('services.calculator.distanceFee')} ({calculatedPrice.pricePerKm} € / km):</span>
                <span>{(calculatedPrice.distance * calculatedPrice.pricePerKm).toFixed(2)} €</span>
              </div>
              {calculatedPrice.codingFee > 0 && (
                <div className="breakdown-item">
                  <span>{t('services.calculator.codingFee')}:</span>
                  <span>{calculatedPrice.codingFee} €</span>
                </div>
              )}
              {calculatedPrice.mechanicalFee > 0 && (
                <div className="breakdown-item">
                  <span>{t('services.calculator.mechanicalFee')}:</span>
                  <span>{calculatedPrice.mechanicalFee} €</span>
                </div>
              )}
              <div className="breakdown-divider"></div>
              <div className="breakdown-item total">
                <span>{t('services.calculator.total')}:</span>
                <span>{calculatedPrice.total} €</span>
              </div>
            </div>
            {selectedService === 'coding' && (
              <div>
                <p className="coding-note">
                  <FontAwesomeIcon icon={faCircleInfo} /> {t('services.calculator.codingBeforeNote')}
                </p>
                <p className="coding-note">
                  <FontAwesomeIcon icon={faCircleInfo} /> {t('services.calculator.codingHourNote')}
                </p>
              </div>
            )}
            {selectedService === 'mechanical' && (
              <div>
                <p className="coding-note">
                  <FontAwesomeIcon icon={faCircleInfo} /> {t('services.calculator.mechanicalBeforeNote')}
                </p>
                <p className="coding-note">
                  <FontAwesomeIcon icon={faCircleInfo} /> {t('services.calculator.mechanicalHourNote')}
                </p>
              </div>
            )}
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

        {/* On-site Explanation Note */}
        {activeServiceType === 'onsite' && (
          <p className="service-type-explanation">
            <span
              className="info-tooltip-wrapper"
              onClick={() => setIsOnsiteTooltipOpen((open) => !open)}
            >
              <FontAwesomeIcon
                icon={faCircleInfo}
                className="info-tooltip-icon"
                tabIndex={0}
                role="button"
                aria-label={t('services.onsiteExplanationTooltip')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setIsOnsiteTooltipOpen((open) => !open);
                  }
                }}
              />
              <span className={`info-tooltip-content ${isOnsiteTooltipOpen ? 'open' : ''}`} role="tooltip">
                {t('services.onsiteExplanationTooltip')}
              </span>
            </span>{' '}
            {t('services.onsiteExplanation')}
          </p>
        )}

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
