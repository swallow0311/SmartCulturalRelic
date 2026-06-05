"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { showSuccess } from "@/utils/toast";

interface TextVolumeFormProps {
  onBack: () => void;
  isReadOnly?: boolean;
  initialData?: any;
}

const TextVolumeForm = ({ onBack, isReadOnly, initialData }: TextVolumeFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isReadOnly) return;
    showSuccess("保存成功");
    onBack();
  };

  const inputClass = isReadOnly ? "bg-slate-50 border-transparent focus-visible:ring-0 cursor-default" : "";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col min-h-full">
      <div className="flex-1 space-y-8 pb-24">
        <Card className="border-none shadow-sm">
          <CardHeader className="border-b bg-slate-50/50"><CardTitle className="text-base">基本信息</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="space-y-2">
              <Label>公布名称</Label>
              <Input required className={inputClass} readOnly={isReadOnly} defaultValue={initialData?.name} placeholder="请输入公布名称" />
            </div>
            <div className="space-y-2">
              <Label>代码</Label>
              <Input required className={inputClass} readOnly={isReadOnly} defaultValue={initialData?.code} placeholder="请输入代码" />
            </div>
            <div className="space-y-2">
              <Label>公布时代</Label>
              <Input required className={inputClass} readOnly={isReadOnly} placeholder="如：明代" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="border-b bg-slate-50/50"><CardTitle className="text-base">保护与评估</CardTitle></CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2"><Label>价值评估</Label><Textarea className={inputClass} readOnly={isReadOnly} placeholder="历史、艺术、科学价值" /></div>
              <div className="space-y-2"><Label>保存现状</Label><Textarea className={inputClass} readOnly={isReadOnly} placeholder="当前完好程度描述" /></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="sticky bottom-0 -mx-8 bg-white border-t p-4 px-8 flex justify-start gap-3 z-30 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
        {!isReadOnly && <Button type="submit" className="bg-blue-600 hover:bg-blue-700 px-8">确定</Button>}
        <Button type="button" variant={isReadOnly ? "default" : "outline"} onClick={onBack} className="px-8">{isReadOnly ? "返回列表" : "取消"}</Button>
      </div>
    </form>
  );
};

export default TextVolumeForm;