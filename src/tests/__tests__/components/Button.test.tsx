// packages/tests/src/__tests__/Button.test.tsx
import Button from "@/components/Button";
import { render, screen, fireEvent } from "@testing-library/react";


describe("Button component", () => {
  it("renders with the correct label", () => {
    render(<Button label="Click Me" onClick={() => {}} />);
    const buttonElement = screen.getByTestId("custom-button");
    expect(buttonElement).toHaveTextContent("Click Me");
  });

  it("calls onClick handler when clicked", () => {
    const onClickMock = jest.fn();
    render(<Button label="Click Me" onClick={onClickMock} />);
    const buttonElement = screen.getByTestId("custom-button");
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
