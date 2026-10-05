import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Contact } from "@/components/Contact";
import { getContent } from "@/content";

const content = getContent("es");

describe("Contact", () => {
  it("renders mailto, LinkedIn and GitHub hrefs exactly", () => {
    render(<Contact contact={content.contact} opensInNewTab={content.ui.opensInNewTab} />);
    expect(screen.getByRole("link", { name: /Correo/ })).toHaveAttribute("href", "mailto:mgryal.d@gmail.com");
    expect(screen.getByRole("link", { name: /LinkedIn/ })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/maximiliano-gonzalez-67108418b",
    );
    expect(screen.getByRole("link", { name: /GitHub/ })).toHaveAttribute("href", "https://github.com/mgryal");
  });

  it("opens external links safely and announces it", () => {
    render(<Contact contact={content.contact} opensInNewTab={content.ui.opensInNewTab} />);
    const linkedin = screen.getByRole("link", { name: /LinkedIn/ });
    expect(linkedin).toHaveAttribute("target", "_blank");
    expect(linkedin).toHaveAttribute("rel", "noopener noreferrer");
    expect(linkedin).toHaveTextContent(content.ui.opensInNewTab);
    expect(screen.getByRole("link", { name: /Correo/ })).not.toHaveAttribute("target");
  });

  it("never renders a phone link", () => {
    const { container } = render(
      <Contact contact={content.contact} opensInNewTab={content.ui.opensInNewTab} />,
    );
    expect(container.innerHTML).not.toMatch(/tel:|\+56/);
  });
});
