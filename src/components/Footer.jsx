import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileScreen, faLocationDot, faClock } from '@fortawesome/free-solid-svg-icons';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section footer-middle">
            <h4>HealthGarage - Keeping your car safe</h4>
            <p>(C) 2026</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
