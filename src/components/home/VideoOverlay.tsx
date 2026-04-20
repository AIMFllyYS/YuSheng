"use client";

import { SITE_CONFIG } from "@/data/config";

type Props = {
  open: boolean;
  onCloseClick: () => void;
  onOverlayMouseEnter: () => void;
  onOverlayMouseLeave: () => void;
};

export function VideoOverlay({ open, onCloseClick, onOverlayMouseEnter, onOverlayMouseLeave }: Props) {
  return (
    <div
      id="video-overlay"
      className={open ? "show" : ""}
      style={{ display: open ? "flex" : "none" }}
      onMouseEnter={onOverlayMouseEnter}
      onMouseLeave={onOverlayMouseLeave}
    >
      <div id="close-video" onClick={(e) => { e.stopPropagation(); onCloseClick(); }}>
        <i className="fas fa-times" />
      </div>
      <div id="video-container">
        {open ? (
          <iframe title="intro-video" id="video-iframe" src={SITE_CONFIG.VIDEO_SRC} allowFullScreen />
        ) : null}
      </div>
    </div>
  );
}
