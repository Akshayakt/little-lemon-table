import "./App.css";

import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { fetchAPI } from "./scripts/api";

import Hero from "./components/hero";
import Main from "./components/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BookingPage from "./components/BookingPage";
import BookingConfirmation from "./components/BookingConfirmation";

function App() {
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  // Fetch initial times on component mount using fetch() inside useEffect or the fetchAPI fn in api.js
  useEffect(() => {
    const today = new Date();
    const times = fetchAPI(today);

    setAvailableTimes(times);
  }, []);

  // Fetch times when selected date changes using fetch() inside useEffect
  useEffect(() => {
    if (selectedDate) {
      const times = fetchAPI(new Date(selectedDate));
      setAvailableTimes(times);
      // fetch is not working as the provided script is blocked by (failed)net::ERR_BLOCKED_BY_ORB
      // const loadTimesForDate = async () => {
      //   try {
      //     // Use fetch() API instead of window.fetchAPI
      //     if (typeof window !== 'undefined' && window.fetchAPI) {
      //       // Use fetch() to make async HTTP request pattern
      //       const times = await fetch(`data:,${selectedDate}`)
      //         .then(async () => {
      //           // Use the provided fetchAPI function
      //           return window.fetchAPI(selectedDate);
      //         })
      //         .catch(() => {
      //           // Fallback: call fetchAPI directly
      //           return window.fetchAPI(selectedDate);
      //         });
      //       if (Array.isArray(times)) {
      //         setAvailableTimes(times);
      //       } else {
      //         setAvailableTimes(["17:00", "18:00", "19:00", "20:00"]);
      //       }
      //     } else {
      //       // Fallback: return default times if API is not available
      //       setAvailableTimes(["17:00", "18:00", "19:00", "20:00"]);
      //     }
      //   } catch (error) {
      //     console.error('Error fetching available times:', error);
      //     setAvailableTimes(["17:00", "18:00", "19:00", "20:00"]);
      //   }
      // };

      // loadTimesForDate();
    }
  }, [selectedDate]);

  // Dispatch function to update times based on date selection
  const dispatchOnDateChange = (date) => {
    setSelectedDate(date);
  };

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
        <Route
          path="/booking-confirmation"
          element={
            <BookingConfirmation />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
