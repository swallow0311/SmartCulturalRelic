"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { showSuccess } from "@/utils/toast";

interface RoleFormProps {
  onBack: () => void;
}

const RoleForm = ({ onBack }: RoleFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess("角色定义成功，请继续配置权限");
    onBack();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col min-h-full">
      <div className="flex-1 space-y-6 pb-24">
        <Card className="border-none shadow-sm">
          <CardHeader className="bg-slate-50/50 border-b">
            <CardTitle className="text-base">角色定义</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">角色名称</Label>
                <Input required placeholder="如：文保专家" />
              </div>
              <div className="space-y-2">
                <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">角色编码</Label>
                <Input required placeholder="如：ROLE_EXPERT" className="font-mono" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>角色描述</Label>
              <Textarea placeholder="简述该角色的职责范围与权限级别" />
            </div>
            <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg text-amber-800 text-sm">
              提示：角色创建后，您需要在列表页点击“权限配置”来为该角色分配具体的菜单与操作权限。
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="sticky bottom-0 -mx-8 bg-white border-t p-4 px-8 flex justify-start gap-3 z-30 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 px-8">确定</Button>
        <Button type="button" variant="outline" onClick={onBack} className="px-8">取消</Button>
      </div>
    </form>
  );
};

export default RoleForm;