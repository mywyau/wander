// src/tests/__tests__/pages/SearchPage.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import SearchPage from "@/app/search/page"; // Adjust the path as necessary
import { useRouter } from "next/navigation";

// Mock `useRouter` from Next.js
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("SearchPage component", () => {
  let routerPushMock: jest.Mock;

  beforeEach(() => {
    // Set up a mock for `router.push`
    routerPushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: routerPushMock });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the title, search input, and search button", () => {
    render(<SearchPage />);

    const title = screen.getByText("Search Desks by Location");
    const input = screen.getByPlaceholderText("Enter location");
    const button = screen.getByRole("button", { name: /search/i });

    expect(title).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("updates the search query when typing", () => {
    render(<SearchPage />);

    const input = screen.getByPlaceholderText("Enter location") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "New York" } });

    expect(input.value).toBe("New York");
  });

  it("redirects to the results page with the search query as a URL parameter on form submission", () => {
    render(<SearchPage />);

    const input = screen.getByPlaceholderText("Enter location");
    const button = screen.getByRole("button", { name: /search/i });

    fireEvent.change(input, { target: { value: "San Francisco" } });
    fireEvent.click(button);

    expect(routerPushMock).toHaveBeenCalledWith("/results?location=San%20Francisco");
  });

  it("does not redirect if the search query is empty on form submission", () => {
    render(<SearchPage />);

    const button = screen.getByRole("button", { name: /search/i });
    fireEvent.click(button);

    expect(routerPushMock).not.toHaveBeenCalled();
  });

  it("trims whitespace from the search query before redirecting", () => {
    render(<SearchPage />);

    const input = screen.getByPlaceholderText("Enter location");
    const button = screen.getByRole("button", { name: /search/i });

    fireEvent.change(input, { target: { value: "   Tokyo   " } });
    fireEvent.click(button);

    expect(routerPushMock).toHaveBeenCalledWith("/results?location=Tokyo");
  });
});
