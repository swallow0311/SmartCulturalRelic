"use client";

import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Eye, Trash2, PlusCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { showSuccess } from "@/utils/toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface RecordListProps {
  onAdd: () => void;
  onDetail: (data: any) => void;
  onAddDetail: (record: any) => void;
}

const RecordList = ({ onAdd, onDetail, onAddDetail }: RecordListProps) => {
  const [deleteItem, setDeleteItem] = useState<any>(null);
  
  const data = [
    { id: '1', name: '故宫太和殿屋顶修缮项目', progress: 65, startTime: '2023-05-20', expectedEnd: '2023-12-30', dept: '古建一队', manager: '张三' },
    { id: '2', name: '天坛祈年殿彩画修复项目', progress: 30, startTime: '2023-09-15', expectedEnd: '2024-03-15', dept: '彩画修复组', manager: '李四' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border shadow-sm">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input className="pl-9 h-9" placeholder="项目名称 / 责任人" />
          </div>
          <Button variant="outline" className="h-9">查询</Button>
        </div>
        <Button onClick={onAdd} className="bg-indigo-600 hover:bg-indigo-700 h-9">
          <Plus className="w-4 h-4 mr-2" /> 录入修缮信息
        </Button>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="min-w-[1200px] border-separate border-spacing-0">
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="border-b">项目名称</TableHead>
                <TableHead className="border-b">责任人</TableHead>
                <TableHead className="border-b">修缮进度</TableHead>
                <TableHead className="!sticky !right-0 bg-slate-50 z-50 shadow-[-4px_0_10px_-3px_rgba(0,0,0,0.1)] text-center border-b border-l whitespace-nowrap w-1">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id} className="group">
                  <TableCell className="font-medium whitespace-nowrap">{item.name}</TableCell>
                  <TableCell className="whitespace-nowrap">{item.manager}</TableCell>
                  <TableCell className="whitespace-nowrap w-48">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[10px] font-medium">
                        <span>{item.progress}%</span>
                      </div>
                      <Progress value={item.progress} className="h-1.5" />
                    </div>
                  </TableCell>
                  <TableCell className="!sticky !right-0 bg-white z-40 shadow-[-4px_0_10px_-3px_rgba(0,0,0,0.1)] group-hover:bg-slate-50 transition-colors border-l whitespace-nowrap w-1">
                    <div className="flex items-center justify-center gap-2 px-4">
                      <Button variant="ghost" size="sm" className="text-indigo-600 h-8 px-2" onClick={() => onAddDetail(item)}>
                        <PlusCircle className="w-3.5 h-3.5 mr-1" /> +记录
                      </Button>
                      <Button variant="ghost" size="sm" className="text-blue-600 h-8 px-2" onClick={() => onDetail(item)}>
                        <Eye className="w-3.5 h-3.5 mr-1" /> 详情
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 h-8 px-2" onClick={() => setDeleteItem(item)}>
                        <Trash2 className="w-3.5 h-3.5 mr-1" /> 删除
                      </Button>
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
            <AlertDialogTitle>确认删除修缮记录？</AlertDialogTitle>
            <AlertDialogDescription>确认删除《{deleteItem?.name}》的修缮信息及关联进度吗？此操作无法恢复。</AlertDialogDescription>
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

export default RecordList;