import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TypedText } from "@/components/TypedText";

const text = "Construyo software";

function mockReducedMotion(reduce: boolean) {
  vi.stubGlobal("matchMedia", (q: string) => ({
    matches: reduce && q.includes("reduce"),
    addEventListener: () => {},
    removeEventListener: () => {},
  }));
}

describe("TypedText", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("always exposes the full text to screen readers", () => {
    mockReducedMotion(false);
    render(<TypedText text={text} />);
    expect(screen.getByText(text, { selector: ".sr-only" })).toBeInTheDocument();
  });

  it("shows the full text immediately with reduced motion", () => {
    mockReducedMotion(true);
    const { container } = render(<TypedText text={text} />);
    expect(container.querySelector("[aria-hidden='true']")).toHaveTextContent(text);
  });

  it("types progressively otherwise", () => {
    vi.useFakeTimers();
    mockReducedMotion(false);
    const { container } = render(<TypedText text={text} />);
    const visual = container.querySelector("[aria-hidden='true']")!;
    act(() => {
      vi.advanceTimersByTime(60);
    });
    expect(visual.textContent!.length).toBeLessThan(text.length);
    act(() => {
      vi.advanceTimersByTime(10_000);
    });
    expect(visual).toHaveTextContent(text);
  });
});
