"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Cpu, ShieldAlert, Video, Activity, Zap } from 'lucide-react';

const DEVICE_STATUS = [
  { name: '烟感', total: 120, online: 118 },
  { name: '温湿度', total: 85, online: 82 },
  { name: '防盗', total: 64, online: 64 },
  { name: '视频', total: 42, online: 40 },
];

const ALARM_TREND = [
  { time: '00:00', count: 2 },
  { time: '04:00', count: 1 },
  { time: '08:00', count: 5 },
  { time: '12:00', count: 8 },
  { time: '16:00', count: 4 },
  { time: '20:00', count: 3 },
];

const DeviceDashboard = () => {
  return (
    <div className="space-y-6 bg-[#020617] p-6 rounded-2xl border border-white/5 min-h-screen text-white">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: '接入设备总数', value: '311', icon: Cpu, color: 'text-blue-400' },
          { label: '在线率', value: '98.2%', icon: Activity, color: 'text-green-400' },
          { label: '今日告警数', value: '12', icon: ShieldAlert, color: 'text-red-400' },
          { label: '视频监控点', value: '42', icon: Video, color: 'text-purple-400' },
        ].map((item, idx) => (
          <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center gap-4">
            <div className={`p-3 rounded-xl bg-white/5 ${item.color}`}>
              <item.icon size={24} />
            </div>
            <div>
              <p className="text-slate-400 text-[10px] font-medium uppercase tracking-wider">{item.label}</p>
              <h3 className="text-2xl font-bold">{item.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 设备在线情况 */}
        <Card className="bg-white/5 border-white/10 text-white">
          <CardHeader className="border-b border-white/5">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" /> 设备在线状态统计
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DEVICE_STATUS}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none' }} />
                  <Bar dataKey="total" fill="rgba(255,255,255,0.1)" radius={[4, 4, 0, 0]} barSize={30} />
                  <Bar dataKey="online" fill="#00f2ff" radius={[4, 4, 0, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* 告警趋势 */}
        <Card className="bg-white/5 border-white/10 text-white">
          <CardHeader className="border-b border-white/5">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-400" /> 24小时告警趋势
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ALARM_TREND}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none' }} />
                  <Line type="stepAfter" dataKey="count" stroke="#ff0055" strokeWidth={3} dot={{ r: 4, fill: '#ff0055' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* 视频监控预览占位 */}
        <Card className="bg-white/5 border-white/10 text-white lg:col-span-2">
          <CardHeader className="border-b border-white/5">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Video className="w-4 h-4 text-purple-400" /> 重点区域视频巡检
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-video bg-slate-900 rounded-xl border border-white/5 flex items-center justify-center relative group overflow-hidden">
                  <Video className="text-slate-800 group-hover:text-slate-600 transition-colors" size={32} />
                  <div className="absolute top-2 left-2 bg-black/60 px-2 py-0.5 rounded text-[10px] text-white flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    监控点 0{i}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeviceDashboard;