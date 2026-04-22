"use client";

import { useRouter, useParams } from "next/navigation";
import { APP_REGISTRY, type AppId } from "@/apps/registry";
import { AppRenderer } from "@/components/feature-window/AppRenderer";

export default function FullscreenAppPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const meta = APP_REGISTRY[id as AppId];

  if (!meta) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-[var(--bg-color)] text-[var(--text-color)] gap-4">
        <i className="fa fa-exclamation-triangle text-4xl text-amber-400" />
        <p className="text-lg">未找到应用：{id}</p>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm"
        >
          <i className="fa fa-arrow-left mr-2" />
          返回
        </button>
      </div>
    );
  }

  const isIframe = meta.render.type === "iframe";
  const isComponent = meta.render.type === "component";

  return (
    <div className="fixed inset-0 flex flex-col bg-[var(--bg-color)] text-[var(--text-color)]">
      {/* Top bar */}
      <div className="h-12 flex items-center justify-between px-6 bg-black/20 backdrop-blur-md border-b border-white/8 shrink-0 z-10">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            title="返回"
          >
            <i className="fa fa-arrow-left" />
          </button>
          <div className="h-5 w-px bg-white/10" />
          <i className={`fa ${meta.icon} ${meta.color}`} />
          <span className="font-bold tracking-wide">{meta.name}</span>
        </div>
        <div className="text-xs text-gray-500">
          /fullscreen/{id}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden relative">
        {isComponent && (
          <AppRenderer appId={meta.id} />
        )}
        {isIframe && meta.render.type === "iframe" && (
          <iframe
            src={meta.render.url}
            className="w-full h-full border-none"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          />
        )}
      </div>
    </div>
  );
}
