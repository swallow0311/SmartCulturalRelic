"use client";

import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, ChevronDown, ChevronUp, Edit, Trash2, History, Eye } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { showSuccess } from "@/utils/toast";

interface SchemeListProps {
  onAdd: () => void;
  onEdit: (data: any) => void;
  onDetail: (data: any) => void;
  onAddVersion: (scheme: any) => void;
}

const SchemeList = ({ onAdd, onEdit, onDetail, onAddVersion }: SchemeListProps) => {
  const [showMoreSearch, setShowMoreSearch] = useState(false);
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [deleteItem, setDeleteItem] = useState<any>(null);

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const data = [
    { 
      id: '1', 
      name: '故宫太和殿屋顶修缮方案', 
      type: '抢救性修复', 
      relic: '太和殿', 
      urgency: '特急', 
      compiler: '张工', 
      leader: '李队', 
      status: '已通过', 
      creator: '管理员', 
      createTime: '2023-10-12 14:30',
      versions: [
        { id: 'v1', versionNo: 'V1.2', route: '传统工艺修缮', materials: '琉璃瓦、糯米浆', tools: '脚手架、瓦刀', desc: '针对屋顶漏雨进行整体修缮', img: 'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?w=200' }
      ]
    },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-xl border shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input className="pl-9 h-9" placeholder="方案名称" />
            </div>
            <Button variant="default" className="bg-indigo-600 hover:bg-indigo-700 h-9">查询</Button>
          </div>
          <Button onClick={onAdd} className="bg-indigo-600 hover:bg-indigo-700 h-9">
            <Plus className="w-4 h-4 mr-2" /> 新增方案
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="min-w-[1400px] border-separate border-spacing-0">
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="w-12 border-b"></TableHead>
                <TableHead className="w-64 border-b">方案名称</TableHead>
                <TableHead className="w-32 border-b">方案类型</TableHead>
                <TableHead className="w-32 border-b">方案状态</TableHead>
                <TableHead className="!sticky !right-0 bg-slate-50 z-50 shadow-[-4px_0_10px_-3px_rgba(0,0,0,0.1)] text-center border-b border-l whitespace-nowrap w-1">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <React.Fragment key={item.id}>
                  <TableRow className="group">
                    <TableCell className="border-b">
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => toggleExpand(item.id)}>
                        {expandedIds.includes(item.id) ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium border-b">{item.name}</TableCell>
                    <TableCell className="border-b">{item.type}</TableCell>
                    <TableCell className="border-b">
                      <Badge className="bg-green-50 text-green-700 border-green-200">{item.status}</Badge>
                    </TableCell>
                    <TableCell className="!sticky !right-0 bg-white z-40 shadow-[-4px_0_10px_-3px_rgba(0,0,0,0.1)] group-hover:bg-slate-50 transition-colors border-l whitespace-nowrap w-1">
                      <div className="flex items-center gap-2 px-2 justify-center">
                        <Button variant="ghost" size="sm" className="text-blue-600 h-8 px-2" onClick={() => onDetail(item)}><Eye className="w-3.5 h-3.5 mr-1" />详情</Button>
                        <Button variant="ghost" size="sm" className="text-slate-600 h-8 px-2" onClick={() => onEdit(item)}><Edit className="w-3.5 h-3.5 mr-1" />编辑</Button>
                        <Button variant="ghost" size="sm" className="text-red-600 h-8 px-2" onClick={() => setDeleteItem(item)}><Trash2 className="w-3.5 h-3.5 mr-1" />删除</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  {/* 版本展开行省略... */}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <AlertDialog open={!!deleteItem} onOpenChange={() => setDeleteItem(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除修缮方案？</AlertDialogTitle>
            <AlertDialogDescription>确认删除方案《{deleteItem?.name}》及其所有历史版本吗？</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={() => { showSuccess("方案已删除"); setDeleteItem(null); }}>确认删除</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SchemeList;