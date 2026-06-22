"use client";

import { InteractiveSection } from "./InteractiveSection";
import { MusicSection } from "./MusicSection";
import { AboutSection } from "./sections/AboutSection";
import { HomeHeroSection } from "./sections/HomeHeroSection";
import { InsightSection } from "./sections/InsightSection";
import { PortalSection } from "./sections/PortalSection";
import { SectionPane } from "./sections/SectionPane";
import { StoriesSection } from "./sections/StoriesSection";
import type { PageId } from "./sections/types";

type Props = {
  page: PageId;
  setPage: (p: PageId) => void;
  openJourney: () => void;
  onAvatarEnter: () => void;
  onAvatarLeave: () => void;
};

export function HomePageSections({ page, setPage, openJourney, onAvatarEnter, onAvatarLeave }: Props) {
  return (
    <>
      <SectionPane id="home" activePage={page} className="flex flex-col items-center pt-32">
        <HomeHeroSection setPage={setPage} onAvatarEnter={onAvatarEnter} onAvatarLeave={onAvatarLeave} />
      </SectionPane>
      <SectionPane id="about" activePage={page}>
        <AboutSection openJourney={openJourney} />
      </SectionPane>
      <SectionPane id="portal" activePage={page}>
        <PortalSection />
      </SectionPane>
      <SectionPane id="stories" activePage={page}>
        <StoriesSection />
      </SectionPane>
      <SectionPane id="insight" activePage={page}>
        <InsightSection />
      </SectionPane>
      <InteractiveSection active={page === "interactive"} />
      <MusicSection active={page === "music"} />
    </>
  );
}
