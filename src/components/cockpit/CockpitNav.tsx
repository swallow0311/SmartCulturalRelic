"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { Lock, Unlock } from 'lucide-react';
import { DASHBOARDS } from './SmartScreenCarousel';

interface CockpitNavProps {
  activeIndex: number;
  onSelect: (index: number) => void;
  isLocked: boolean;
  onToggleLock: (lock: boolean) => void;
}

const CockpitNav = ({ activeIndex, onSelect, isLocked, onToggleLock }: CockpitNavProps) => {
  
  const handleItemClick = (index: number) => {
    onSelect(index);
    // 点击菜单项时，如果不是当前项，默认开启锁定
    if (activeIndex !== index) {
      onToggleLock(true);
    }
  };

  return (
    <div className="relative flex items-center justify-center bg-slate-900/60 backdrop-blur-md border-b border-white/10 px-4 h-14 shrink-0 z-30">
      {/* 居中的菜单容器 */}
      <div className="flex items-center gap-4 overflow-x-auto no-scrollbar px-2">
        {DASHBOARDS.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <div key={item.id} className="relative flex items-center">
              <button
                onClick={() => handleItemClick(index)}
                className={cn(
                  "px-6 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2",
                  isActive 
                    ? "text-white bg-white/10 shadow-inner" 
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                )}
              >
                {item.label}
                
                {/* 仅在选中项显示锁定图标 */}
                {isActive && (
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleLock(!isLocked);
                    }}
                    className={cn(
                      "p-1 rounded-md transition-colors",
                      isLocked ? "text-blue-400 bg-blue-500/20" : "text-slate-500 hover:text-white"
                    )}
                    title={isLocked ? "已锁定轮播" : "点击锁定当前页"}
                  >
                    {isLocked ? <Lock size={12} /> : <Unlock size={12} />}
                  </div>
                )}
              </button>
              
              {isActive && (
                <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-blue-500 rounded-full animate-in fade-in slide-in-from-bottom-1" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CockpitNav;