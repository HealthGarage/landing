import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCar, faClock } from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import './Hero.css';

const Hero = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  
  const scrollToBooking = () => {
    const element = document.getElementById('booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            {t('hero.title')} <span className="accent">{t('hero.titleAccent')}</span>
          </h1>
          <p className="hero-subtitle">
            {t('hero.subtitle')}
          </p>
          
          <button onClick={scrollToBooking} className="cta-button">
            {t('hero.ctaButton')}
          </button>
        </div>
        
        <div className="hero-image">
          <div className="car-illustration">
            <img 
              src={theme === 'light' ? '/lightmodelogo.png' : '/darkmodelogo.png'} 
              alt="HealthGarage Logo" 
              className="hero-logo"
            />
            <div className="diagnostic-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
