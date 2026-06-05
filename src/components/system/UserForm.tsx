"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Phone, ShieldCheck, Mail, MessageSquare, AtSign, Info } from "lucide-react";
import { showSuccess } from "@/utils/toast";

interface UserFormProps {
  onBack: () => void;
  initialData?: any;
}

const UserForm = ({ onBack, initialData }: UserFormProps) => {
  const [smsSent, setSmsSent] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const isEdit = !!initialData;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess(isEdit ? "用户信息更新成功" : "用户创建成功");
    onBack();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col min-h-full">
      <div className="flex-1 space-y-8 pb-24">
        <Card className="border-none shadow-sm">
          <CardHeader className="bg-slate-50/50 border-b">
            <CardTitle className="text-base flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600" /> {isEdit ? '编辑用户' : '基本信息'}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            <div className="space-y-2">
              <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">姓名</Label>
              <Input required placeholder="请输入真实姓名" defaultValue={initialData?.name} />
            </div>
            <div className="space-y-2">
              <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">账号</Label>
              <Input required placeholder="请输入登录账号" defaultValue={initialData?.username} disabled={isEdit} className={isEdit ? "bg-slate-50" : ""} />
            </div>
            <div className="space-y-2">
              <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">所属部门</Label>
              <Select required defaultValue={initialData?.dept === '技术部' ? 'dept2' : 'dept1'}>
                <SelectTrigger>
                  <SelectValue placeholder="请选择部门" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dept1">测试部门</SelectItem>
                  <SelectItem value="dept2">开发部门1</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">角色</Label>
              <Select required defaultValue={initialData?.role === '超级管理员' ? 'admin' : 'archive'}>
                <SelectTrigger>
                  <SelectValue placeholder="请选择角色" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">超级管理员</SelectItem>
                  <SelectItem value="archive">文保专员</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="bg-slate-50/50 border-b">
            <CardTitle className="text-base flex items-center gap-2">
              <Phone className="w-4 h-4 text-green-600" /> 联系方式
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-6">
            <div className="space-y-2">
              <Label>手机</Label>
              <Input placeholder="请输入手机号" />
            </div>
            <div className="space-y-2">
              <Label>微信</Label>
              <Input placeholder="请输入微信号" />
            </div>
            <div className="space-y-2">
              <Label>QQ</Label>
              <Input placeholder="请输入QQ号" />
            </div>
            <div className="space-y-2">
              <Label>邮箱</Label>
              <Input type="email" placeholder="请输入常用邮箱" />
            </div>
          </CardContent>
        </Card>

        {!isEdit && (
          <Card className="border-none shadow-sm">
            <CardHeader className="bg-slate-50/50 border-b flex flex-row items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-orange-600" /> 安全设置
              </CardTitle>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                <Info className="w-3.5 h-3.5 text-blue-500" />
                可通过验证的手机/邮箱登录系统
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">密码</Label>
                  <Input required type="password" placeholder="请输入登录密码" />
                </div>
                <div className="space-y-2">
                  <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">确认密码</Label>
                  <Input required type="password" placeholder="请再次输入密码" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <MessageSquare className="w-4 h-4 text-blue-500" /> 登录手机验证
                  </div>
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs">登录手机号</Label>
                      <Input className="h-9" placeholder="用于接收验证码" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">短信验证码</Label>
                      <div className="flex gap-2">
                        <Input className="h-9" placeholder="6位验证码" />
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="h-9 shrink-0"
                          onClick={() => { setSmsSent(true); showSuccess("验证码已发送至手机"); }}
                        >
                          {smsSent ? "重新发送" : "获取验证码"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <AtSign className="w-4 h-4 text-purple-500" /> 登录邮箱验证
                  </div>
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs">登录邮箱</Label>
                      <Input className="h-9" placeholder="用于接收验证邮件" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">邮箱验证码</Label>
                      <div className="flex gap-2">
                        <Input className="h-9" placeholder="6位验证码" />
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="h-9 shrink-0"
                          onClick={() => { setEmailSent(true); showSuccess("验证码已发送至邮箱"); }}
                        >
                          {emailSent ? "重新发送" : "获取验证码"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="sticky bottom-0 -mx-8 bg-white border-t p-4 px-8 flex justify-start gap-3 z-30 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 px-8">确定</Button>
        <Button type="button" variant="outline" onClick={onBack} className="px-8">取消</Button>
      </div>
    </form>
  );
};

export default UserForm;