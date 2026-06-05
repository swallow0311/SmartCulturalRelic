"use client";

import React from 'react';
import { MENU_DATA } from '@/constants/menuData';
import { cn } from '@/lib/utils';
import { User, Bell, ShieldCheck, ClipboardCheck, AlertTriangle, Clock } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  activeModuleId: string;
  onModuleChange: (id: string) => void;
}

const Header = ({ activeModuleId, onModuleChange }: HeaderProps) => {
  // 模拟通知数据
  const pendingApprovals = [
    { id: '1', title: '太和殿屋顶修缮方案', time: '10分钟前' },
    { id: '2', title: '祈年殿彩画修复方案', time: '1小时前' },
  ];

  const pendingAlarms = [
    { id: '1', title: '主殿西区烟火告警', level: '紧急', time: '刚刚' },
  ];

  return (
    <header className="h-16 border-b bg-[#001529] text-white flex items-center px-6 shrink-0 z-50 shadow-md">
      <div className="flex items-center gap-3 mr-12">
        <div className="bg-blue-600 p-1.5 rounded-lg">
          <ShieldCheck size={24} className="text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight">智慧文物管理系统</span>
      </div>

      <nav className="flex h-full items-center">
        {MENU_DATA.map((module) => (
          <button
            key={module.id}
            onClick={() => onModuleChange(module.id)}
            className={cn(
              'px-6 h-full flex items-center transition-colors relative text-sm font-medium',
              activeModuleId === module.id
                ? 'text-white bg-blue-600/20'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            )}
          >
            {module.label}
            {activeModuleId === module.id && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500" />
            )}
          </button>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-6">
        <Popover>
          <PopoverTrigger asChild>
            <button className="p-2 text-slate-300 hover:text-white transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#001529]" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0 mr-4 mt-1 border-slate-200 shadow-xl overflow-hidden">
            <div className="bg-slate-50 border-b p-4 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800">通知中心</h3>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-[10px]">{pendingApprovals.length + pendingAlarms.length}</Badge>
            </div>
            
            <div className="max-h-[400px] overflow-y-auto">
              {/* 待审批方案 */}
              <div className="p-2">
                <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <ClipboardCheck className="w-3 h-3" /> 待审批方案
                </div>
                {pendingApprovals.map((item) => (
                  <div key={item.id} className="p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-slate-100">
                    <p className="text-xs font-medium text-slate-700 mb-1">{item.title}</p>
                    <div className="flex items-center text-[10px] text-slate-400">
                      <Clock className="w-3 h-3 mr-1" /> {item.time}
                    </div>
                  </div>
                ))}
              </div>

              <div className="h-px bg-slate-100 mx-2" />

              {/* 待处理告警 */}
              <div className="p-2">
                <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <AlertTriangle className="w-3 h-3 text-red-500" /> 待处理告警
                </div>
                {pendingAlarms.map((item) => (
                  <div key={item.id} className="p-3 hover:bg-red-50 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-red-100">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-xs font-bold text-red-700">{item.title}</p>
                      <Badge className="bg-red-500 text-white text-[9px] px-1.5 py-0 h-4 border-none">{item.level}</Badge>
                    </div>
                    <div className="flex items-center text-[10px] text-red-400/80">
                      <Clock className="w-3 h-3 mr-1" /> {item.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-3 border-t bg-slate-50 text-center">
              <button className="text-[11px] text-blue-600 font-bold hover:underline">查看所有通知中心消息</button>
            </div>
          </PopoverContent>
        </Popover>

        <div className="flex items-center gap-3 pl-4 border-l border-slate-700">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white">
            <User size={18} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">管理员</span>
            <span className="text-[10px] text-slate-400">超级管理员</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;