"use client";

import type { FeatureItem } from "@/data/features";

type Props = {
  items: FeatureItem[];
  selectedIndex: number | null;
  onClick: (index: number) => void;
  onDoubleClick: (index: number) => void;
};

function getTypeLabel(item: FeatureItem): string {
  if (item.type === "folder") return "文件�?;
  if (!item.url || item.url === "#") return "待上�?;
  if (item.url.startsWith("app://")) return "微应�?;
  if (item.url.startsWith("http")) return "外部链接";
  return "内嵌页面";
}

function getTargetDisplay(item: FeatureItem): string {
  if (item.type === "folder") return `${item.children?.length ?? 0} 个子项`;
  if (!item.url || item.url === "#") return "�?;
  if (item.url.startsWith("app://")) return item.url;
  if (item.url.length > 40) return item.url.slice(0, 37) + "�?;
  return item.url;
}

export function FeatureListView({ items, selectedIndex, onClick, onDoubleClick }: Props) {
  if (items.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400 opacity-50">
        空文件夹
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Table header */}
      <div className="flex items-center h-9 px-4 text-xs font-bold text-gray-400 border-b border-white/8 bg-white/3 shrink-0 select-none">
        <div className="flex-1 min-w-0 pl-2">名称</div>
        <div className="w-24 text-center shrink-0">类型</div>
        <div className="w-48 shrink-0 hidden lg:block">目标</div>
      </div>

      {/* Rows */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {items.map((item, index) => {
          const isSelected = selectedIndex === index;
          return (
            <button
              type="button"
              key={`${item.name}-${index}`}
              className={`w-full flex items-center h-9 px-4 text-sm transition-colors duration-100 animate-fade-up ${
                isSelected
                  ? "bg-white/12 ring-1 ring-inset ring-white/20"
                  : "hover:bg-white/6"
              }`}
              style={{ animationDelay: `${index * 25}ms` }}
              onClick={() => onClick(index)}
              onDoubleClick={() => onDoubleClick(index)}
            >
              {/* Name column */}
              <div className="flex-1 min-w-0 flex items-center gap-2.5 pl-2">
                <i
                  className={`fas ${item.icon || "fa-file"} w-4 text-center text-base ${
                    item.type === "folder"
                      ? item.color || "text-yellow-300"
                      : "text-gray-400"
                  }`}
                />
                <span className="truncate text-gray-100">{item.name}</span>
              </div>

              {/* Type column */}
              <div className="w-24 text-center shrink-0 text-xs text-gray-500">
                {getTypeLabel(item)}
              </div>

              {/* Target column */}
              <div className="w-48 shrink-0 text-xs text-gray-600 truncate hidden lg:block">
                {getTargetDisplay(item)}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
