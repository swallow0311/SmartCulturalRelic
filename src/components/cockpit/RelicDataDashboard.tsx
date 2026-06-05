"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Database, MapPin, History, ShieldCheck, Wrench } from 'lucide-react';

const DISTRIBUTION_DATA = [
  { name: '核心区', value: 450 },
  { name: '缓冲区', value: 320 },
  { name: '外围区', value: 210 },
  { name: '重点区', value: 180 },
];

const ERA_DATA = [
  { name: '明代', value: 850 },
  { name: '清代', value: 1200 },
  { name: '民国', value: 400 },
  { name: '现代', value: 190 },
];

const STATUS_DATA = [
  { name: '完好', value: 65 },
  { name: '轻微受损', value: 20 },
  { name: '需修缮', value: 15 },
];

const COLORS = ['#00f2ff', '#7000ff', '#ff00c8', '#ffcc00'];

const RelicDataDashboard = () => {
  return (
    <div className="space-y-6 bg-[#020617] p-6 rounded-2xl border border-white/5 min-h-screen text-white">
      {/* 顶部核心指标 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: '不可移动文物总数', value: '2,640', icon: Database, color: 'text-cyan-400' },
          { label: '国家级保护单位', value: '12', icon: ShieldCheck, color: 'text-purple-400' },
          { label: '省级保护单位', value: '48', icon: MapPin, color: 'text-pink-400' },
          { label: '正在修缮项目', value: '15', icon: Wrench, color: 'text-yellow-400' },
        ].map((item, idx) => (
          <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-xs font-medium mb-1">{item.label}</p>
              <h3 className="text-3xl font-bold tracking-tight">{item.value}</h3>
            </div>
            <item.icon className={item.color} size={32} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 分布情况 */}
        <Card className="bg-white/5 border-white/10 text-white">
          <CardHeader className="border-b border-white/5">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" /> 区域分布统计
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DISTRIBUTION_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px' }} />
                  <Bar dataKey="value" fill="#00f2ff" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* 年代分析 */}
        <Card className="bg-white/5 border-white/10 text-white">
          <CardHeader className="border-b border-white/5">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <History className="w-4 h-4 text-purple-400" /> 文物年代构成
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={ERA_DATA} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                    {ERA_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none' }} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* 保存状况 */}
        <Card className="bg-white/5 border-white/10 text-white lg:col-span-2">
          <CardHeader className="border-b border-white/5">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-pink-400" /> 文物保存现状分析
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {STATUS_DATA.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center p-6 bg-white/5 rounded-2xl border border-white/5">
                  <div className="text-4xl font-black mb-2" style={{ color: COLORS[idx] }}>{item.value}%</div>
                  <div className="text-slate-400 text-sm">{item.name}</div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full mt-4 overflow-hidden">
                    <div className="h-full" style={{ width: `${item.value}%`, backgroundColor: COLORS[idx] }} />
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

export default RelicDataDashboard;