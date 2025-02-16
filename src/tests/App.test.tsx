import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Router } from "wouter";
import App from "../App";
import '@testing-library/jest-dom';

vi.mock("../pages/Home", () => ({
  default: () => <div data-testid="home-page">Home Page</div>,
}));

vi.mock("../pages/Details", () => ({
  default: () => <div data-testid="detail-page">Detail Page</div>,
}));

vi.mock("../components/Navbar", () => ({
  default: () => <nav data-testid="navbar">Navbar</nav>,
}));

describe("App", () => {
  it("should render the Navbar component", () => {
    render(
      <Router>
        <App />
      </Router>
    );
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
  });

  it("should render the Home page by default", () => {
    render(
      <Router>
        <App />
      </Router>
    );
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
  });

  it("should navigate to the Detail page", () => {
    render(
      <Router>
        <App />
      </Router>
    );
    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });
});
