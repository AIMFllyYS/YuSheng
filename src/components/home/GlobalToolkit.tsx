"use client";

import { Command } from "cmdk";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PageId } from "./HomeClient";

interface GlobalToolkitProps {
  goPage: (p: PageId) => void;
  toggleTheme: () => void;
  themeLight: boolean;
}

export function GlobalToolkit({ goPage, toggleTheme, themeLight }: GlobalToolkitProps) {
  const [open, setOpen] = useState(false);

  // Toggle the menu when ⌘K or Ctrl+K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[1000] flex flex-col items-center gap-2 group">
        {/* Tooltip hint */}
        <div className="text-[10px] bg-black/50 text-white/70 px-2 py-0.5 rounded backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none translate-y-1 group-hover:translate-y-0 border border-white/5">
          Cmd K
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen(true)}
          className="w-9 h-9 md:w-11 md:h-11 bg-white/5 hover:bg-white/10 rounded-full text-white/50 hover:text-white/90 shadow-[0_4px_15px_rgba(0,0,0,0.3)] flex items-center justify-center text-sm md:text-base backdrop-blur-md border border-white/10 transition-all"
        >
          <i className="fas fa-terminal"></i>
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            {/* Dialog Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-[600px] glass-card rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden border border-white/10"
            >
              <Command className="w-full bg-transparent" label="Global Command Menu">
                <div className="flex items-center px-4 py-4 border-b border-[var(--glass-border)]">
                  <i className="fas fa-search text-[var(--accent-main)] mr-3"></i>
                  <Command.Input 
                    placeholder="搜点什�?.. (路由、工具、设�?" 
                    className="flex-1 bg-transparent border-none outline-none text-[var(--text-color)] placeholder:text-gray-500 text-sm md:text-base"
                    autoFocus
                  />
                  <div className="text-[10px] text-gray-500 border border-gray-600 rounded px-1.5 py-0.5 ml-2">ESC</div>
                </div>

                <Command.List className="max-h-[350px] overflow-y-auto p-2 outline-none cmdk-list">
                  <Command.Empty className="py-8 text-center text-gray-500 text-sm">
                    未找到相关功�?..
                  </Command.Empty>

                  <Command.Group heading="📌 页面导航" className="text-xs text-gray-500/80 font-semibold mb-1 mt-2 px-3 pt-2">
                    <Command.Item onSelect={() => runCommand(() => goPage("home"))} className="cmdk-item mt-2">
                      <i className="fas fa-home w-6 text-center"></i>
                      <span>返回首页</span>
                    </Command.Item>
                    <Command.Item onSelect={() => runCommand(() => goPage("portal"))} className="cmdk-item">
                      <i className="fas fa-th-large w-6 text-center"></i>
                      <span>功能聚合�?/span>
                    </Command.Item>
                    <Command.Item onSelect={() => runCommand(() => goPage("stories"))} className="cmdk-item">
                      <i className="fas fa-book w-6 text-center"></i>
                      <span>众妙之门</span>
                    </Command.Item>
                    <Command.Item onSelect={() => runCommand(() => goPage("insight"))} className="cmdk-item">
                      <i className="fas fa-compass w-6 text-center"></i>
                      <span>三观视界</span>
                    </Command.Item>
                    <Command.Item onSelect={() => runCommand(() => goPage("interactive"))} className="cmdk-item">
                      <i className="fas fa-magic w-6 text-center text-purple-400"></i>
                      <span>灵犀体验</span>
                    </Command.Item>
                  </Command.Group>

                  <Command.Group heading="⚙️ 快捷设置" className="text-xs text-gray-500/80 font-semibold mb-1 mt-4 px-3 pt-2 border-t border-[var(--glass-border)]">
                    <Command.Item onSelect={() => runCommand(toggleTheme)} className="cmdk-item mt-2">
                      <i className={`fas ${themeLight ? 'fa-moon text-indigo-400' : 'fa-sun text-yellow-400'} w-6 text-center`}></i>
                      <span>切换{themeLight ? '夜间' : '日间'}主题</span>
                    </Command.Item>
                  </Command.Group>
                </Command.List>
              </Command>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
