"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { AlertCircle, TrendingUp, List, Clock } from 'lucide-react';

const TREND_DATA = [
  { month: '1月', 安全: 12, 修缮: 5, 保护: 8 },
  { month: '3月', 安全: 18, 修缮: 8, 保护: 12 },
  { month: '5月', 安全: 15, 修缮: 12, 保护: 10 },
  { month: '7月', 安全: 25, 修缮: 15, 保护: 18 },
  { month: '9月', 安全: 20, 修缮: 10, 保护: 15 },
  { month: '11月', 安全: 14, 修缮: 6, 保护: 9 },
];

const RECENT_EVENTS = [
  { id: '1', type: '安全事件', time: '10:20', relic: '太和殿', status: '处理中', level: '高' },
  { id: '2', type: '修缮事件', time: '09:15', relic: '祈年殿', status: '已完成', level: '中' },
  { id: '3', type: '保护事件', time: '昨天', relic: '佛香阁', status: '待核实', level: '低' },
];

const EventDashboard = () => {
  return (
    <div className="space-y-6 bg-[#020617] p-6 rounded-2xl border border-white/5 min-h-screen text-white">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 事件趋势分析 */}
        <Card className="bg-white/5 border-white/10 text-white lg:col-span-2">
          <CardHeader className="border-b border-white/5">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" /> 文保事件发生趋势
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={TREND_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none' }} />
                  <Legend />
                  <Line type="monotone" dataKey="安全" stroke="#ff0055" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="修缮" stroke="#00f2ff" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="保护" stroke="#7000ff" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* 实时事件列表 */}
        <Card className="bg-white/5 border-white/10 text-white">
          <CardHeader className="border-b border-white/5">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <List className="w-4 h-4 text-yellow-400" /> 实时事件动态
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {RECENT_EVENTS.map((event) => (
                <div key={event.id} className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-center gap-4">
                  <div className={`w-2 h-12 rounded-full ${event.level === '高' ? 'bg-red-500' : event.level === '中' ? 'bg-yellow-500' : 'bg-blue-500'}`} />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-bold">{event.type}</span>
                      <span className="text-[10px] text-slate-500 flex items-center gap-1"><Clock size={10} /> {event.time}</span>
                    </div>
                    <p className="text-xs text-slate-400">{event.relic} - {event.status}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 text-xs text-slate-500 hover:text-white transition-colors border border-white/10 rounded-lg">查看全部事件</button>
          </CardContent>
        </Card>

        {/* 事件分类统计 */}
        <Card className="bg-white/5 border-white/10 text-white lg:col-span-3">
          <CardHeader className="border-b border-white/5">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-pink-400" /> 各类事件数量统计
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={TREND_DATA} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="month" type="category" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none' }} />
                  <Bar dataKey="安全" fill="#ff0055" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventDashboard;