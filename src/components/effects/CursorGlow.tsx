/** 占位由 `BackgroundCanvas` 的 mousemove 更新位置；需保留 id 以匹配原版 CSS */
export function CursorGlow() {
  return (
    <>
      <div id="cursor-ring" />
      <div id="cursor-dot" />
    </>
  );
}
