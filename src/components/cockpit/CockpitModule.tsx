"use client";

import React, { useState, useEffect } from 'react';
import CockpitNav from './CockpitNav';
import SmartScreenCarousel, { DASHBOARDS } from './SmartScreenCarousel';

const CockpitModule = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  // 自动轮播逻辑
  useEffect(() => {
    // 如果处于锁定状态，不执行轮播
    if (isLocked) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % DASHBOARDS.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isLocked, activeIndex]); // 增加 activeIndex 依赖确保状态同步

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#020617]">
      <CockpitNav 
        activeIndex={activeIndex} 
        onSelect={setActiveIndex}
        isLocked={isLocked}
        onToggleLock={setIsLocked}
      />
      <div className="flex-1 overflow-hidden p-6">
        <SmartScreenCarousel activeIndex={activeIndex} />
      </div>
    </div>
  );
};

export default CockpitModule;