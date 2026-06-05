"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Plus, Edit2, Trash2, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { showSuccess } from "@/utils/toast";

interface DeptNode {
  id: string;
  name: string;
  count: number;
  parentId?: string;
  children?: DeptNode[];
}

const INITIAL_DEPTS: DeptNode[] = [
  {
    id: '1',
    name: '测试部门',
    count: 169,
    children: [
      { id: '1-1', name: '在线测试组', count: 8, parentId: '1' },
      { id: '1-2', name: 'SCRM测试组', count: 4, parentId: '1' },
    ]
  },
  {
    id: '2',
    name: '开发部门1',
    count: 16,
    children: [
      { id: '2-1', name: '开发组1', count: 5, parentId: '2' },
      { id: '2-2', name: '在线客服开发', count: 5, parentId: '2' },
      { id: '2-3', name: '开发组2', count: 3, parentId: '2' },
    ]
  }
];

const DeptTree = () => {
  const [expandedIds, setExpandedIds] = useState<string[]>(['1', '2']);
  const [selectedId, setSelectedId] = useState<string>('1');
  
  // 弹窗状态
  const [isDeptDialogOpen, setIsDeptDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const [currentDept, setCurrentDept] = useState<DeptNode | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleAdd = () => {
    setDialogMode('add');
    setCurrentDept(null);
    setIsDeptDialogOpen(true);
  };

  const handleEdit = (dept: DeptNode) => {
    setDialogMode('edit');
    setCurrentDept(dept);
    setIsDeptDialogOpen(true);
  };

  const handleDelete = (dept: DeptNode) => {
    setCurrentDept(dept);
    setIsDeleteDialogOpen(true);
  };

  const renderNode = (node: DeptNode, depth = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedIds.includes(node.id);
    const isSelected = selectedId === node.id;

    return (
      <div key={node.id} className="group">
        <div 
          className={cn(
            "flex items-center py-2 px-2 rounded-md cursor-pointer transition-colors",
            isSelected ? "bg-blue-50 text-blue-600" : "hover:bg-slate-50 text-slate-600"
          )}
          onClick={() => setSelectedId(node.id)}
        >
          <div className="flex items-center flex-1 min-w-0">
            {hasChildren ? (
              <button 
                onClick={(e) => { e.stopPropagation(); toggleExpand(node.id); }}
                className="p-0.5 hover:bg-slate-200 rounded mr-1"
              >
                {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>
            ) : (
              <div className="w-5" />
            )}
            <span className="text-sm truncate">{node.name}({node.count})</span>
          </div>
          
          <div className={cn(
            "flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity",
            isSelected && "opacity-100"
          )}>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 text-slate-400 hover:text-blue-600"
              onClick={(e) => { e.stopPropagation(); handleEdit(node); }}
            >
              <Edit2 size={12} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 text-slate-400 hover:text-red-600"
              onClick={(e) => { e.stopPropagation(); handleDelete(node); }}
            >
              <Trash2 size={12} />
            </Button>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className="ml-4 mt-1 border-l border-slate-100">
            {node.children?.map(child => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-64 bg-white border rounded-xl shadow-sm flex flex-col h-full">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <Users size={16} className="text-blue-600" /> 组织架构
        </h3>
        <Button 
          variant="link" 
          className="text-blue-600 text-xs p-0 h-auto font-bold"
          onClick={handleAdd}
        >
          添加部门
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {INITIAL_DEPTS.map(dept => renderNode(dept))}
      </div>

      {/* 新增/编辑部门弹窗 */}
      <Dialog open={isDeptDialogOpen} onOpenChange={setIsDeptDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{dialogMode === 'add' ? '新增部门' : '编辑部门'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="parent" className="text-right">
                <span className="text-red-500 mr-1">*</span>上级部门:
              </Label>
              <div className="col-span-3">
                <Select 
                  defaultValue={currentDept?.parentId || "top"} 
                  disabled={dialogMode === 'edit' && !currentDept?.parentId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择上级部门" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="top">顶级部门</SelectItem>
                    <SelectItem value="1">测试部门</SelectItem>
                    <SelectItem value="2">开发部门1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                <span className="text-red-500 mr-1">*</span>部门名称:
              </Label>
              <Input
                id="name"
                defaultValue={currentDept?.name || ""}
                placeholder="不超过20个字符"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeptDialogOpen(false)}>取消</Button>
            <Button onClick={() => { showSuccess("保存成功"); setIsDeptDialogOpen(false); }}>确定</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 删除确认框 */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除部门？</AlertDialogTitle>
            <AlertDialogDescription>
              删除部门“{currentDept?.name}”后，该操作无法撤销，请谨慎操作。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={() => { showSuccess("删除成功"); setIsDeleteDialogOpen(false); }}>
              确认删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeptTree;