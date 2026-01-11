import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faCalendarDays, faClipboard, faLocationDot, faMobileScreen, faPhone, faComments, faCircleCheck, faMoneyBill, faWrench } from '@fortawesome/free-solid-svg-icons';
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
              <span className="requirement-icon"><FontAwesomeIcon icon={faCar} /></span>
              <span>{t('booking.requirements.carModel')}</span>
            </div>
            <div className="requirement">
              <span className="requirement-icon"><FontAwesomeIcon icon={faCalendarDays} /></span>
              <span>{t('booking.requirements.year')}</span>
            </div>
            <div className="requirement">
              <span className="requirement-icon"><FontAwesomeIcon icon={faClipboard} /></span>
              <span>{t('booking.requirements.issue')}</span>
            </div>
            <div className="requirement">
              <span className="requirement-icon"><FontAwesomeIcon icon={faLocationDot} /></span>
              <span>{t('booking.requirements.location')}</span>
            </div>
          </div>

          <div className="booking-process">
            <h3>{t('booking.howItWorks')}</h3>
            <div className="process-timeline">
              <div className="timeline-step">
                <div className="step-icon">
                  <FontAwesomeIcon icon={faComments} />
                </div>
                <div className="step-line"></div>
                <div className="step-content">
                  <h4>{t('booking.steps.contact.title')}</h4>
                  <p>{t('booking.steps.contact.description')}</p>
                </div>
              </div>
              <div className="timeline-step">
                <div className="step-icon">
                  <FontAwesomeIcon icon={faCircleCheck} />
                </div>
                <div className="step-line"></div>
                <div className="step-content">
                  <h4>{t('booking.steps.confirm.title')}</h4>
                  <p>{t('booking.steps.confirm.description')}</p>
                </div>
              </div>
              <div className="timeline-step">
                <div className="step-icon">
                  <FontAwesomeIcon icon={faMoneyBill} />
                </div>
                <div className="step-line"></div>
                <div className="step-content">
                  <h4>{t('booking.steps.advance.title')}</h4>
                  <p>{t('booking.steps.advance.description')}</p>
                </div>
              </div>
              <div className="timeline-step">
                <div className="step-icon">
                  <FontAwesomeIcon icon={faWrench} />
                </div>
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
              href="https://t.me/healthgarageofficial" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="contact-button telegram"
            >
              <span className="button-icon"><FontAwesomeIcon icon={faMobileScreen} /></span>
              {t('booking.bookViaTelegram')}
            </a>
            <a 
              href="tel:+37256865405" 
              className="contact-button phone"
            >
              <span className="button-icon"><FontAwesomeIcon icon={faPhone} /></span>
              {t('booking.callDirectly')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
