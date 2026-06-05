"use client";

import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, UserPlus, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import DeptTree from './DeptTree';
import { showSuccess } from "@/utils/toast";

interface UserListProps {
  onAdd: () => void;
  onEdit: (user: any) => void;
}

const UserList = ({ onAdd, onEdit }: UserListProps) => {
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const data = [
    { id: '1', username: 'admin', name: '系统管理员', role: '超级管理员', dept: '技术部', status: true, lastLogin: '2023-11-15 10:20' },
    { id: '2', username: 'zhangsan', name: '张三', role: '文保专员', dept: '档案科', status: true, lastLogin: '2023-11-14 15:45' },
    { id: '3', username: 'lisi', name: '李四', role: '审核员', dept: '管理处', status: false, lastLogin: '2023-11-10 09:00' },
  ];

  const handleResetPassword = (user: any) => {
    setSelectedUser(user);
    setIsResetPasswordOpen(true);
  };

  return (
    <div className="flex gap-6 h-[calc(100vh-240px)]">
      {/* 左侧组织架构 */}
      <DeptTree />

      {/* 右侧用户列表 */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border shadow-sm">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input className="pl-9 h-9" placeholder="搜索用户名 / 姓名" />
            </div>
            <Button variant="outline" className="h-9">查询</Button>
          </div>
          <Button onClick={onAdd} className="bg-indigo-600 hover:bg-indigo-700 h-9">
            <UserPlus className="w-4 h-4 mr-2" /> 新增用户
          </Button>
        </div>

        <div className="bg-white rounded-xl border shadow-sm overflow-hidden flex-1">
          <div className="overflow-x-auto h-full">
            <Table className="min-w-[1000px] border-separate border-spacing-0">
              <TableHeader className="bg-slate-50">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="border-b whitespace-nowrap">用户名</TableHead>
                  <TableHead className="border-b whitespace-nowrap">姓名</TableHead>
                  <TableHead className="border-b whitespace-nowrap">所属角色</TableHead>
                  <TableHead className="border-b whitespace-nowrap">部门</TableHead>
                  <TableHead className="border-b whitespace-nowrap">状态</TableHead>
                  <TableHead className="border-b whitespace-nowrap">最后登录</TableHead>
                  <TableHead className="!sticky !right-0 bg-slate-50 z-50 shadow-[-4px_0_10px_-3px_rgba(0,0,0,0.1)] text-center border-b border-l whitespace-nowrap w-1">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((user) => (
                  <TableRow key={user.id} className="group">
                    <TableCell className="font-mono text-xs font-bold whitespace-nowrap">{user.username}</TableCell>
                    <TableCell className="whitespace-nowrap">{user.name}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 border-indigo-100">
                        <Shield className="w-3 h-3 mr-1" /> {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">{user.dept}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      <Switch checked={user.status} />
                    </TableCell>
                    <TableCell className="text-slate-500 text-xs whitespace-nowrap">{user.lastLogin}</TableCell>
                    <TableCell className="!sticky !right-0 bg-white z-40 shadow-[-4px_0_10px_-3px_rgba(0,0,0,0.1)] group-hover:bg-slate-50 transition-colors border-l whitespace-nowrap w-1">
                      <div className="flex items-center gap-2 px-4 justify-center">
                        <Button variant="ghost" size="sm" className="text-blue-600 h-8 px-2" onClick={() => onEdit(user)}>编辑</Button>
                        <Button variant="ghost" size="sm" className="text-red-600 h-8 px-2" onClick={() => handleResetPassword(user)}>重置密码</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* 重置密码弹窗 */}
      <Dialog open={isResetPasswordOpen} onOpenChange={setIsResetPasswordOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>重置密码</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">姓名:</Label>
              <Input value={selectedUser?.name || ""} disabled className="col-span-3 bg-slate-50" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">账号:</Label>
              <Input value={selectedUser?.username || ""} disabled className="col-span-3 bg-slate-50" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right"><span className="text-red-500 mr-1">*</span>新密码:</Label>
              <Input type="password" placeholder="请输入新密码" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right"><span className="text-red-500 mr-1">*</span>确认密码:</Label>
              <Input type="password" placeholder="请再次输入新密码" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsResetPasswordOpen(false)}>取消</Button>
            <Button onClick={() => { showSuccess("密码重置成功"); setIsResetPasswordOpen(false); }}>确定</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserList;