import { useLanguage } from '../context/LanguageContext';
import './Booking.css';

const Booking = () => {
  const { t } = useLanguage();
  
  return (
    <section id="booking" className="booking">
      <div className="booking-container">
        <div className="booking-content">
          <h2>{t('booking.title')}</h2>
          <p className="booking-description">
            {t('booking.description')}
          </p>
          
          <div className="booking-requirements">
            <div className="requirement">
              <span className="requirement-icon">🚗</span>
              <span>{t('booking.requirements.carModel')}</span>
            </div>
            <div className="requirement">
              <span className="requirement-icon">📅</span>
              <span>{t('booking.requirements.year')}</span>
            </div>
            <div className="requirement">
              <span className="requirement-icon">📝</span>
              <span>{t('booking.requirements.issue')}</span>
            </div>
            <div className="requirement">
              <span className="requirement-icon">📍</span>
              <span>{t('booking.requirements.location')}</span>
            </div>
          </div>

          <div className="booking-process">
            <h3>{t('booking.howItWorks')}</h3>
            <div className="process-steps">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>{t('booking.steps.contact.title')}</h4>
                  <p>{t('booking.steps.contact.description')}</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>{t('booking.steps.confirm.title')}</h4>
                  <p>{t('booking.steps.confirm.description')}</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>{t('booking.steps.advance.title')}</h4>
                  <p>{t('booking.steps.advance.description')}</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h4>{t('booking.steps.service.title')}</h4>
                  <p>{t('booking.steps.service.description')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="policies-section">
            <div className="policy-box">
              <h3>{t('booking.policies.payment.title')}</h3>
              <div className="policy-content">
                <p>{t('booking.policies.payment.item1')}</p>
                <p>{t('booking.policies.payment.item2')}</p>
                <p>{t('booking.policies.payment.item3')}</p>
                <p>{t('booking.policies.payment.item4')}</p>
              </div>
            </div>

            <div className="policy-box refund">
              <h3>{t('booking.policies.refund.title')}</h3>
              <div className="policy-content">
                <p>
                  {t('booking.policies.refund.description')}
                </p>
              </div>
            </div>
          </div>

          <div className="contact-agreement">
            <p className="agreement-text">
              {t('booking.agreement')}
            </p>
          </div>

          <div className="contact-buttons">
            <a 
              href="https://t.me/yourusername" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="contact-button telegram"
            >
              <span className="button-icon">📱</span>
              {t('booking.bookViaTelegram')}
            </a>
            <a 
              href="tel:+372XXXXXXXX" 
              className="contact-button phone"
            >
              <span className="button-icon">📞</span>
              {t('booking.callDirectly')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
