type Props = {
  id: string;
  left: number;
  top: number;
  year: string;
  emoji: string;
  title: string;
  detailTitle: string;
  detailText: string;
  expanded: boolean;
  onToggle: () => void;
  onCloseDetail: () => void;
};

export function JourneyNode({ id, left, top, year, emoji, title, detailTitle, detailText, expanded, onToggle, onCloseDetail }: Props) {
  return (
    <div className={`journey-node ${expanded ? "expanded" : ""}`} style={{ left, top }} data-id={id} onClick={(e) => { e.stopPropagation(); onToggle(); }}>
      <span className="node-year">{year}</span>
      <div className="node-circle">{emoji}</div>
      <span className="node-title">{title}</span>
      <div className="node-detail">
        <div className="node-detail-close" onClick={(e) => { e.stopPropagation(); onCloseDetail(); }}>
          <i className="fas fa-times" />
        </div>
        <h4>{detailTitle}</h4>
        <p>{detailText}</p>
      </div>
    </div>
  );
}
