import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './Pricing.css';

const Pricing = () => {
  const { t } = useLanguage();
  const [activeLocation, setActiveLocation] = useState('tallinn');
  const [activePricingType, setActivePricingType] = useState('fixed');
  const [diagnosticType, setDiagnosticType] = useState('basic'); // 'basic' or 'full'
  const [distance, setDistance] = useState(25);
  const [timeSlot, setTimeSlot] = useState('18-19');
  const [calculatedPrice, setCalculatedPrice] = useState(null);

  const calculatePrice = useCallback(() => {
    const dist = parseFloat(distance);
    if (isNaN(dist) || dist < 0) {
      setCalculatedPrice(null);
      return;
    }

    let pricePerKm;
    let diagnosticsFee = 25;
    let totalPrice;

    // Tallinn calculator
    if (activeLocation === 'tallinn') {
      pricePerKm = 0.7;
      totalPrice = (dist * pricePerKm) + diagnosticsFee;
    } 
    // Maardu calculator
    else if (activeLocation === 'maardu') {
      pricePerKm = 0.7;
      totalPrice = (dist * pricePerKm) + diagnosticsFee;
    }
    // Kehra calculator
    else if (activeLocation === 'kehra') {
      pricePerKm = 0.5;
      totalPrice = (dist * pricePerKm) + diagnosticsFee;
    }
    // Other locations (Outside Tallinn & Maardu)
    else if (activeLocation === 'other') {
      if (dist <= 50) {
        pricePerKm = 0.5;
      } else if (dist <= 100) {
        pricePerKm = 0.4;
      } else {
        pricePerKm = 0.3;
      }
      totalPrice = (dist * pricePerKm) + diagnosticsFee;
    }

    setCalculatedPrice({
      distance: dist,
      pricePerKm,
      diagnosticsFee,
      total: totalPrice.toFixed(2),
      formula: `${dist} km × ${pricePerKm} €/km + ${diagnosticsFee} € diagnostics`
    });
  }, [distance, activeLocation]);

  // Calculate price automatically when distance or timeSlot changes
  useEffect(() => {
    if (activePricingType === 'distance') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      calculatePrice();
    }
  }, [activePricingType, calculatePrice]);

  // Render fixed pricing based on location
  const renderFixedPricing = () => {
    const isFullDiagnostic = diagnosticType === 'full';
    
    if (activeLocation === 'tallinn') {
      return (
        <div className="tallinn-pricing">
          <div className="time-slot-section">
            <h4>⏰ {t('pricing.timeSlots.peak')}</h4>
            <div className="district-prices">
              <div className="district-item">
                <span className="district-name">Lasnamäe, Viimsi, Pirita</span>
                <span className="district-price">{isFullDiagnostic ? '60' : '40'} €</span>
              </div>
              <div className="district-item">
                <span className="district-name">Kesklinn / Südalinn</span>
                <span className="district-price">{isFullDiagnostic ? '70' : '50'} €</span>
              </div>
              <div className="district-item">
                <span className="district-name">Põhja-Tallinn, Kristiine, Mustamäe</span>
                <span className="district-price">{isFullDiagnostic ? '75' : '60'} €</span>
              </div>
              <div className="district-item">
                <span className="district-name">Haabersti, Nõmme, Õismäe</span>
                <span className="district-price">{isFullDiagnostic ? '80' : '70'} €</span>
              </div>
            </div>
          </div>

          <div className="time-slot-section">
            <h4>⏰ {t('pricing.timeSlots.reduced')}</h4>
            <div className="district-prices">
              <div className="district-item">
                <span className="district-name">Lasnamäe, Viimsi, Pirita</span>
                <span className="district-price">{isFullDiagnostic ? '50' : '35'} €</span>
              </div>
              <div className="district-item">
                <span className="district-name">Kesklinn / Südalinn</span>
                <span className="district-price">{isFullDiagnostic ? '55' : '45'} €</span>
              </div>
              <div className="district-item">
                <span className="district-name">Põhja-Tallinn, Kristiine, Mustamäe</span>
                <span className="district-price">{isFullDiagnostic ? '60' : '50'} €</span>
              </div>
              <div className="district-item">
                <span className="district-name">Haabersti, Nõmme, Õismäe</span>
                <span className="district-price">{isFullDiagnostic ? '65' : '60'} €</span>
              </div>
            </div>
          </div>

          <div className="time-slot-section">
            <h4>⏰ {t('pricing.timeSlots.late')}</h4>
            <div className="district-prices">
              <div className="district-item">
                <span className="district-name">{t('pricing.allDistricts')}</span>
                <span className="district-price">2× {t('pricing.tariffApplies')}</span>
              </div>
            </div>
          </div>

          <div className="weekend-section">
            <h4>📅 {t('pricing.weekends')}</h4>
            <div className="price-cards">
              <div className="price-card">
                <h4>{t('pricing.weekendsAndHolidays')}</h4>
                <div className="price">40 €</div>
                <p>{t('pricing.constantPrice')}</p>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (activeLocation === 'maardu') {
      return (
        <div className="maardu-pricing">
          <div className="price-cards">
            <div className="price-card">
              <h4>{t('pricing.mobileToYou')}</h4>
              <div className="price">{isFullDiagnostic ? '45' : '30'} €</div>
              <p>{t('pricing.weComeTo')} {t('pricing.locations.maardu')}</p>
            </div>
            <div className="price-card">
              <h4>{t('pricing.bringToUs')}</h4>
              <div className="price">{isFullDiagnostic ? '40' : '25'} €</div>
              <p>{t('pricing.youBringTo')} {t('pricing.locations.maardu')}</p>
            </div>
          </div>
          <div className="weekend-section">
            <h4>📅 {t('pricing.weekends')}</h4>
            <div className="price-cards">
              <div className="price-card">
                <h4>{t('pricing.weekendsAndHolidays')}</h4>
                <div className="price">40 €</div>
                <p>{t('pricing.constantPrice')}</p>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (activeLocation === 'kehra') {
      return (
        <div className="kehra-pricing">
          <div className="price-cards">
            <div className="price-card">
              <h4>{t('pricing.mobileToYou')}</h4>
              <div className="price">{isFullDiagnostic ? '45' : '30'} €</div>
              <p>{t('pricing.weComeTo')} {t('pricing.locations.kehra')}</p>
            </div>
            <div className="price-card">
              <h4>{t('pricing.bringToUs')}</h4>
              <div className="price">{isFullDiagnostic ? '40' : '25'} €</div>
              <p>{t('pricing.youBringTo')} {t('pricing.locations.kehra')}</p>
            </div>
          </div>
          <div className="weekend-section">
            <h4>📅 {t('pricing.weekends')}</h4>
            <div className="price-cards">
              <div className="price-card">
                <h4>{t('pricing.weekendsAndHolidays')}</h4>
                <div className="price">40 €</div>
                <p>{t('pricing.constantPrice')}</p>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (activeLocation === 'other') {
      return (
        <div className="other-pricing">
          <h4>{t('pricing.outsideTallinnMaardu')}</h4>
          <div className="distance-ranges">
            <div className="range-item">
              <span className="range">0–50 km</span>
              <span className="rate">0.5 € / km + 25 € {t('pricing.diagnostics')}</span>
            </div>
            <div className="range-item">
              <span className="range">50–100 km</span>
              <span className="rate">0.4 € / km + 25 € {t('pricing.diagnostics')}</span>
            </div>
            <div className="range-item">
              <span className="range">100+ km</span>
              <span className="rate">0.3 € / km + 25 € {t('pricing.diagnostics')}</span>
            </div>
            <div className="range-item alternative">
              <span className="range">100+ km ({t('pricing.alternative')})</span>
              <span className="rate">0.7 € / km ({t('pricing.diagnosticsIncluded')})</span>
            </div>
          </div>
          <div className="weekend-section">
            <h4>📅 {t('pricing.weekends')}</h4>
            <div className="price-cards">
              <div className="price-card">
                <h4>{t('pricing.weekendsAndHolidays')}</h4>
                <div className="price">40 €</div>
                <p>{t('pricing.constantPrice')}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  // Render distance calculator
  const renderDistanceCalculator = () => {
    return (
      <div className="calculator">
        <h3>{t('pricing.calculatorTitle')}</h3>
        <p className="calculator-description">
          {t('pricing.calculatorDescription')}
        </p>

        <div className="calculator-form">
          <div className="form-group">
            <div className="label-with-value">
              <label htmlFor="distance">{t('pricing.distance')}</label>
              <span className="distance-value">{distance} {t('pricing.km')}</span>
            </div>
            <div className="slider-container">
              <input
                id="distance"
                type="range"
                min="0"
                max={activeLocation === 'tallinn' ? '50' : (activeLocation === 'maardu' || activeLocation === 'kehra') ? '30' : '300'}
                step="1"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                className="distance-slider"
              />
              <div className="slider-labels">
                {activeLocation === 'tallinn' ? (
                  <>
                    <span>0</span>
                    <span>10</span>
                    <span>20</span>
                    <span>30</span>
                    <span>40</span>
                    <span>50 km</span>
                  </>
                ) : (activeLocation === 'maardu' || activeLocation === 'kehra') ? (
                  <>
                    <span>0</span>
                    <span>10</span>
                    <span>20</span>
                    <span>30 km</span>
                  </>
                ) : (
                  <>
                    <span>0</span>
                    <span>50</span>
                    <span>100</span>
                    <span>150</span>
                    <span>200</span>
                    <span>250</span>
                    <span>300 km</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {activeLocation === 'tallinn' && (
            <div className="form-group">
              <label htmlFor="timeSlot">{t('pricing.timeSlot')}</label>
              <select 
                id="timeSlot"
                value={timeSlot} 
                onChange={(e) => setTimeSlot(e.target.value)}
              >
                <option value="18-19">{t('pricing.timeSlots.peak')}</option>
                <option value="19-21">{t('pricing.timeSlots.reduced')}</option>
                <option value="21-23">{t('pricing.timeSlots.late')}</option>
              </select>
            </div>
          )}
        </div>

        {calculatedPrice && (
          <div className="result">
            <h4>{t('pricing.estimatedPrice')}</h4>
            
            <div className="price-breakdown">
              <div className="breakdown-item">
                <span className="breakdown-label">{t('pricing.diagnosticsFee')}:</span>
                <span className="breakdown-value">{calculatedPrice.diagnosticsFee} €</span>
              </div>
              <div className="breakdown-item">
                <span className="breakdown-label">{t('pricing.pricePerKm')}:</span>
                <span className="breakdown-value">{calculatedPrice.pricePerKm} €</span>
              </div>
              <div className="breakdown-item">
                <span className="breakdown-label">{t('pricing.distance')}:</span>
                <span className="breakdown-value">{calculatedPrice.distance} {t('pricing.km')}</span>
              </div>
              <div className="breakdown-divider"></div>
              <div className="breakdown-item total">
                <span className="breakdown-label">{t('pricing.totalPrice')}:</span>
                <span className="breakdown-value">{calculatedPrice.total} €</span>
              </div>
            </div>

            {timeSlot === '21-23' && activeLocation === 'tallinn' && (
              <p className="late-hours-notice">
                ⚠️ {t('pricing.lateHoursNotice')}
              </p>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="pricing" className="pricing">
      <div className="pricing-container">
        <div className="section-header">
          <h2>{t('pricing.title')}</h2>
          <p>{t('pricing.subtitle')}</p>
        </div>

        {/* Location Tabs */}
        <div className="location-tabs">
          <button 
            className={`location-tab ${activeLocation === 'tallinn' ? 'active' : ''}`}
            onClick={() => {
              setActiveLocation('tallinn');
              setDistance(25);
              setCalculatedPrice(null);
            }}
          >
            {t('pricing.locations.tallinn')}
          </button>
          <button 
            className={`location-tab ${activeLocation === 'maardu' ? 'active' : ''}`}
            onClick={() => {
              setActiveLocation('maardu');
              setDistance(25);
              setCalculatedPrice(null);
            }}
          >
            {t('pricing.locations.maardu')}
          </button>
          <button 
            className={`location-tab ${activeLocation === 'kehra' ? 'active' : ''}`}
            onClick={() => {
              setActiveLocation('kehra');
              setDistance(25);
              setCalculatedPrice(null);
            }}
          >
            {t('pricing.locations.kehra')}
          </button>
          <button 
            className={`location-tab ${activeLocation === 'other' ? 'active' : ''}`}
            onClick={() => {
              setActiveLocation('other');
              setDistance(25);
              setCalculatedPrice(null);
            }}
          >
            {t('pricing.locations.other')}
          </button>
        </div>

        {/* Pricing Type Selector */}
        <div className="pricing-type-info">
          <p>{t('pricing.chooseTypeInfo')}</p>
        </div>

        {/* Diagnostic Type Tabs */}
        <div className="diagnostic-type-tabs">
          <button 
            className={`diagnostic-tab ${diagnosticType === 'basic' ? 'active' : ''}`}
            onClick={() => setDiagnosticType('basic')}
          >
            {t('pricing.basicDiagnostic')}
          </button>
          <button 
            className={`diagnostic-tab ${diagnosticType === 'full' ? 'active' : ''}`}
            onClick={() => setDiagnosticType('full')}
          >
            {t('pricing.fullDiagnostic')}
          </button>
        </div>

        {/* Pricing Type Tabs */}
        <div className="pricing-type-tabs">
          <button 
            className={`type-tab ${activePricingType === 'fixed' ? 'active' : ''}`}
            onClick={() => setActivePricingType('fixed')}
          >
            {t('pricing.fixedPrice')}
          </button>
          <button 
            className={`type-tab ${activePricingType === 'distance' ? 'active' : ''}`}
            onClick={() => setActivePricingType('distance')}
          >
            {t('pricing.distancePrice')}
          </button>
        </div>

        {/* Content based on location and pricing type */}
        {activePricingType === 'fixed' && (
          <div className="fixed-pricing-content">
            {renderFixedPricing()}
          </div>
        )}

        {activePricingType === 'distance' && (
          <div className="distance-pricing-content">
            {renderDistanceCalculator()}
          </div>
        )}

        {/* Garage Services Section (Only for Kehra and Other) */}
        {(activeLocation === 'kehra' || activeLocation === 'other') && (
          <div className="garage-services-section">
            <h3>{t('pricing.garageServices')}</h3>
            <div className="garage-info">
              <p className="garage-note">{t('pricing.garageNote')}</p>
            </div>
            <div className="price-cards">
              <div className="price-card">
                <h4>{t('pricing.garage.software.title')}</h4>
                <div className="price">30 € / {t('pricing.hour')}</div>
                <p>{t('pricing.garage.software.description')}</p>
                <ul className="garage-features">
                  <li>1–15 min → 7.5 €</li>
                  <li>16–30 min → 15 €</li>
                  <li>31–45 min → 22.5 €</li>
                  <li>46–60 min → 30 €</li>
                </ul>
              </div>
              <div className="price-card">
                <h4>{t('pricing.garage.repair.title')}</h4>
                <div className="price">35 € / {t('pricing.hour')}</div>
                <p>{t('pricing.garage.repair.description')}</p>
              </div>
              <div className="price-card">
                <h4>{t('pricing.garage.maintenance.title')}</h4>
                <div className="price">20 € / {t('pricing.hour')}</div>
                <p>{t('pricing.garage.maintenance.description')}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Pricing;
