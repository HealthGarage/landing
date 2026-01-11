import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileScreen, faLocationDot, faClock } from '@fortawesome/free-solid-svg-icons';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>HealthGarage</h3>
            <p>Mobile Diagnostics & Independent Garage</p>
          </div>
          
          <div className="footer-section">
            <h4>Contact</h4>
            <p><FontAwesomeIcon icon={faMobileScreen} /> <a href="https://t.me/healthgarageofficial" target="_blank" rel="noopener noreferrer" style={{color: 'inherit'}}>Telegram</a></p>
            <p><FontAwesomeIcon icon={faLocationDot} /> Garage: Kehra, Estonia</p>
            <p><FontAwesomeIcon icon={faClock} /> Evening service: 18:00 – 23:00</p>
          </div>
          
          <div className="footer-section">
            <h4>Service Area</h4>
            <p>Tallinn and nearby areas</p>
            <p>Maardu</p>
            <p>Up to 100km+ by agreement</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} HealthGarage — Diagnostics-First Approach</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
