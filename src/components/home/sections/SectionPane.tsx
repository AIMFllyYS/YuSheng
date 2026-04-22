"use client";

import { useEffect, useState } from "react";
import type { SectionPaneProps } from "./types";

/**
 * SectionPane — lazy-mounts children on first activation.
 * Sections that are never visited never initialize their JS.
 */
export function SectionPane({ id, activePage, children, className = "" }: SectionPaneProps) {
  // Home section is active on first render — mount immediately; others defer.
  const [hasBeenActive, setHasBeenActive] = useState(() => activePage === id);

  useEffect(() => {
    if (activePage === id && !hasBeenActive) {
      setHasBeenActive(true);
    }
  }, [activePage, id, hasBeenActive]);

  return (
    <section
      id={id}
      className={`page-section ${activePage === id ? "active" : ""} ${className}`}
    >
      {hasBeenActive ? children : null}
    </section>
  );
}
