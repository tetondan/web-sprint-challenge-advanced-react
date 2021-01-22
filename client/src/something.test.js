import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";

import PlantList from "./components/PlantList";
import { useForm } from "./hooks/useForm";

describe("Test PlantList component", () => {
  test("Fetches the list of plants", async () => {
    render(<PlantList addToCart={jest.fn()} />);

    await waitFor(() => screen.getAllByTestId("plant-card"));

    expect(screen.getAllByTestId("plant-card")).toHaveLength(2);
  });

  test("Calls addToCart function when add button is clicked", async () => {
    const addToCart = jest.fn();
    render(<PlantList addToCart={addToCart} />);

    await waitFor(() => screen.getAllByTestId("plant-card"));

    fireEvent.click(screen.getAllByRole("button", { name: /Add to cart/i })[0]);

    expect(addToCart).toHaveBeenCalled();
  });
});

describe("Test useForm custom hook", () => {
  test("returns initial values", () => {
    const initialValues = {
      firstName: "Donald Duck",
      funny: true,
      employer: "Disney",
    };
    const { result } = renderHook(() => useForm(initialValues));
    const values = result.current.filter(
      (v) =>
        typeof v !== "function" &&
        typeof v === "object" &&
        v.hasOwnProperty("firstName")
    );
    expect(values[0]).toBe(initialValues);
  });
});
