"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, Legend 
} from 'recharts';
import { BrainCircuit, Share2, Database, TrendingUp, ShieldAlert, FileCheck } from 'lucide-react';

const ERA_DATA = [
  { name: '夏商周', value: 120 },
  { name: '秦汉', value: 350 },
  { name: '隋唐', value: 580 },
  { name: '宋元', value: 420 },
  { name: '明清', value: 890 },
  { name: '近现代', value: 260 },
];

const CATEGORY_DATA = [
  { name: '古建筑', value: 45 },
  { name: '古遗址', value: 25 },
  { name: '石窟寺', value: 15 },
  { name: '近现代建筑', value: 10 },
  { name: '其他', value: 5 },
];

const STATUS_TREND = [
  { month: '1月', 完好: 85, 轻微受损: 10, 需修缮: 5 },
  { month: '3月', 完好: 82, 轻微受损: 12, 需修缮: 6 },
  { month: '5月', 完好: 88, 轻微受损: 8, 需修缮: 4 },
  { month: '7月', 完好: 86, 轻微受损: 9, 需修缮: 5 },
  { month: '9月', 完好: 90, 轻微受损: 7, 需修缮: 3 },
  { month: '11月', 完好: 92, 轻微受损: 5, 需修缮: 3 },
];

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b'];

const IntelligentAnalysis = () => {
  return (
    <div className="space-y-6 pb-12">
      {/* 核心指标 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-none shadow-sm bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100 text-xs font-medium">文物档案总数</p>
                <h3 className="text-2xl font-bold mt-1">2,640</h3>
              </div>
              <Database className="opacity-20 w-8 h-8" />
            </div>
            <div className="mt-4 flex items-center text-[10px] text-indigo-100">
              <TrendingUp className="w-3 h-3 mr-1" /> 较上月增长 12%
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-xs font-medium">档案完整度</p>
                <h3 className="text-2xl font-bold mt-1 text-slate-900">94.2%</h3>
              </div>
              <FileCheck className="text-green-500 w-8 h-8" />
            </div>
            <div className="mt-4 w-full bg-slate-100 h-1 rounded-full overflow-hidden">
              <div className="bg-green-500 h-full" style={{ width: '94.2%' }} />
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-xs font-medium">待处理预警</p>
                <h3 className="text-2xl font-bold mt-1 text-slate-900">12</h3>
              </div>
              <ShieldAlert className="text-orange-500 w-8 h-8" />
            </div>
            <p className="mt-4 text-[10px] text-slate-400">涉及 5 个重点保护区域</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-xs font-medium">本月新增档案</p>
                <h3 className="text-2xl font-bold mt-1 text-slate-900">48</h3>
              </div>
              <BrainCircuit className="text-indigo-500 w-8 h-8" />
            </div>
            <p className="mt-4 text-[10px] text-slate-400">主要为近现代建筑类</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 年代关联分析 */}
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between py-4 border-b">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Share2 className="w-4 h-4 text-indigo-600" /> 年代关联分布 (知识图谱)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ERA_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    cursor={{ fill: '#f8fafc' }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="#6366f1" 
                    radius={[4, 4, 0, 0]} 
                    barSize={40}
                    label={{ position: 'top', fill: '#64748b', fontSize: 10, fontWeight: 'bold' }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">
              基于知识图谱技术，系统自动挖掘文物年代间的内在联系。明清时期文物存量最高，呈现出明显的集群效应。
            </p>
          </CardContent>
        </Card>

        {/* 分类分布网状图 */}
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between py-4 border-b">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-600" /> 文物分类占比 (网状分布)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={CATEGORY_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {CATEGORY_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">
              以“古建筑类”为核心展示所有文物分布网状图。古建筑占比 45%，是当前保护与监测的重点对象。
            </p>
          </CardContent>
        </Card>

        {/* 保护状况监测 */}
        <Card className="border-none shadow-sm lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between py-4 border-b">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-orange-600" /> 保护状况实时监测趋势 (大数据)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={STATUS_TREND}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="完好" 
                    stroke="#10b981" 
                    strokeWidth={3} 
                    dot={{ r: 4 }} 
                    activeDot={{ r: 6 }}
                    label={{ position: 'top', fill: '#10b981', fontSize: 10, fontWeight: 'bold' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="轻微受损" 
                    stroke="#f59e0b" 
                    strokeWidth={3} 
                    dot={{ r: 4 }}
                    label={{ position: 'top', fill: '#f59e0b', fontSize: 10, fontWeight: 'bold' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="需修缮" 
                    stroke="#ef4444" 
                    strokeWidth={3} 
                    dot={{ r: 4 }}
                    label={{ position: 'top', fill: '#ef4444', fontSize: 10, fontWeight: 'bold' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IntelligentAnalysis;