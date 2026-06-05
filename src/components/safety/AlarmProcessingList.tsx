"use client";

import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown, ChevronUp, Eye, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { showSuccess } from "@/utils/toast";

interface AlarmProcessingListProps {
  onDetail: (data: any) => void;
}

const AlarmProcessingList = ({ onDetail }: AlarmProcessingListProps) => {
  const [showMoreSearch, setShowMoreSearch] = useState(false);
  const [deleteItem, setDeleteItem] = useState<any>(null);
  
  const data = [
    { 
      id: '1', 
      name: '太和殿烟雾告警', code: 'ALM-20231012-001', time: '2023-10-12 14:30:05', 
      alarmDuration: '15min', processDuration: '45min', lastAlarmDuration: '10min',
      relic: '太和殿', deviceCode: 'SB-2023-001', deviceName: '烟感探测器A1',
      condition: '烟雾浓度 > 30%', processor: '张三', contact: '13800138000'
    },
    { 
      id: '2', 
      name: '祈年殿温度异常', code: 'ALM-20231105-002', time: '2023-11-05 09:15:20', 
      alarmDuration: '5min', processDuration: '20min', lastAlarmDuration: 'N/A',
      relic: '祈年殿', deviceCode: 'SB-2023-002', deviceName: '温湿度计B2',
      condition: '温度 > 45℃', processor: '李四', contact: '13900139000'
    },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-xl border shadow-sm space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input className="pl-9 h-9" placeholder="事件名称" />
            </div>
            <Button variant="default" className="bg-indigo-600 hover:bg-indigo-700 h-9">查询</Button>
            <Button 
              variant="ghost" 
              className="text-slate-500 text-xs h-9"
              onClick={() => setShowMoreSearch(!showMoreSearch)}
            >
              {showMoreSearch ? '收起筛选' : '更多筛选'} 
              {showMoreSearch ? <ChevronUp className="ml-1 w-3 h-3" /> : <ChevronDown className="ml-1 w-3 h-3" />}
            </Button>
          </div>
        </div>

        {showMoreSearch && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100 animate-in fade-in slide-in-from-top-2">
            <Input className="h-9" placeholder="告警文物" />
            <Input className="h-9" placeholder="事件编号" />
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="min-w-[1800px] border-separate border-spacing-0">
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="w-48 border-b">事件名称</TableHead>
                <TableHead className="w-48 border-b">事件编号</TableHead>
                <TableHead className="w-48 border-b">发生时间</TableHead>
                <TableHead className="w-40 border-b">告警文物</TableHead>
                <TableHead className="w-48 border-b">告警条件</TableHead>
                <TableHead className="w-32 border-b">处置人员</TableHead>
                <TableHead className="!sticky !right-0 bg-slate-50 z-50 shadow-[-4px_0_10px_-3px_rgba(0,0,0,0.1)] text-center w-32 border-b border-l">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id} className="group">
                  <TableCell className="font-medium whitespace-nowrap">{item.name}</TableCell>
                  <TableCell className="text-indigo-600 font-mono text-xs whitespace-nowrap">{item.code}</TableCell>
                  <TableCell className="text-slate-500 whitespace-nowrap">{item.time}</TableCell>
                  <TableCell className="whitespace-nowrap">{item.relic}</TableCell>
                  <TableCell className="text-orange-600 text-xs whitespace-nowrap">{item.condition}</TableCell>
                  <TableCell className="whitespace-nowrap">{item.processor}</TableCell>
                  <TableCell className="!sticky !right-0 bg-white z-40 shadow-[-4px_0_10px_-3px_rgba(0,0,0,0.1)] group-hover:bg-slate-50 transition-colors border-l whitespace-nowrap">
                    <div className="flex items-center gap-2 px-2 justify-center">
                      <Button variant="ghost" size="sm" className="text-blue-600 h-8 px-2" onClick={() => onDetail(item)}><Eye className="w-3.5 h-3.5 mr-1" />详情</Button>
                      <Button variant="ghost" size="sm" className="text-red-600 h-8 px-2" onClick={() => setDeleteItem(item)}><Trash2 className="w-3.5 h-3.5 mr-1" />删除</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <AlertDialog open={!!deleteItem} onOpenChange={() => setDeleteItem(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除告警记录？</AlertDialogTitle>
            <AlertDialogDescription>确认删除该条告警处置记录吗？此操作不可撤销。</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={() => { showSuccess("记录已删除"); setDeleteItem(null); }}>确认删除</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AlarmProcessingList;