import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SkipLink } from "@/components/SkipLink";
import Page from "@/app/page";

describe("SkipLink", () => {
  it("exists and targets the main landmark", () => {
    const { container } = render(
      <>
        <SkipLink label="Saltar al contenido" />
        <Page />
      </>,
    );
    const link = screen.getByRole("link", { name: "Saltar al contenido" });
    expect(link).toHaveAttribute("href", "#main");
    const main = container.querySelector("main");
    expect(main).toHaveAttribute("id", "main");
  });
});
