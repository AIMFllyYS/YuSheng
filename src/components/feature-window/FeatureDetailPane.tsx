"use client";

import { motion } from "framer-motion";
import type { FeatureItem } from "@/data/features";

type Props = {
  item: FeatureItem;
  onClose: () => void;
};

function getTypeLabel(item: FeatureItem): string {
  if (item.type === "folder") return "文件夀;
  if (!item.url || item.url === "#") return "待上纀;
  if (item.url.startsWith("app://")) return "微应甀;
  if (item.url.startsWith("http")) return "外部链接";
  return "内嵌页面";
}

function getProtocol(item: FeatureItem): string {
  if (item.type === "folder") return " ;
  if (!item.url || item.url === "#") return " ;
  if (item.url.startsWith("app://")) return "app://";
  if (item.url.startsWith("https")) return "HTTPS";
  if (item.url.startsWith("http")) return "HTTP";
  return "本地文件";
}

export function FeatureDetailPane({ item, onClose }: Props) {
  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: 272, opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 35 }}
      className="border-l border-white/10 dark:border-slate-700/70 bg-white/3 backdrop-blur-sm overflow-hidden shrink-0"
    >
      <div className="w-[272px] h-full overflow-y-auto no-scrollbar p-5 flex flex-col">
        {/* Header: close button */}
        <div className="flex justify-end mb-2">
          <button
            type="button"
            onClick={onClose}
            className="w-6 h-6 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-300 hover:bg-white/10 transition-all text-xs"
          >
            <i className="fas fa-times" />
          </button>
        </div>

        {/* Icon + Name */}
        <div className="flex flex-col items-center mb-5">
          <div
            className={`text-5xl mb-3 ${
              item.type === "folder"
                ? item.color || "text-yellow-300"
                : "text-gray-300"
            }`}
          >
            <i className={`fas ${item.icon || "fa-file"}`} />
          </div>
          <h3 className="text-sm font-bold text-gray-100 text-center leading-snug">
            {item.name}
          </h3>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-4" />

        {/* Properties */}
        <div className="space-y-3 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500">类型</span>
            <span className="text-gray-300">{getTypeLabel(item)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">协议</span>
            <span className="text-gray-300">{getProtocol(item)}</span>
          </div>
          {item.type === "folder" && item.children && (
            <div className="flex justify-between">
              <span className="text-gray-500">子项敀</span>
              <span className="text-gray-300">{item.children.length} 一</span>
            </div>
          )}
          {item.url && item.url !== "#" && (
            <div>
              <span className="text-gray-500 block mb-1">目标路径</span>
              <span className="text-gray-400 break-all text-[11px] leading-relaxed block">
                {item.url}
              </span>
            </div>
          )}
          {item.tags && item.tags.length > 0 && (
            <div>
              <span className="text-gray-500 block mb-1.5">标签</span>
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full bg-white/8 text-gray-400 text-[10px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        {item.description ? (
          <>
            <div className="h-px bg-white/10 my-4" />
            <div>
              <div className="text-xs text-gray-500 mb-2 flex items-center gap-1.5">
                <i className="fas fa-info-circle" /> 描述
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          </>
        ) : (
          item.url === "#" || !item.url ? (
            <>
              <div className="h-px bg-white/10 my-4" />
              <div className="text-xs text-gray-600 italic text-center py-2">
                内容即将上线
              </div>
            </>
          ) : null
        )}
      </div>
    </motion.div>
  );
}
