import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Experience } from "@/components/Experience";
import { getContent } from "@/content";
import { KRONOGRAM_NAME } from "@/content/es";

const content = getContent("es");

describe("Experience", () => {
  it("renders the employer name from the single Kronogram constant", () => {
    render(<Experience items={content.experience} presentLabel={content.ui.present} />);
    expect(screen.getByText(KRONOGRAM_NAME, { exact: false })).toBeInTheDocument();
  });

  it("renders timeline timestamps, with PRESENTE for the current role", () => {
    render(<Experience items={content.experience} presentLabel={content.ui.present} />);
    expect(screen.getByText("[2022.11 → PRESENTE]")).toBeInTheDocument();
    expect(screen.getByText("[2020.12 → 2022.11]")).toBeInTheDocument();
  });

  it("lists every highlight as a log entry", () => {
    render(<Experience items={content.experience} presentLabel={content.ui.present} />);
    const total = content.experience.reduce((n, e) => n + e.highlights.length, 0);
    expect(screen.getAllByRole("listitem").length).toBeGreaterThanOrEqual(total);
  });
});
