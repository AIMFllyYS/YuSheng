export type PageId = "home" | "about" | "portal" | "stories" | "insight" | "interactive" | "music";

export type SectionPaneProps = {
  id: PageId;
  activePage: PageId;
  children: React.ReactNode;
  className?: string;
};
