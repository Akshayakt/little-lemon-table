import greekSalad from "../icons_assets/greek salad.jpg";
import bruchetta from "../icons_assets/bruchetta.svg";
import lemonDessert from "../icons_assets/lemon dessert.jpg";
import basketIcon from "../icons_assets/Basket.svg";
import SpecialCard from "./SpecialCard";

const specialsData = [
  {
    image: greekSalad,
    title: "Greek salad",
    price: "$12.99",
    description:
      "The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.",
  },
  {
    image: bruchetta,
    title: "Bruchetta",
    price: "$5.99",
    description:
      "Our Bruchetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.",
  },
  {
    image: lemonDessert,
    title: "Lemon Dessert",
    price: "$5.00",
    description:
      "This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
  },
];

const Main = () => {
  return (
    <main className="main">
      <section className="specials" id="menu">
        <div className="specials-header">
          <h2>This weeks specials!</h2>
          <button className="primary-button">Online Menu</button>
        </div>

        <div className="specials-grid">
          {specialsData.map((item) => (
            <SpecialCard
              key={item.title}
              image={item.image}
              title={item.title}
              price={item.price}
              description={item.description}
              basketIcon={basketIcon}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Main;