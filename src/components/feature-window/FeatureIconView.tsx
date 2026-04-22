"use client";

import type { FeatureItem } from "@/data/features";

type Props = {
  items: FeatureItem[];
  selectedIndex: number | null;
  onClick: (index: number) => void;
  onDoubleClick: (index: number) => void;
};

export function FeatureIconView({ items, selectedIndex, onClick, onDoubleClick }: Props) {
  if (items.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400 opacity-50">
        空文件夹
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto no-scrollbar grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 content-start">
      {items.map((item, index) => {
        const isSelected = selectedIndex === index;
        return (
          <button
            type="button"
            key={`${item.name}-${index}`}
            className={`group flex flex-col items-center justify-center p-5 rounded-xl cursor-pointer transition-all duration-200 animate-fade-up ${
              isSelected
                ? "bg-white/15 ring-1 ring-white/25 shadow-lg"
                : "hover:-translate-y-1 hover:bg-white/8 dark:hover:bg-black/30 hover:shadow-md"
            }`}
            style={{ animationDelay: `${index * 40}ms` }}
            onClick={() => onClick(index)}
            onDoubleClick={() => onDoubleClick(index)}
          >
            <div
              className={`mb-3 text-4xl drop-shadow-sm transition-transform duration-200 group-hover:scale-110 ${
                item.type === "folder"
                  ? item.color || "text-yellow-300"
                  : isSelected
                    ? "text-blue-300"
                    : "text-gray-400 dark:text-gray-300 group-hover:text-blue-300"
              }`}
            >
              <i className={`fas ${item.icon || "fa-file"}`} />
            </div>
            <span className="text-xs font-medium text-center text-gray-100 line-clamp-2 w-full break-words leading-relaxed">
              {item.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
