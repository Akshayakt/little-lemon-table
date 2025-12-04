import "./App.css";

import { useReducer } from "react";
import { Routes, Route } from "react-router-dom";
import Hero from "./components/hero";
import Main from "./components/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BookingPage from "./components/BookingPage";

export const initializeTimes = () => ["17:00", "18:00", "19:00", "20:00"];

export const updateTimes = (state, selectedDate) => {
  // In future this could use selectedDate to fetch/compute new times.
  // For now, always return the same times.
  return initializeTimes(selectedDate);
};

function App() {
  const [availableTimes, dispatchOnDateChange] = useReducer(
    updateTimes,
    [],
    initializeTimes
  );

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Main />
            </>
          }
        />
        <Route
          path="/booking"
          element={
            <BookingPage
              availableTimes={availableTimes}
              dispatchOnDateChange={dispatchOnDateChange}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
