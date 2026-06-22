import type { SectionPaneProps } from "./types";

export function SectionPane({ id, activePage, children, className = "" }: SectionPaneProps) {
  return (
    <section id={id} className={`page-section ${activePage === id ? "active" : ""} ${className}`}>
      {children}
    </section>
  );
}
