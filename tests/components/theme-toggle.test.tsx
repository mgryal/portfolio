import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { ThemeToggle } from "@/components/ThemeToggle";

const labels = { toLight: "Cambiar a tema claro", toDark: "Cambiar a tema oscuro" };

describe("ThemeToggle", () => {
  beforeEach(() => {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.clear();
  });

  it("starts from the theme applied by the head script", () => {
    render(<ThemeToggle labels={labels} />);
    const button = screen.getByRole("button", { name: labels.toLight });
    expect(button).toHaveAttribute("aria-pressed", "false");
  });

  it("toggles data-theme, label, aria-pressed and persists the choice", () => {
    render(<ThemeToggle labels={labels} />);
    fireEvent.click(screen.getByRole("button", { name: labels.toLight }));
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    expect(localStorage.getItem("theme")).toBe("light");
    const button = screen.getByRole("button", { name: labels.toDark });
    expect(button).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(button);
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("keeps working when localStorage throws", () => {
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = () => {
      throw new Error("blocked");
    };
    try {
      render(<ThemeToggle labels={labels} />);
      fireEvent.click(screen.getByRole("button", { name: labels.toLight }));
      expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    } finally {
      Storage.prototype.setItem = original;
    }
  });
});
