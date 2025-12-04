import heroImage from "../icons_assets/restauranfood.jpg";

const Hero = () => {
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
          <button className="primary-button">Reserve a Table</button>
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


