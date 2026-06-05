"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { showSuccess } from "@/utils/toast";

interface ApiFormProps {
  onBack: () => void;
}

const ApiForm = ({ onBack }: ApiFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess("接口配置已保存，正在尝试连接...");
    onBack();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col min-h-full">
      <div className="flex-1 space-y-6 pb-24">
        <Card className="border-none shadow-sm">
          <CardHeader className="bg-slate-50/50 border-b">
            <CardTitle className="text-base">接口配置</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">接口名称</Label>
                <Input required placeholder="如：气象数据同步" />
              </div>
              <div className="space-y-2">
                <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">请求方式</Label>
                <Select required defaultValue="GET">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GET">GET</SelectItem>
                    <SelectItem value="POST">POST</SelectItem>
                    <SelectItem value="PUT">PUT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">接口地址 (Endpoint)</Label>
              <Input required placeholder="https://api.example.com/v1/data" className="font-mono" />
            </div>
            <div className="space-y-2">
              <Label>认证令牌 (Token/Key)</Label>
              <Input type="password" placeholder="请输入 API Key 或 Bearer Token" />
            </div>
            <div className="space-y-2">
              <Label>请求头配置 (JSON)</Label>
              <Textarea placeholder='{ "Content-Type": "application/json" }' className="font-mono" />
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

export default ApiForm;