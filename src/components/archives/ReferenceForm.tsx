"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { showSuccess } from "@/utils/toast";

interface ReferenceFormProps {
  onBack: () => void;
}

const ReferenceForm = ({ onBack }: ReferenceFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess("保存成功");
    onBack();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col min-h-full">
      <div className="flex-1 space-y-6 pb-24">
        <Card className="border-none shadow-sm">
          <CardHeader className="border-b bg-slate-50/50">
            <CardTitle className="text-base">参考资料录入</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            <div className="space-y-2 md:col-span-2">
              <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">文件名称</Label>
              <Input required placeholder="请输入文件名称" />
            </div>
            <div className="space-y-2">
              <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">标注来源</Label>
              <Input required placeholder="请输入标注来源" />
            </div>
            <div className="space-y-2">
              <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">收藏位置</Label>
              <Input required placeholder="请输入收藏位置" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">内容</Label>
              <Textarea required className="min-h-[200px]" placeholder="请输入详细内容" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>说明</Label>
              <Textarea placeholder="请输入相关说明" />
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

export default ReferenceForm;