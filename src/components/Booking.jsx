import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faCalendarDays, faClipboard, faLocationDot, faMobileScreen, faPhone, faComments, faCircleCheck, faMoneyBill, faWrench, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '../context/LanguageContext';
import './Booking.css';

// Phone number is assembled at render time (not a plain string literal)
// so naive scrapers grepping the source/bundle for tel: links or digit
// sequences won't pick it up, while real visitors still get a working link.
const PHONE_PARTS = ['+372', '5800', '7331'];
const getPhoneHref = () => 'tel:' + PHONE_PARTS.join('');

const Booking = () => {
  const { t } = useLanguage();
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);

  // Close policy modal on Escape key
  useEffect(() => {
    if (!isPolicyOpen) return;
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsPolicyOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isPolicyOpen]);

  const renderPolicySection = (sectionKey) => (
    <div className="policy-modal-section">
      <h4>{t(`booking.policyModal.${sectionKey}.title`)}</h4>
      <ul>
        {t(`booking.policyModal.${sectionKey}.items`).map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );

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

          <div className="contact-agreement">
            <p className="agreement-text">
              {t('booking.agreementPrefix')}{' '}
              <button
                type="button"
                className="policy-link"
                onClick={() => setIsPolicyOpen(true)}
              >
                {t('booking.agreementLink')}
              </button>
              .
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
              href={getPhoneHref()}
              className="contact-button phone"
            >
              <span className="button-icon"><FontAwesomeIcon icon={faPhone} /></span>
              {t('booking.callDirectly')}
            </a>
          </div>
        </div>
      </div>

      {isPolicyOpen && (
        <div
          className="modal-backdrop"
          onClick={() => setIsPolicyOpen(false)}
          role="presentation"
        >
          <div
            className="policy-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="policy-modal-title"
          >
            <div className="policy-modal-header">
              <h3 id="policy-modal-title">{t('booking.policyModal.title')}</h3>
              <button
                type="button"
                className="modal-close"
                onClick={() => setIsPolicyOpen(false)}
                aria-label={t('booking.policyModal.close')}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
            <div className="policy-modal-body">
              {renderPolicySection('company')}
              {renderPolicySection('payment')}
              {renderPolicySection('refund')}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Booking;
