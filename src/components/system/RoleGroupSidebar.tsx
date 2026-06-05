"use client";

import React, { useState, useEffect } from 'react';
import { Copy, Edit2, Trash2, Plus, Shield, CheckCircle2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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

interface RoleGroup {
  id: string;
  name: string;
  desc?: string;
  isDefault?: boolean;
}

interface RoleGroupSidebarProps {
  onSelect: (role: RoleGroup) => void;
}

const RoleGroupSidebar = ({ onSelect }: RoleGroupSidebarProps) => {
  const [groups, setGroups] = useState<RoleGroup[]>([
    { id: '1', name: '管理员', desc: '拥有系统所有操作权限', isDefault: true },
    { id: '2', name: '技工人员', desc: '负责日常修缮任务执行', isDefault: true },
    { id: '3', name: '安全员', desc: '负责安全监测与告警处理', isDefault: true },
    { id: '4', name: '第三方', desc: '外部合作单位人员' },
    { id: '5', name: '智慧机器人自定义', desc: '自动化巡检机器人权限' },
  ]);
  const [selectedId, setSelectedId] = useState<string>('1');

  // 弹窗状态
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCopyDialogOpen, setIsCopyDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const [currentRole, setCurrentRole] = useState<RoleGroup | null>(null);

  // 默认选中第一个
  useEffect(() => {
    if (groups.length > 0) {
      onSelect(groups[0]);
    }
  }, []);

  const handleSelect = (role: RoleGroup) => {
    setSelectedId(role.id);
    onSelect(role);
  };

  const handleAdd = () => {
    setDialogMode('add');
    setCurrentRole(null);
    setIsRoleDialogOpen(true);
  };

  const handleEdit = (role: RoleGroup) => {
    setDialogMode('edit');
    setCurrentRole(role);
    setIsRoleDialogOpen(true);
  };

  const handleCopy = (role: RoleGroup) => {
    setCurrentRole(role);
    setIsCopyDialogOpen(true);
  };

  const handleDelete = (role: RoleGroup) => {
    setCurrentRole(role);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="w-64 bg-white border rounded-xl shadow-sm flex flex-col h-full">
      <div className="p-4 border-b">
        <Button 
          variant="link" 
          className="w-full text-blue-600 font-bold text-lg hover:no-underline flex items-center justify-center gap-2"
          onClick={handleAdd}
        >
          <Plus size={20} /> 添加角色
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto py-2">
        {groups.map((group) => (
          <div 
            key={group.id}
            className={cn(
              "group relative flex items-center px-4 py-3 cursor-pointer transition-all",
              selectedId === group.id ? "bg-blue-50 text-blue-600" : "hover:bg-slate-50 text-slate-700"
            )}
            onClick={() => handleSelect(group)}
          >
            <span className="text-sm font-medium truncate flex-1">
              {group.name} {group.isDefault && <span className="text-[10px] text-slate-400 ml-1">(默认)</span>}
            </span>
            
            <div className={cn(
              "flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity",
              selectedId === group.id && "opacity-100"
            )}>
              <button className="p-1 hover:text-blue-600" title="复制" onClick={(e) => { e.stopPropagation(); handleCopy(group); }}><Copy size={14} /></button>
              <button className="p-1 hover:text-blue-600" title="编辑" onClick={(e) => { e.stopPropagation(); handleEdit(group); }}><Edit2 size={14} /></button>
              <button className="p-1 hover:text-red-600" title="删除" onClick={(e) => { e.stopPropagation(); handleDelete(group); }}><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>

      {/* 新增/编辑角色弹窗 */}
      <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{dialogMode === 'add' ? '添加角色' : '编辑角色'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="name"><span className="text-red-500 mr-1">*</span>角色名称</Label>
              <Input id="name" defaultValue={currentRole?.name || ""} placeholder="请输入角色名称" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="desc">角色描述</Label>
              <Textarea id="desc" defaultValue={currentRole?.desc || ""} placeholder="请输入角色描述" className="min-h-[100px]" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRoleDialogOpen(false)}>取消</Button>
            <Button onClick={() => { showSuccess("保存成功"); setIsRoleDialogOpen(false); }}>确定</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 复制角色弹窗 */}
      <Dialog open={isCopyDialogOpen} onOpenChange={setIsCopyDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>复制角色</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="copy-name"><span className="text-red-500 mr-1">*</span>角色名称</Label>
              <Input id="copy-name" defaultValue={`复制「${currentRole?.name}」`} placeholder="请输入新角色名称" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCopyDialogOpen(false)}>取消</Button>
            <Button onClick={() => { showSuccess("复制成功"); setIsCopyDialogOpen(false); }}>确定</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 删除确认框 */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除角色？</AlertDialogTitle>
            <AlertDialogDescription>
              删除角色“{currentRole?.name}”后，关联该角色的用户将失去相应权限。此操作无法撤销。
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

export default RoleGroupSidebar;