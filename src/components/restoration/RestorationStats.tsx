"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, AreaChart, Area 
} from 'recharts';
import { Wrench, ClipboardCheck, FileText, CheckCircle2, TrendingUp } from 'lucide-react';

// 模拟数据：方案类型分布
const TYPE_DATA = [
  { name: '日常保养', value: 45 },
  { name: '抢救性修复', value: 25 },
  { name: '预防性保护', value: 20 },
  { name: '研究性修复', value: 10 },
];

// 模拟数据：审核状态分布
const STATUS_DATA = [
  { name: '已通过', value: 58 },
  { name: '审核中', value: 12 },
  { name: '已驳回', value: 5 },
  { name: '草稿', value: 25 },
];

// 模拟数据：修缮进度趋势
const PROGRESS_TREND = [
  { month: '1月', 计划: 10, 完成: 8 },
  { month: '2月', 计划: 15, 完成: 12 },
  { month: '3月', 计划: 20, 完成: 18 },
  { month: '4月', 计划: 18, 完成: 15 },
  { month: '5月', 计划: 25, 完成: 22 },
  { month: '6月', 计划: 30, 完成: 28 },
];

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b'];
const STATUS_COLORS = ['#10b981', '#3b82f6', '#ef4444', '#94a3b8'];

const RestorationStats = () => {
  return (
    <div className="space-y-6 pb-12">
      {/* 顶部核心指标 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: '方案总数', value: '128', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50', sub: '本月新增 12 份' },
          { label: '待审核方案', value: '12', icon: ClipboardCheck, color: 'text-orange-600', bg: 'bg-orange-50', sub: '紧急处理 3 份' },
          { label: '在建修缮项目', value: '15', icon: Wrench, color: 'text-indigo-600', bg: 'bg-indigo-50', sub: '进度正常 13 个' },
          { label: '年度完工率', value: '92%', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50', sub: '较去年提升 5%' },
        ].map((item, idx) => (
          <Card key={idx} className="border-none shadow-sm overflow-hidden">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-xs font-medium mb-1">{item.label}</p>
                <h3 className="text-3xl font-bold tracking-tight text-slate-900">{item.value}</h3>
                <p className="text-[10px] text-slate-400 mt-2">{item.sub}</p>
              </div>
              <div className={`p-3 rounded-2xl ${item.bg}`}>
                <item.icon className={item.color} size={28} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 方案类型占比 */}
        <Card className="border-none shadow-sm">
          <CardHeader className="border-b py-4">
            <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-800">
              <TrendingUp className="w-4 h-4 text-indigo-500" /> 修缮方案类型分布
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={TYPE_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {TYPE_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* 审核状态统计 */}
        <Card className="border-none shadow-sm">
          <CardHeader className="border-b py-4">
            <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-800">
              <ClipboardCheck className="w-4 h-4 text-blue-500" /> 方案审核状态统计
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={STATUS_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                    {STATUS_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={STATUS_COLORS[index % STATUS_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* 修缮进度趋势分析 */}
        <Card className="border-none shadow-sm lg:col-span-2">
          <CardHeader className="border-b py-4">
            <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-800">
              <Wrench className="w-4 h-4 text-green-500" /> 修缮项目执行进度趋势
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={PROGRESS_TREND}>
                  <defs>
                    <linearGradient id="colorPlan" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorDone" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Legend verticalAlign="top" align="right" height={36} iconType="circle" />
                  <Area type="monotone" dataKey="计划" stroke="#6366f1" fillOpacity={1} fill="url(#colorPlan)" strokeWidth={3} />
                  <Area type="monotone" dataKey="完成" stroke="#10b981" fillOpacity={1} fill="url(#colorDone)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RestorationStats;