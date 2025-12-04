import restaurantInterior from "../icons_assets/restaurant.jpg";
import chefImage from "../icons_assets/restaurant chef B.jpg";
import BookingForm from "./BookingForm";

const BookingPage = ({ availableTimes, dispatchOnDateChange }) => {
  return (
    <main className="booking-page">
      <section className="booking-container" id="booking">
        <header className="booking-header">
          <h1>Little Lemon</h1>
          <h2>Chicago</h2>
          <p>Find a table for any occasion</p>
        </header>

        <div className="booking-images">
          <img
            src={restaurantInterior}
            alt="Restaurant interior"
            className="booking-image"
          />
          <img
            src={chefImage}
            alt="Chef preparing food"
            className="booking-image"
          />
        </div>

        <BookingForm
          availableTimes={availableTimes}
          dispatchOnDateChange={dispatchOnDateChange}
        />
      </section>
    </main>
  );
};

export default BookingPage;
