"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { showSuccess } from "@/utils/toast";

interface DocumentVolumeFormProps {
  type: 'planning' | 'archaeology' | 'monitoring';
  onBack: () => void;
}

const DocumentVolumeForm = ({ type, onBack }: DocumentVolumeFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess("保存成功");
    onBack();
  };

  const renderFields = () => {
    switch (type) {
      case 'planning':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">编制单位</Label>
              <Input required placeholder="请输入编制单位" />
            </div>
            <div className="space-y-2">
              <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">题名</Label>
              <Input required placeholder="请输入题名" />
            </div>
            <div className="space-y-2">
              <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">编制时间</Label>
              <Input required type="date" />
            </div>
            <div className="space-y-2">
              <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">批准单位</Label>
              <Input required placeholder="请输入批准单位" />
            </div>
            <div className="space-y-2">
              <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">批准时间</Label>
              <Input required type="date" />
            </div>
          </div>
        );
      case 'archaeology':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">承担单位</Label>
              <Input required placeholder="请输入承担单位" />
            </div>
            <div className="space-y-2">
              <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">题名</Label>
              <Input required placeholder="请输入题名" />
            </div>
            <div className="space-y-2">
              <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">时间</Label>
              <Input required type="date" />
            </div>
            <div className="space-y-2">
              <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">张数</Label>
              <Input required type="number" placeholder="请输入张数" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>备注</Label>
              <Textarea placeholder="请输入备注信息" />
            </div>
          </div>
        );
      case 'monitoring':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">卷名称</Label>
              <Input required placeholder="请输入卷名称" />
            </div>
            <div className="space-y-2">
              <Label>保护工程</Label>
              <Textarea placeholder="记录保护工程相关内容" />
            </div>
            <div className="space-y-2">
              <Label>防治监测</Label>
              <Textarea placeholder="记录防治监测相关内容" />
            </div>
          </div>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col min-h-full">
      <div className="flex-1 space-y-6 pb-24">
        <Card className="border-none shadow-sm">
          <CardHeader className="border-b bg-slate-50/50">
            <CardTitle className="text-base">基本信息录入</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {renderFields()}
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

export default DocumentVolumeForm;