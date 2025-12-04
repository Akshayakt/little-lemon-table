import { useNavigate } from "react-router-dom";
import heroImage from "../icons_assets/restauranfood.jpg";

const Hero = () => {
  const navigate = useNavigate();

  const handleReserveClick = () => {
    navigate("/booking");
  };

  return (
    <section className="hero" id="home">
      <div className="hero-inner">
        <div className="hero-content">
          <h1>Little Lemon</h1>
          <h2>Chicago</h2>
          <p>
            We are a family owned Mediterranean restaurant, focused on traditional
            recipes served with a modern twist.
          </p>
          <button className="primary-button" onClick={handleReserveClick}>
            Reserve a Table
          </button>
        </div>
        <div className="hero-image-wrapper">
          <img
            src={heroImage}
            alt="Chef holding a tray of appetizers"
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
