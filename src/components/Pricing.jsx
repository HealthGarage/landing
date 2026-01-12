import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faCar } from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '../context/LanguageContext';
import './Pricing.css';

const Pricing = () => {
  const { t } = useLanguage();

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="pricing">
      <div className="pricing-container">
        <div className="section-header">
          <h2>{t('pricing.title')}</h2>
          <p>{t('pricing.subtitle')}</p>
        </div>

        <div className="pricing-summary">
          {/* On-site Services */}
          <div className="pricing-category">
            <h3><FontAwesomeIcon icon={faHouse} /> {t('pricing.onsite.title')}</h3>
            <p className="category-description">{t('pricing.onsite.description')}</p>
            
            <div className="location-pricing">
              <div className="location-block">
                <h4>{t('pricing.onsite.kehra')}</h4>
                <ul>
                  <li>{t('pricing.onsite.kehraRepair')}: <strong>30 € / {t('pricing.hour')}</strong></li>
                  <li>{t('pricing.onsite.kehraMaintenance')}: <strong>40 € / {t('pricing.hour')}</strong></li>
                  <li>{t('pricing.onsite.basicDiag')}: <strong>25 €</strong></li>
                  <li>{t('pricing.onsite.fullDiag')}: <strong>45 €</strong></li>
                  <li>{t('pricing.onsite.coding')}: <strong>60 € / {t('pricing.hour')}</strong></li>
                </ul>
              </div>

              <div className="location-block">
                <h4>{t('pricing.onsite.maardu')}</h4>
                <ul>
                  <li>{t('pricing.onsite.basicDiag')}: <strong>25 €</strong></li>
                  <li>{t('pricing.onsite.fullDiag')}: <strong>45 €</strong></li>
                  <li>{t('pricing.onsite.coding')}: <strong>60 € / {t('pricing.hour')}</strong></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Mobile Services */}
          <div className="pricing-category">
            <h3><FontAwesomeIcon icon={faCar} /> {t('pricing.mobile.title')}</h3>
            <p className="category-description">{t('pricing.mobile.description')}</p>
            
            <div className="mobile-pricing-grid">
              <div className="pricing-item">
                <h4>{t('pricing.mobile.basicDiag')}</h4>
                <div className="price">30 € + 0.5 € / km</div>
              </div>
              <div className="pricing-item">
                <h4>{t('pricing.mobile.fullDiag')}</h4>
                <div className="price">45 € + 0.5 € / km</div>
              </div>
              <div className="pricing-item">
                <h4>{t('pricing.mobile.coding')}</h4>
                <div className="price">60 € / {t('pricing.hour')}</div>
              </div>
            </div>

            <div className="distance-rates">
              <h4>{t('pricing.mobile.distanceRates')}</h4>
              <div className="rates-grid">
                <div className="rate-item">
                  <span className="range">0-50 km</span>
                  <span className="rate">0.5 € / km</span>
                </div>
                <div className="rate-item">
                  <span className="range">50-100 km</span>
                  <span className="rate">0.4 € / km</span>
                </div>
                <div className="rate-item">
                  <span className="range">100+ km</span>
                  <span className="rate">0.35 € / km</span>
                </div>
              </div>
              
              <div className="alternative-pricing">
                <h5>{t('pricing.mobile.alternativeTitle')}</h5>
                <p>{t('pricing.mobile.alternativeDescription')}</p>
                <div className="rates-grid">
                  <div className="rate-item alternative">
                    <span className="range">0-50 km</span>
                    <span className="rate">1.5 € / km</span>
                  </div>
                  <div className="rate-item alternative">
                    <span className="range">50-100 km</span>
                    <span className="rate">1.2 € / km</span>
                  </div>
                  <div className="rate-item alternative">
                    <span className="range">100+ km</span>
                    <span className="rate">0.9 € / km</span>
                  </div>
                </div>
              </div>
            </div>

            <button onClick={scrollToServices} className="calculator-cta">
              🧮 {t('pricing.useCalculator')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
