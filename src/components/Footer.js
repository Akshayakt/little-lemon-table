import logo from "../icons_assets/Logo.svg";

const Footer = () => {
  return (
    <footer className="footer" id="about">
      <div className="footer-inner">
        <div className="footer-brand">
          <img src={logo} alt="Little Lemon logo" />
          <p>Little Lemon is a family owned Mediterranean restaurant in Chicago.</p>
        </div>
        <div className="footer-column">
          <h4>Navigation</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#menu">Menu</a></li>
            <li><a href="#reservations">Reservations</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Contact</h4>
          <ul>
            <li>123 Lemon Street</li>
            <li>Chicago, IL</li>
            <li>(312) 555-0123</li>
          </ul>
        </div>
      </div>
      <p className="footer-copy">&copy; {new Date().getFullYear()} Little Lemon</p>
    </footer>
  );
};

export default Footer;