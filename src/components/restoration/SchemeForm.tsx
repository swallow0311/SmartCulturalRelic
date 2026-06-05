"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Info, PenTool, Users, AlertTriangle } from "lucide-react";
import { showSuccess } from "@/utils/toast";

interface SchemeFormProps {
  onBack: () => void;
  initialData?: any;
  isVersionMode?: boolean;
}

const SchemeForm = ({ onBack, initialData, isVersionMode = false }: SchemeFormProps) => {
  const handleAction = (action: string) => {
    showSuccess(`${action}成功`);
    onBack();
  };

  return (
    <form className="flex flex-col min-h-full">
      <div className="flex-1 space-y-8 pb-24">
        <Card className="border-none shadow-sm">
          <CardHeader className="bg-slate-50/50 border-b">
            <CardTitle className="text-base flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-600" /> 基本信息
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="space-y-2 md:col-span-2">
              <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">方案名称</Label>
              <Input 
                required 
                placeholder="请输入方案名称" 
                defaultValue={initialData?.name} 
                readOnly={isVersionMode}
                className={isVersionMode ? "bg-slate-50" : ""}
              />
            </div>
            <div className="space-y-2">
              <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">方案类型</Label>
              <Select required disabled={isVersionMode} defaultValue={initialData?.type}>
                <SelectTrigger className={isVersionMode ? "bg-slate-50" : ""}>
                  <SelectValue placeholder="请选择方案类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">日常保养</SelectItem>
                  <SelectItem value="rescue">抢救性修复</SelectItem>
                  <SelectItem value="prevent">预防性保护</SelectItem>
                  <SelectItem value="research">研究性修复</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">关联文物</Label>
              <Input 
                required 
                placeholder="请输入关联文物" 
                defaultValue={initialData?.relic} 
                readOnly={isVersionMode}
                className={isVersionMode ? "bg-slate-50" : ""}
              />
            </div>
            <div className="space-y-2">
              <Label>版本号</Label>
              <Input 
                placeholder="如：V1.0" 
                defaultValue={isVersionMode ? "V1.3" : "V1.0"} 
                className="font-mono"
              />
            </div>
            <div className="space-y-2">
              <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">紧急度</Label>
              <Select required disabled={isVersionMode} defaultValue={initialData?.urgency}>
                <SelectTrigger className={isVersionMode ? "bg-slate-50" : ""}>
                  <SelectValue placeholder="请选择紧急度" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">一般</SelectItem>
                  <SelectItem value="urgent">紧急</SelectItem>
                  <SelectItem value="critical">特急</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="bg-slate-50/50 border-b">
            <CardTitle className="text-base flex items-center gap-2">
              <PenTool className="w-4 h-4 text-indigo-600" /> 方案设计
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            <div className="space-y-2">
              <Label>技术路线</Label>
              <Textarea placeholder="描述修缮的技术路径与工艺" className="min-h-[80px]" />
            </div>
            <div className="space-y-2">
              <Label>材料清单</Label>
              <Textarea placeholder="列出所需主要材料及规格" className="min-h-[80px]" />
            </div>
            <div className="space-y-2">
              <Label>工具设备</Label>
              <Textarea placeholder="列出所需施工工具与监测设备" className="min-h-[80px]" />
            </div>
            <div className="space-y-2">
              <Label>方案说明</Label>
              <Textarea placeholder="对方案进行整体补充说明" className="min-h-[80px]" />
            </div>
            <div className="space-y-2">
              <Label>时间安排</Label>
              <Textarea placeholder="描述各阶段工期计划" className="min-h-[80px]" />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                风险评估 <AlertTriangle className="w-3 h-3 text-orange-500" />
              </Label>
              <Textarea placeholder="识别潜在风险及应对措施" className="min-h-[80px]" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>方案效果图</Label>
              <div className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-slate-400 mb-2" />
                <span className="text-sm font-medium">点击或拖拽上传效果图</span>
                <span className="text-xs text-slate-400 mt-1">支持 JPG, PNG 格式</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="bg-slate-50/50 border-b">
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="w-4 h-4 text-green-600" /> 人员信息
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            <div className="space-y-2">
              <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">编制人</Label>
              <Input required placeholder="请输入编制人姓名" />
            </div>
            <div className="space-y-2">
              <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">实施负责人</Label>
              <Input required placeholder="请输入实施负责人姓名" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="sticky bottom-0 -mx-8 bg-white border-t p-4 px-8 flex justify-start gap-3 z-30 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
        <Button type="button" className="bg-blue-600 hover:bg-blue-700 px-8" onClick={() => handleAction("提交审核")}>确定</Button>
        <Button type="button" variant="secondary" onClick={() => handleAction("保存草稿")} className="px-8">保存草稿</Button>
        <Button type="button" variant="outline" onClick={onBack} className="px-8">取消</Button>
      </div>
    </form>
  );
};

export default SchemeForm;