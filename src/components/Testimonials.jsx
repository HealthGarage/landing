import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faStar } from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '../context/LanguageContext';
import './Testimonials.css';

const Testimonials = () => {
  const { t } = useLanguage();

  const testimonials = [
    {
      nameKey: 'testimonials.case1.name',
      issueKey: 'testimonials.case1.issue',
      foundKey: 'testimonials.case1.found',
      outcomeKey: 'testimonials.case1.outcome',
      rating: 5
    },
    {
      nameKey: 'testimonials.case2.name',
      issueKey: 'testimonials.case2.issue',
      foundKey: 'testimonials.case2.found',
      outcomeKey: 'testimonials.case2.outcome',
      rating: 5
    },
    {
      nameKey: 'testimonials.case3.name',
      issueKey: 'testimonials.case3.issue',
      foundKey: 'testimonials.case3.found',
      outcomeKey: 'testimonials.case3.outcome',
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="testimonials">
      <div className="testimonials-container">
        <div className="section-header">
          <h2>{t('testimonials.title')}</h2>
          <p className="subtitle">{t('testimonials.subtitle')}</p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="quote-icon">
                <FontAwesomeIcon icon={faQuoteLeft} />
              </div>
              
              <div className="testimonial-header">
                <h4>{t(testimonial.nameKey)}</h4>
                <div className="rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FontAwesomeIcon key={i} icon={faStar} />
                  ))}
                </div>
              </div>

              <div className="case-details">
                <div className="case-section">
                  <strong>{t('testimonials.problem')}:</strong>
                  <p>{t(testimonial.issueKey)}</p>
                </div>
                
                <div className="case-section">
                  <strong>{t('testimonials.found')}:</strong>
                  <p>{t(testimonial.foundKey)}</p>
                </div>
                
                <div className="case-section outcome">
                  <strong>{t('testimonials.outcome')}:</strong>
                  <p>{t(testimonial.outcomeKey)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
