import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SystemBar } from "@/components/SystemBar";
import { getContent } from "@/content";

const content = getContent("es");

describe("SystemBar", () => {
  const setup = () => render(<SystemBar content={content} />);

  it("renders the nav as commands inside a labelled navigation landmark", () => {
    setup();
    expect(screen.getByRole("navigation", { name: content.nav.label })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "~/experiencia" })).toHaveAttribute("href", "#experience");
  });

  it("collapsible menu: aria-expanded toggles and Escape closes it", () => {
    setup();
    const button = screen.getByRole("button", { name: content.ui.menu.open });
    expect(button).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(button);
    const open = screen.getByRole("button", { name: content.ui.menu.close });
    expect(open).toHaveAttribute("aria-expanded", "true");
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.getByRole("button", { name: content.ui.menu.open })).toHaveAttribute("aria-expanded", "false");
  });

  it("closes the menu after choosing a link", () => {
    setup();
    fireEvent.click(screen.getByRole("button", { name: content.ui.menu.open }));
    fireEvent.click(screen.getByRole("link", { name: "~/contacto" }));
    expect(screen.getByRole("button", { name: content.ui.menu.open })).toHaveAttribute("aria-expanded", "false");
  });
});
