import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { submitAPI } from "../scripts/api.js";

const initialValues = {
  date: "",
  time: "",
  diners: "",
  occasion: "",
  seating: "",
};

const BookingForm = ({ availableTimes, dispatchOnDateChange }) => {
  const navigate = useNavigate();

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (currentValues) => {
    const newErrors = {};

    if (!currentValues.date) newErrors.date = "Please choose a date";
    if (!currentValues.time) newErrors.time = "Please choose a time";
    if (!currentValues.diners) newErrors.diners = "Please select number of diners";
    if (!currentValues.occasion) newErrors.occasion = "Please select an occasion";
    if (!currentValues.seating) newErrors.seating = "Please choose a seating option";

    return newErrors;
  };

  useEffect(() => {
    if (submitted) {
      setErrors(validate(values));
    }
  }, [values, submitted]);

  const handleChange = (event) => {
    const { id, name, value } = event.target;
    const key =
      id === "booking-date"
        ? "date"
        : id === "booking-time"
        ? "time"
        : id === "booking-diners"
        ? "diners"
        : id === "booking-occasion"
        ? "occasion"
        : name === "seating"
        ? "seating"
        : null;

    if (!key) return;

    if (key === "date" && typeof dispatchOnDateChange === "function") {
      dispatchOnDateChange(value);
    }

    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);

    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Use submitAPI to submit the booking form data if not the local submit function
      if (typeof window !== 'undefined' && window.submitAPI) {
        const success = window.submitAPI(values);
        if (success) {
          console.log("Booking submitted successfully:", values);
          setValues(initialValues);
          setSubmitted(false);
        } else {
          console.error("Failed to submit booking");
        }
      } else {
        // Fallback if API is not available
        if (submitAPI(values)) {
          console.log("Booking details", values);
          setValues(initialValues);
          setSubmitted(false);
          navigate("/booking-confirmation");
        }
      }
    }
  };

  const inputClass = (field) =>
    `booking-input${errors[field] ? " booking-input-error" : ""}`;

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="booking-date">Date</label>
          <input
            id="booking-date"
            type="date"
            aria-required="true"
            className={inputClass("date")}
            value={values.date}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="booking-time">Time</label>
          <select
            id="booking-time"
            aria-required="true"
            className={inputClass("time")}
            value={values.time}
            onChange={handleChange}
          >
            <option value="">Select time</option>
            {availableTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="booking-diners">Number of Diners</label>
        <select
          id="booking-diners"
          aria-required="true"
          className={inputClass("diners")}
          value={values.diners}
          onChange={handleChange}
        >
          <option value="">Select number of diners</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="booking-occasion">Occasion</label>
        <select
          id="booking-occasion"
          aria-required="true"
          className={inputClass("occasion")}
          value={values.occasion}
          onChange={handleChange}
        >
          <option value="">Select occasion</option>
          <option value="birthday">Birthday</option>
          <option value="anniversary">Anniversary</option>
          <option value="engagement">Engagement</option>
          <option value="business">Business meeting</option>
        </select>
      </div>

      <fieldset
        className={`seating-options${
          errors.seating ? " seating-options-error" : ""
        }`}
        aria-required="true"
      >
        <legend>Seating options</legend>
        <div className="seating-row">
          <label className="seating-option">
            <span>Standard</span>
            <input
              type="radio"
              name="seating"
              value="standard"
              checked={values.seating === "standard"}
              onChange={handleChange}
            />
            <span className="seating-indicator" />
          </label>
          <label className="seating-option">
            <span>Outside</span>
            <input
              type="radio"
              name="seating"
              value="outside"
              checked={values.seating === "outside"}
              onChange={handleChange}
            />
            <span className="seating-indicator" />
          </label>
        </div>
      </fieldset>

      <button type="submit" className="primary-button booking-submit" disabled={submitted}>
        Lets go
      </button>
    </form>
  );
};

export default BookingForm;
