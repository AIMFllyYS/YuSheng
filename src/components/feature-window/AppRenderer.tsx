"use client";

import { lazy, Suspense } from "react";
import type { AppId } from "@/apps/registry";

// Lazy-load each micro-app  only fetched when user actually opens it
const appComponents: Partial<Record<AppId, React.LazyExoticComponent<React.ComponentType>>> = {
  mygpa: lazy(() => import("@/apps/campus/MyGPA")),
};

function AppLoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-400">
      <i className="fas fa-circle-o-notch fa-spin text-2xl" />
      <span className="text-sm">正在加载应用 </span>
    </div>
  );
}

function AppNotFound({ id }: { id: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-500">
      <i className="fas fa-question-circle text-3xl" />
      <span className="text-sm">未找到应用组件：{id}</span>
    </div>
  );
}

type Props = {
  appId: AppId;
};

/**
 * AppRenderer  renders component-type micro-apps.
 * Only handles "component" render mode. iframe / external handled by FeatureWindow or fullscreen page.
 */
export function AppRenderer({ appId }: Props) {
  const Component = appComponents[appId];

  if (!Component) return <AppNotFound id={appId} />;

  return (
    <div className="w-full h-full overflow-hidden">
      <Suspense fallback={<AppLoadingSpinner />}>
        <Component />
      </Suspense>
    </div>
  );
}
