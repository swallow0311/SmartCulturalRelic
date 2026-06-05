"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  BarChart, Bar, Legend 
} from 'recharts';
import { 
  MapPin, ShieldAlert, Wrench, Database, 
  Clock, Search, Maximize2, X, Info
} from 'lucide-react';
import { cn } from '@/lib/utils';

// 模拟地图点位数据
const MAP_MARKERS = [
  { id: '1', name: '青礁慈济宫', type: '国家级', x: '45%', y: '35%', status: '正常', era: '宋代', level: '国家级重点文物保护单位' },
  { id: '2', name: '莲花洲遗址', type: '省级', x: '55%', y: '45%', status: '修缮中', era: '新石器时代', level: '省级文物保护单位' },
  { id: '3', name: '海沧魁星阁', type: '市级', x: '40%', y: '60%', status: '告警', era: '清代', level: '市级文物保护单位' },
  { id: '4', name: '天竺山古窑址', type: '区级', x: '65%', y: '30%', status: '正常', era: '唐代', level: '区级文物保护单位' },
];

// 图表数据
const LEVEL_DATA = [
  { name: '国家级', value: 361, color: '#f59e0b' },
  { name: '省级', value: 361, color: '#8b5cf6' },
  { name: '市级', value: 361, color: '#3b82f6' },
  { name: '区级', value: 361, color: '#10b981' },
];

const TREND_DATA = [
  { year: '2020', value: 240 },
  { year: '2021', value: 280 },
  { year: '2022', value: 320 },
  { year: '2023', value: 290 },
  { year: '2024', value: 260 },
  { year: '2025', value: 310 },
];

const OWNERSHIP_DATA = [
  { name: '国有', value: 85000 },
  { name: '私人', value: 11000 },
  { name: '集体', value: 12000 },
  { name: '其他', value: 8000 },
];

