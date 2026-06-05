"use client";

import React from 'react';
import RelicMapDashboard from './RelicMapDashboard';
import RelicDataDashboard from './RelicDataDashboard';
import EventDashboard from './EventDashboard';
import DeviceDashboard from './DeviceDashboard';

// 定义大屏组件列表
export const DASHBOARDS = [
  { id: 'map', component: RelicMapDashboard, label: '全景看板' },
  { id: 'relic', component: RelicDataDashboard, label: '文物数据' },
  { id: 'event', component: EventDashboard, label: '文保事件' },
  { id: 'device', component: DeviceDashboard, label: '检测设备' },
];

interface SmartScreenCarouselProps {
  activeIndex: number;
}

const SmartScreenCarousel = ({ activeIndex }: SmartScreenCarouselProps) => {
  const ActiveComponent = DASHBOARDS[activeIndex].component;

  return (
    <div className="relative h-full flex flex-col animate-in fade-in duration-700">
      <ActiveComponent />
    </div>
  );
};

export default SmartScreenCarousel;