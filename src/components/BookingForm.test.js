import { render, screen, fireEvent } from "@testing-library/react";
import BookingForm from "./BookingForm";

const mockTimes = ["17:00", "18:00", "19:00"];

const renderForm = (overrideProps = {}) => {
  const dispatchOnDateChange = jest.fn();

  render(
    <BookingForm
      availableTimes={mockTimes}
      dispatchOnDateChange={dispatchOnDateChange}
      {...overrideProps}
    />
  );

  return { dispatchOnDateChange };
};

test("renders booking form fields and time options", () => {
  renderForm();

  expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/number of diners/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
  expect(screen.getByText(/seating options/i)).toBeInTheDocument();

  const timeSelect = screen.getByLabelText(/time/i);
  mockTimes.forEach((time) => {
    expect(
      screen.getByRole("option", { name: time })
    ).toBeInTheDocument();
  });
  expect(timeSelect.value).toBe("");
});

test("dispatches date change when date field changes", () => {
  const { dispatchOnDateChange } = renderForm();
  const dateInput = screen.getByLabelText(/date/i);

  fireEvent.change(dateInput, { target: { value: "2025-12-25" } });

  expect(dispatchOnDateChange).toHaveBeenCalledWith("2025-12-25");
});

test("shows validation errors when required fields are empty on submit", () => {
  renderForm();

  const submitButton = screen.getByRole("button", { name: /lets go/i });
  fireEvent.click(submitButton);

  // Inputs should acquire error classes
  const dateInput = screen.getByLabelText(/date/i);
  const timeSelect = screen.getByLabelText(/time/i);
  const dinersSelect = screen.getByLabelText(/number of diners/i);
  const occasionSelect = screen.getByLabelText(/occasion/i);

  expect(dateInput.className).toMatch(/booking-input-error/);
  expect(timeSelect.className).toMatch(/booking-input-error/);
  expect(dinersSelect.className).toMatch(/booking-input-error/);
  expect(occasionSelect.className).toMatch(/booking-input-error/);
});


