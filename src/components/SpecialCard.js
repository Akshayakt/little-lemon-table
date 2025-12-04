const SpecialCard = ({ image, title, price, description, basketIcon }) => {
  return (
    <article className="special-card">
      <img src={image} alt={title} className="special-image" />
      <div className="special-card-body">
        <div className="special-card-title-row">
          <h3>{title}</h3>
          <span className="price">{price}</span>
        </div>
        <p className="special-description">{description}</p>
        <button className="link-button">
          Order a delivery
          <img src={basketIcon} alt="" className="inline-icon" />
        </button>
      </div>
    </article>
  );
};

export default SpecialCard;


