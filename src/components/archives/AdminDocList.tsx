"use client";

import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { showSuccess } from "@/utils/toast";

interface AdminDocListProps {
  onAdd: () => void;
  onEdit: (data: any) => void;
  onDetail: (data: any) => void;
}

const AdminDocList = ({ onAdd, onEdit, onDetail }: AdminDocListProps) => {
  const [deleteItem, setDeleteItem] = useState<any>(null);
  const data = [
    { id: '1', title: '关于加强文物保护的通知', type: '通知', code: '文保发〔2023〕1号', unit: '国家文物局', creator: '管理员', time: '2023-10-12' },
    { id: '2', title: '专项资金管理办法', type: '专项法规', code: '财教〔2023〕15号', unit: '财政部', creator: '管理员', time: '2023-11-05' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-lg border">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input className="pl-9 h-9" placeholder="文件标题" />
          </div>
          <Button variant="outline" className="h-9">查询</Button>
        </div>
        <Button onClick={onAdd} className="bg-blue-600 hover:bg-blue-700 h-9"><Plus className="w-4 h-4 mr-2" /> 新增</Button>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="min-w-[1200px] border-separate border-spacing-0">
            <TableHeader className="bg-slate-50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="border-b whitespace-nowrap">文件标题</TableHead>
                <TableHead className="border-b whitespace-nowrap">文件类型</TableHead>
                <TableHead className="border-b whitespace-nowrap">文号</TableHead>
                <TableHead className="border-b whitespace-nowrap">发文单位</TableHead>
                <TableHead className="border-b whitespace-nowrap">添加人</TableHead>
                <TableHead className="border-b whitespace-nowrap">添加时间</TableHead>
                <TableHead className="!sticky !right-0 bg-slate-50 z-50 shadow-[-4px_0_10px_-3px_rgba(0,0,0,0.1)] text-center border-b border-l whitespace-nowrap w-1">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id} className="group">
                  <TableCell className="font-medium whitespace-nowrap">{item.title}</TableCell>
                  <TableCell className="whitespace-nowrap">{item.type}</TableCell>
                  <TableCell className="whitespace-nowrap">{item.code}</TableCell>
                  <TableCell className="whitespace-nowrap">{item.unit}</TableCell>
                  <TableCell className="whitespace-nowrap">{item.creator}</TableCell>
                  <TableCell className="text-slate-500 whitespace-nowrap">{item.time}</TableCell>
                  <TableCell className="!sticky !right-0 bg-white z-40 shadow-[-4px_0_10px_-3px_rgba(0,0,0,0.1)] group-hover:bg-slate-50 transition-colors border-l whitespace-nowrap w-1">
                    <div className="flex items-center gap-2 px-4 justify-center">
                      <Button variant="ghost" size="sm" className="text-blue-600 h-8 px-2" onClick={() => onDetail(item)}>详情</Button>
                      <Button variant="ghost" size="sm" className="text-slate-600 h-8 px-2" onClick={() => onEdit(item)}>编辑</Button>
                      <Button variant="ghost" size="sm" className="text-red-600 h-8 px-2" onClick={() => setDeleteItem(item)}>删除</Button>
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
          <AlertDialogHeader><AlertDialogTitle>确认删除？</AlertDialogTitle><AlertDialogDescription>数据删除后将无法恢复，请确认是否删除“{deleteItem?.title}”？</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={() => { showSuccess("删除成功"); setDeleteItem(null); }}>确认删除</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminDocList;