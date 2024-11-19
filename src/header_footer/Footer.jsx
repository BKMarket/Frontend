import logo1 from "../assets/logo1.png";
import { footerLinks, socialMedia } from "./constant.js";
import './header-footer.css'

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-logo-section">
          <a href="/">
            <img src={logo1} width={150} height={46} className="logo-img" />
          </a>
          <p className="footer-description">
            Tìm kiếm và mua sắm thật dễ dàng với chúng tôi. Hãy tham gia cùng
            BKmarket
          </p>
          <div className="social-icons">
            {socialMedia.map((item) => (
              <div key={item.alt} className="social-icon">
                <a href={item.link}>
                  <img src={item.src} alt={item.alt} width={24} height={24} />
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-links-section">
          {footerLinks.map((item) => (
            <div key={item.title}>
              <h4 className="footer-title">{item.title}</h4>
              <ul>
                {item.links.map((link) => (
                  <li key={link.name} className="footer-link">
                    <a href={link.link}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-left">
          <p>© 2024-HCMUT Copyright. All rights reserved.</p>
        </div>
        <p className="footer-terms">Terms & Conditions</p>
      </div>
    </footer>
  );
};

export default Footer;
