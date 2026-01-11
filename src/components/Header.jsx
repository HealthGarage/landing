import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // Prevent body scroll when menu open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  return (
    <>
      {/* Overlay */}
      <div 
        className={`menu-overlay ${isMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      <header className="header">
        <div className="header-container">
          {/* Logo */}
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

          {/* Navigation */}
          <nav className="nav">
            {/* Desktop Navigation */}
            <div className="nav-links">
              <button onClick={() => scrollToSection('about-us')} className="nav-link">
                {t('header.aboutUs')}
              </button>
              <button onClick={() => scrollToSection('services')} className="nav-link">
                {t('header.services')}
              </button>
              <button onClick={() => scrollToSection('faq')} className="nav-link">
                {t('header.faq')}
              </button>
              <button onClick={() => scrollToSection('booking')} className="nav-link cta-link">
                {t('header.bookNow')}
              </button>
            </div>

            {/* Desktop Controls */}
            <div className="nav-controls">
              <div className="language-switcher">
                <button
                  className={`lang-button ${language === 'ru' ? 'active' : ''}`}
                  onClick={() => setLanguage('ru')}
                  title="Русский"
                >
                  RU
                </button>
                <button
                  className={`lang-button ${language === 'et' ? 'active' : ''}`}
                  onClick={() => setLanguage('et')}
                  title="Eesti"
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
            </div>

            {/* Hamburger Button */}
            <button
              className="hamburger"
              aria-label="Toggle menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-drawer ${isMenuOpen ? 'open' : ''}`}>
        <button onClick={() => scrollToSection('about-us')} className="drawer-link">
          {t('header.aboutUs')}
        </button>
        <button onClick={() => scrollToSection('services')} className="drawer-link">
          {t('header.services')}
        </button>
        <button onClick={() => scrollToSection('faq')} className="drawer-link">
          {t('header.faq')}
        </button>
        <button onClick={() => scrollToSection('booking')} className="drawer-link cta-link">
          {t('header.bookNow')}
        </button>

        <div className="drawer-divider" />

        {/* Mobile Controls */}
        <div className="drawer-controls">
          <div className="language-switcher">
            <button
              className={`lang-button ${language === 'ru' ? 'active' : ''}`}
              onClick={() => setLanguage('ru')}
              title="Русский"
            >
              RU
            </button>
            <button
              className={`lang-button ${language === 'et' ? 'active' : ''}`}
              onClick={() => setLanguage('et')}
              title="Eesti"
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
        </div>
      </div>
    </>
  );
};

export default Header;
