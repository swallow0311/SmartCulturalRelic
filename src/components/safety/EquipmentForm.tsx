"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showSuccess } from "@/utils/toast";
import { Shield, Settings, Zap } from "lucide-react";

interface EquipmentFormProps {
  onBack: () => void;
}

const EquipmentForm = ({ onBack }: EquipmentFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess("设备台账保存成功");
    onBack();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col min-h-full">
      <div className="flex-1 space-y-8 pb-24">
        <Card className="border-none shadow-sm">
          <CardHeader className="bg-slate-50/50 border-b">
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="w-4 h-4 text-indigo-600" /> 基础信息
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-6">
            <div className="space-y-2">
              <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">设备编码</Label>
              <Input required placeholder="请输入设备编码" />
            </div>
            <div className="space-y-2">
              <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">设备名称</Label>
              <Input required placeholder="请输入设备名称" />
            </div>
            <div className="space-y-2">
              <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">IMEI唯一标识</Label>
              <Input required placeholder="请输入IMEI标识" />
            </div>
            <div className="space-y-2">
              <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">时间</Label>
              <Input required type="date" />
            </div>
            <div className="space-y-2">
              <Label>产品参数</Label>
              <Input placeholder="如：DC 12V" />
            </div>
            <div className="space-y-2">
              <Label>厂家</Label>
              <Input placeholder="请输入厂家名称" />
            </div>
            <div className="space-y-2">
              <Label>型号</Label>
              <Input placeholder="请输入设备型号" />
            </div>
            <div className="space-y-2">
              <Label>地址</Label>
              <Input placeholder="请输入安装详细地址" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="bg-slate-50/50 border-b">
            <CardTitle className="text-base flex items-center gap-2">
              <Settings className="w-4 h-4 text-orange-600" /> 阈值设置
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-5 gap-6 pt-6">
            <div className="space-y-2">
              <Label>报警阈值</Label>
              <Input placeholder="如：50%" />
            </div>
            <div className="space-y-2">
              <Label>烟火阈值</Label>
              <Input placeholder="如：30%" />
            </div>
            <div className="space-y-2">
              <Label>防倾斜阈值</Label>
              <Input placeholder="如：15°" />
            </div>
            <div className="space-y-2">
              <Label>温度阈值</Label>
              <Input placeholder="如：60℃" />
            </div>
            <div className="space-y-2">
              <Label>湿度阈值</Label>
              <Input placeholder="如：80%" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="bg-slate-50/50 border-b">
            <CardTitle className="text-base flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-600" /> AI预警
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="space-y-2">
              <Label>灵敏度</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="请选择灵敏度" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">高</SelectItem>
                  <SelectItem value="medium">中</SelectItem>
                  <SelectItem value="low">低</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>事件报警时限</Label>
              <Input placeholder="如：5s" />
            </div>
            <div className="space-y-2">
              <Label>频率</Label>
              <Input placeholder="如：1min" />
            </div>
            <div className="space-y-2">
              <Label>区域</Label>
              <Input placeholder="请输入预警区域" />
            </div>
            <div className="space-y-2">
              <Label>预警方式</Label>
              <Input placeholder="如：短信/APP推送" />
            </div>
            <div className="space-y-2">
              <Label>预警对象</Label>
              <Input placeholder="请输入预警接收人/部门" />
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

export default EquipmentForm;