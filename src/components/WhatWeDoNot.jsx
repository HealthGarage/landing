import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '../context/LanguageContext';
import './WhatWeDoNot.css';

const WhatWeDoNot = () => {
  const { t } = useLanguage();

  const limitations = [
    { textKey: 'whatWeDoNot.item1' },
    { textKey: 'whatWeDoNot.item2' },
    { textKey: 'whatWeDoNot.item3' },
    { textKey: 'whatWeDoNot.item4' },
    { textKey: 'whatWeDoNot.item6' }
  ];

  return (
    <section id="what-we-do-not" className="what-we-do-not">
      <div className="what-we-do-not-container">
        <div className="section-header">
          <h2>{t('whatWeDoNot.title')}</h2>
          <p className="subtitle">{t('whatWeDoNot.subtitle')}</p>
        </div>

        <div className="limitations-grid">
          {limitations.map((item, index) => (
            <div key={index} className="limitation-item">
              <div className="limitation-icon">
                <FontAwesomeIcon icon={faBan} />
              </div>
              <p>{t(item.textKey)}</p>
            </div>
          ))}
        </div>

        <div className="alternative-note">
          <p>{t('whatWeDoNot.note')}</p>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoNot;
