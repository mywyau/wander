import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import WandererSignup from "../../../../../app/wanderer/signup/page";
import SignUpConnector from "@/app/wanderer/signup/connector/SignUpConnector";
import SignUpHelper from "../../../../../app/wanderer/signup/SignUpHelper";

// Mock the useRouter hook
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock the SignUpConnector
jest.mock("@/app/wanderer/signup/SignUpConnector", () => ({
  register: jest.fn(),
}));

describe("WandererSignup Component", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    // Mock the router's push method
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    jest.clearAllMocks();
  });

  it("renders the form correctly", () => {
    render(<WandererSignup />);

    // Check form fields and buttons
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Sign Up/i })).toBeInTheDocument();
  });

  it("calls the SignUpConnector with correct payload on form submit", async () => {
    const payload = {
      userId: "test_user_12345",
      username: "testuser",
      password: "password123",
      email: "test@example.com",
      role: "Wanderer",
      createdAt: "2023-01-01T00:00:00",
      updatedAt: "2023-01-01T00:00:00",
    };

    jest.spyOn(SignUpHelper, "generateUserId").mockReturnValue(payload.userId);
    jest.spyOn(SignUpHelper, "generateTimestamp").mockReturnValue("2023-01-01T00:00:00");

    (SignUpConnector.register as jest.Mock).mockResolvedValue({ success: true });

    render(<WandererSignup />);

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: payload.username } });
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: payload.email } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: payload.password } });

    fireEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

    // Wait for the mock to be called
    await screen.findByRole("button", { name: /Sign Up/i });

    // Check if SignUpConnector was called with the correct payload
    expect(SignUpConnector.register).toHaveBeenCalledWith(payload);
    expect(SignUpConnector.register).toHaveBeenCalledTimes(1);
  });

  it("navigates to the home page on successful signup", async () => {
    (SignUpConnector.register as jest.Mock).mockResolvedValue({ success: true });

    render(<WandererSignup />);

    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "testuser" } });
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "password123" } });

    fireEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

    // Wait for navigation to occur
    await screen.findByRole("button", { name: /Sign Up/i });

    // Verify navigation
    expect(mockPush).toHaveBeenCalledWith("/wanderer/home");
  });

});
