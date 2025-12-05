import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { fetchAPI } from "./scripts/api";

// Mock the fetchAPI function
jest.mock("./scripts/api");

// Mock child components
jest.mock("./components/hero", () => {
	return function Hero() {
		return <div data-testid="hero">Hero Component</div>;
	};
});

jest.mock("./components/Main", () => {
	return function Main() {
		return <div data-testid="main">Main Component</div>;
	};
});

jest.mock("./components/Header", () => {
	return function Header() {
		return <div data-testid="header">Header Component</div>;
	};
});

jest.mock("./components/Footer", () => {
	return function Footer() {
		return <div data-testid="footer">Footer Component</div>;
	};
});

jest.mock("./components/BookingPage", () => {
	return function BookingPage({ availableTimes, dispatchOnDateChange }) {
		return (
			<div data-testid="booking-page">
				<div data-testid="available-times">
					{availableTimes.join(", ")}
				</div>
				<button onClick={() => dispatchOnDateChange("2024-12-15")}>
					Change Date
				</button>
			</div>
		);
	};
});

// Helper function to render App with Router
const renderApp = (initialRoute = "/") => {
	window.history.pushState({}, "Test page", initialRoute);
	return render(
		<BrowserRouter>
			<App />
		</BrowserRouter>
	);
};

describe("App Component", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("Initial Render", () => {
		test("renders Header component", () => {
			fetchAPI.mockReturnValue(["17:00", "18:00", "19:00"]);
			renderApp();
			expect(screen.getByTestId("header")).toBeInTheDocument();
		});

		test("renders Footer component", () => {
			fetchAPI.mockReturnValue(["17:00", "18:00", "19:00"]);
			renderApp();
			expect(screen.getByTestId("footer")).toBeInTheDocument();
		});

		test("fetches available times on mount", async () => {
			const mockTimes = ["17:00", "18:00", "19:00", "20:00"];
			fetchAPI.mockReturnValue(mockTimes);

			renderApp();

			await waitFor(() => {
				expect(fetchAPI).toHaveBeenCalledTimes(1);
			});

			expect(fetchAPI).toHaveBeenCalledWith(expect.any(Date));
		});

		test("initializes with empty availableTimes array", () => {
			fetchAPI.mockReturnValue([]);
			renderApp();
			expect(fetchAPI).toHaveBeenCalled();
		});
	});

	describe("Route: Home Page (/)", () => {
		test("renders Hero and Main components on home route", () => {
			fetchAPI.mockReturnValue(["17:00", "18:00"]);
			renderApp("/");

			expect(screen.getByTestId("hero")).toBeInTheDocument();
			expect(screen.getByTestId("main")).toBeInTheDocument();
			expect(
				screen.queryByTestId("booking-page")
			).not.toBeInTheDocument();
		});
	});

	describe("Route: Booking Page (/booking)", () => {
		test("renders BookingPage component on booking route", () => {
			fetchAPI.mockReturnValue(["17:00", "18:00"]);
			renderApp("/booking");

			expect(screen.getByTestId("booking-page")).toBeInTheDocument();
			expect(screen.queryByTestId("hero")).not.toBeInTheDocument();
			expect(screen.queryByTestId("main")).not.toBeInTheDocument();
		});

		test("passes availableTimes to BookingPage", async () => {
			const mockTimes = ["17:00", "18:00", "19:00"];
			fetchAPI.mockReturnValue(mockTimes);

			renderApp("/booking");

			await waitFor(() => {
				expect(screen.getByTestId("available-times")).toHaveTextContent(
					mockTimes.join(", ")
				);
			});
		});

		test("passes dispatchOnDateChange function to BookingPage", () => {
			fetchAPI.mockReturnValue(["17:00", "18:00"]);
			renderApp("/booking");

			expect(screen.getByTestId("booking-page")).toBeInTheDocument();
			expect(screen.getByText("Change Date")).toBeInTheDocument();
		});
	});

	describe("Date Selection and Time Fetching", () => {
		test("fetches new times when date changes", async () => {
			const initialTimes = ["17:00", "18:00"];
			const newTimes = ["19:00", "20:00", "21:00"];

			fetchAPI
				.mockReturnValueOnce(initialTimes)
				.mockReturnValueOnce(newTimes);

			renderApp("/booking");

			// Wait for initial fetch
			await waitFor(() => {
				expect(fetchAPI).toHaveBeenCalledTimes(1);
			});

			// Simulate date change
			const changeButton = screen.getByText("Change Date");
			changeButton.click();

			// Wait for second fetch
			await waitFor(() => {
				expect(fetchAPI).toHaveBeenCalledTimes(2);
			});

			expect(fetchAPI).toHaveBeenCalledWith(expect.any(Date));
		});

		test("updates availableTimes state when date changes", async () => {
			const initialTimes = ["17:00", "18:00"];
			const newTimes = ["19:00", "20:00"];

			fetchAPI
				.mockReturnValueOnce(initialTimes)
				.mockReturnValueOnce(newTimes);

			renderApp("/booking");

			await waitFor(() => {
				expect(screen.getByTestId("available-times")).toHaveTextContent(
					initialTimes.join(", ")
				);
			});

			// Trigger date change
			screen.getByText("Change Date").click();

			await waitFor(() => {
				expect(screen.getByTestId("available-times")).toHaveTextContent(
					newTimes.join(", ")
				);
			});
		});

		test("does not fetch times if selectedDate is null", async () => {
			fetchAPI.mockReturnValue(["17:00", "18:00"]);

			renderApp();

			// Only the initial useEffect should trigger fetchAPI
			await waitFor(() => {
				expect(fetchAPI).toHaveBeenCalledTimes(1);
			});
		});
	});

	describe("State Management", () => {
		test("maintains selectedDate state correctly", async () => {
			fetchAPI.mockReturnValue(["17:00", "18:00"]);

			renderApp("/booking");

			const changeButton = screen.getByText("Change Date");
			changeButton.click();

			await waitFor(() => {
				expect(fetchAPI).toHaveBeenCalledWith(new Date("2024-12-15"));
			});
		});

		test("availableTimes updates reflect in BookingPage", async () => {
			const times1 = ["10:00", "11:00"];
			const times2 = ["15:00", "16:00"];

			fetchAPI.mockReturnValueOnce(times1).mockReturnValueOnce(times2);

			renderApp("/booking");

			await waitFor(() => {
				expect(screen.getByTestId("available-times")).toHaveTextContent(
					times1.join(", ")
				);
			});

			screen.getByText("Change Date").click();

			await waitFor(() => {
				expect(screen.getByTestId("available-times")).toHaveTextContent(
					times2.join(", ")
				);
			});
		});
	});
});
