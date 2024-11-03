// src/tests/__tests__/pages/BusinessSignup.test.tsx

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BusinessSignup from "@/app/signup/business/page"; // Adjust path as needed
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

// Mock `signIn` and `useRouter`
jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("BusinessSignup component", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the signup form correctly", () => {
    render(<BusinessSignup />);

    // Check if form elements are in the document
    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
    expect(screen.getByText("Business Signup")).toBeInTheDocument();
  });

  it("updates input values when typing", () => {
    render(<BusinessSignup />);

    // Input fields
    const nameInput = screen.getByPlaceholderText("Name") as HTMLInputElement;
    const emailInput = screen.getByPlaceholderText("Email") as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText("Password") as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: "Test Business" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(nameInput.value).toBe("Test Business");
    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  it("displays an error message when required fields are missing", async () => {
    
    render(<BusinessSignup />);

    const button = screen.getByRole("button", { name: /sign up/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Please fill in all required fields.")).toBeInTheDocument();
    });
  });

  it("does not call API and signIn if required fields are missing", async () => {
    render(<BusinessSignup />);

    const button = screen.getByRole("button", { name: /sign up/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(signIn).not.toHaveBeenCalled();
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  it("attempts to sign in and redirect after successful signup", async () => {
    // Mock API and signIn responses
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    ) as jest.Mock;

    (signIn as jest.Mock).mockResolvedValue({ error: null });

    render(<BusinessSignup />);

    // Fill in form fields
    fireEvent.change(screen.getByPlaceholderText("Name"), { target: { value: "Test Business" } });
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "password123" } });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith("credentials", {
        redirect: false,
        email: "test@example.com",
        password: "password123",
      });
      expect(mockPush).toHaveBeenCalledWith("/dashboard");
    });

    // Restore fetch mock
    global.fetch.mockRestore();
  });

  it("displays server error message on signup failure", async () => {
    // Mock failed API response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "Signup failed" }),
      })
    ) as jest.Mock;

    render(<BusinessSignup />);

    fireEvent.change(screen.getByPlaceholderText("Name"), { target: { value: "Test Business" } });
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "password123" } });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText("Signup failed")).toBeInTheDocument();
    });

    // Restore fetch mock
    global.fetch.mockRestore();
  });

  it("displays an error message if there is a network error", async () => {
    // Mock network error
    global.fetch = jest.fn(() => Promise.reject("Network error")) as jest.Mock;

    render(<BusinessSignup />);

    fireEvent.change(screen.getByPlaceholderText("Name"), { target: { value: "Test Business" } });
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "password123" } });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText("An error occurred during signup. Please try again.")).toBeInTheDocument();
    });

    // Restore fetch mock
    global.fetch.mockRestore();
  });
});
