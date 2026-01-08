import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <img 
            src={theme === 'light' ? '/lightmodelogo.png' : '/darkmodelogo.png'} 
            alt="HealthGarage" 
            className="logo-image"
          />
          <div className="logo-text">
            <h1>{t('header.title')}</h1>
            <p className="logo-subtitle">{t('header.subtitle')}</p>
          </div>
        </div>
        
        <nav className="nav">
          <button onClick={() => scrollToSection('about-us')} className="nav-link">
            {t('header.aboutUs')}
          </button>
          <button onClick={() => scrollToSection('services')} className="nav-link">
            {t('header.services')}
          </button>
          <button onClick={() => scrollToSection('pricing')} className="nav-link">
            {t('header.pricing')}
          </button>
          <button onClick={() => scrollToSection('faq')} className="nav-link">
            {t('header.faq')}
          </button>
          <button onClick={() => scrollToSection('booking')} className="nav-link">
            {t('header.bookNow')}
          </button>
          
          <div className="language-switcher">
            <button
              className={`lang-button ${language === 'ru' ? 'active' : ''}`}
              onClick={() => setLanguage('ru')}
            >
              RU
            </button>
            <button
              className={`lang-button ${language === 'et' ? 'active' : ''}`}
              onClick={() => setLanguage('et')}
            >
              EST
            </button>
          </div>
          
          <button 
            onClick={toggleTheme} 
            className="theme-toggle"
            aria-label="Toggle theme"
          >
            <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