const RelicMapDashboard = () => {
  const [selectedRelic, setSelectedRelic] = useState<typeof MAP_MARKERS[0] | null>(null);

  return (
    <div className="relative h-[calc(100vh-120px)] bg-[#020617] overflow-hidden rounded-2xl border border-white/5 text-white font-sans">
      {/* 背景地图模拟层 */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2000')] bg-cover bg-center opacity-20 grayscale" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-transparent to-[#020617]/80" />
      
      {/* 地图交互点位 */}
      <div className="absolute inset-0 z-10">
        {MAP_MARKERS.map((marker) => (
          <button
            key={marker.id}
            className="absolute group transition-transform hover:scale-125"
            style={{ left: marker.x, top: marker.y }}
            onClick={() => setSelectedRelic(marker)}
          >
            <div className={cn(
              "relative flex items-center justify-center w-8 h-8 rounded-full border-2 shadow-[0_0_15px_rgba(0,0,0,0.5)]",
              marker.status === '告警' ? "bg-red-500/20 border-red-500 animate-pulse" : 
              marker.status === '修缮中' ? "bg-blue-500/20 border-blue-500" : "bg-indigo-500/20 border-indigo-400"
            )}>
              <MapPin size={16} className={cn(
                marker.status === '告警' ? "text-red-500" : 
                marker.status === '修缮中' ? "text-blue-400" : "text-indigo-400"
              )} />
              {/* 悬浮标签 */}
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-900/90 border border-white/10 px-2 py-1 rounded text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                {marker.name}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* 顶部统计卡片 */}
      <div className="absolute top-6 left-6 z-20 flex gap-4">
        {[
          { label: '文物总数', value: '345', icon: Database, color: 'bg-indigo-500/20 border-indigo-500/50' },
          { label: '当前告警', value: '345', icon: ShieldAlert, color: 'bg-red-500/20 border-red-500/50' },
          { label: '修缮工程', value: '345', icon: Wrench, color: 'bg-blue-500/20 border-blue-500/50' },
        ].map((item, idx) => (
          <div key={idx} className={cn("px-6 py-3 rounded-xl border backdrop-blur-md flex items-center gap-4", item.color)}>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{item.label}</p>
              <h3 className="text-2xl font-black">{item.value} <span className="text-xs font-normal text-slate-500">处</span></h3>
            </div>
            <item.icon size={24} className="opacity-50" />
          </div>
        ))}
      </div>

      {/* 左侧面板 */}
      <div className="absolute left-6 top-32 bottom-6 w-80 z-20 flex flex-col gap-4">
        {/* 文物保护级别 */}
        <Card className="bg-slate-900/40 border-white/5 backdrop-blur-md text-white flex-1">
          <CardHeader className="py-3 border-b border-white/5">
            <CardTitle className="text-xs font-bold flex items-center gap-2">文物保护级别</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 flex flex-col h-[calc(100%-45px)]">
            <div className="h-48 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={LEVEL_DATA} innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value">
                    {LEVEL_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-y-3 mt-2">
              {LEVEL_DATA.map((item) => (
                <div key={item.name} className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-[10px] text-slate-400">{item.name}</span>
                  </div>
                  <span className="text-xs font-bold">{item.value} 处</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 文物年代分布 */}
        <Card className="bg-slate-900/40 border-white/5 backdrop-blur-md text-white flex-1">
          <CardHeader className="py-3 border-b border-white/5 flex flex-row items-center justify-between">
            <CardTitle className="text-xs font-bold">文物年代分布</CardTitle>
            <button className="text-[10px] text-slate-500 hover:text-white">查看更多</button>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-[10px]">
              <thead className="text-slate-500 border-b border-white/5">
                <tr>
                  <th className="py-2 pl-4 text-left">年代</th>
                  <th className="py-2 text-center">总数量</th>
                  <th className="py-2 pr-4 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                {[
                  { era: '明代', count: 100 },
                  { era: '两晋南北朝', count: 100 },
                  { era: '五代十国', count: 100 },
                  { era: '周(含春秋)', count: 100 },
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-2.5 pl-4 font-bold">{row.era}</td>
                    <td className="py-2.5 text-center">{row.count}</td>
                    <td className="py-2.5 pr-4 text-right text-blue-400 cursor-pointer">详情</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      {/* 右侧面板 */}
      <div className="absolute right-6 top-6 bottom-6 w-80 z-20 flex flex-col gap-4">
        {/* 安全动态 */}
        <Card className="bg-slate-900/40 border-white/5 backdrop-blur-md text-white h-48">
          <CardHeader className="py-3 border-b border-white/5">
            <CardTitle className="text-xs font-bold">安全动态</CardTitle>
          </CardHeader>
          <CardContent className="pt-3 space-y-3 overflow-y-auto h-[calc(100%-45px)]">
            {[
              { msg: '【烟感告警】青礁慈济宫 东侧回廊', time: '01-15 21:09' },
              { msg: '【倾斜告警】青礁慈济宫 东侧回廊', time: '01-15 21:09' },
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-start gap-2">
                <p className="text-[10px] text-slate-300 leading-relaxed">{item.msg}</p>
                <span className="text-[9px] text-slate-500 shrink-0">{item.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 修缮保护情况 */}
        <Card className="bg-slate-900/40 border-white/5 backdrop-blur-md text-white flex-1">
          <CardHeader className="py-3 border-b border-white/5">
            <CardTitle className="text-xs font-bold">修缮保护情况</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 h-[calc(100%-45px)]">
            <div className="h-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={TREND_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none' }} />
                  <Line type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 3, fill: '#0ea5e9' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* 权属情况 */}
        <Card className="bg-slate-900/40 border-white/5 backdrop-blur-md text-white flex-1">
          <CardHeader className="py-3 border-b border-white/5">
            <CardTitle className="text-xs font-bold">权属情况</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 h-[calc(100%-45px)]">
            <div className="h-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={OWNERSHIP_DATA} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none' }} />
                  <Bar dataKey="value" fill="#10b981" radius={[0, 4, 4, 0]} barSize={12} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 底部图例 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 bg-slate-900/60 border border-white/10 px-6 py-2 rounded-full backdrop-blur-md flex gap-8">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-indigo-500 rounded-sm" />
          <span className="text-[10px] font-bold">国家级文物</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-purple-500 rounded-sm" />
          <span className="text-[10px] font-bold">省级文物</span>
        </div>
      </div>

      {/* 文物详情弹窗 (点击地图点位触发) */}
      {selectedRelic && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <Card className="w-[500px] bg-slate-900 border-indigo-500/30 shadow-[0_0_50px_rgba(79,70,229,0.2)] text-white overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500" />
            <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 py-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/20 rounded-lg">
                  <Info className="text-indigo-400" size={20} />
                </div>
                <div>
                  <CardTitle className="text-lg font-black">{selectedRelic.name}</CardTitle>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">{selectedRelic.level}</p>
                </div>
              </div>
              <button onClick={() => setSelectedRelic(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={20} />
              </button>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-[10px] text-slate-500 font-bold uppercase">所属年代</p>
                  <p className="text-sm font-medium">{selectedRelic.era}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-slate-500 font-bold uppercase">当前状态</p>
                  <div className="flex items-center gap-2">
                    <div className={cn("w-2 h-2 rounded-full", selectedRelic.status === '正常' ? "bg-green-500" : "bg-orange-500")} />
                    <p className="text-sm font-medium">{selectedRelic.status}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <p className="text-[10px] text-slate-500 font-bold uppercase">实时监测数据</p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: '环境湿度', value: '45%', status: '正常' },
                    { label: '结构倾斜', value: '0.02°', status: '正常' },
                    { label: '烟雾浓度', value: '0.01%', status: '正常' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/5 p-3 rounded-xl border border-white/5">
                      <p className="text-[9px] text-slate-400 mb-1">{stat.label}</p>
                      <p className="text-base font-black text-indigo-400">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2">
                  <Maximize2 size={14} /> 查看全景
                </button>
                <button className="flex-1 border border-white/10 hover:bg-white/5 py-2.5 rounded-xl text-xs font-bold transition-colors">
                  档案详情
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default RelicMapDashboard;