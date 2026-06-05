"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Camera, Plane } from "lucide-react";
import { showSuccess } from "@/utils/toast";

interface RecordFormProps {
  onBack: () => void;
  initialData?: any;
  isAddRecordMode?: boolean;
}

const RecordForm = ({ onBack, initialData, isAddRecordMode = false }: RecordFormProps) => {
  const [nodes, setNodes] = useState([{ id: '1', time: '', content: '', status: '进行中' }]);

  const addNode = () => {
    setNodes([...nodes, { id: Date.now().toString(), time: '', content: '', status: '待开始' }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess(isAddRecordMode ? "修缮记录已追加" : "修缮信息已保存");
    onBack();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col min-h-full">
      <div className="flex-1 space-y-8 pb-24">
        <Card className="border-none shadow-sm">
          <CardHeader className="bg-slate-50/50 border-b">
            <CardTitle className="text-base">修缮项目概况</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="space-y-2 md:col-span-3">
              <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">项目名称</Label>
              <Input 
                required 
                placeholder="关联已审批的修缮方案" 
                defaultValue={initialData?.name}
                readOnly={isAddRecordMode}
                className={isAddRecordMode ? "bg-slate-50" : ""}
              />
            </div>
            <div className="space-y-2">
              <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">开始时间</Label>
              <Input 
                required 
                type="date" 
                defaultValue={initialData?.startTime}
                readOnly={isAddRecordMode}
                className={isAddRecordMode ? "bg-slate-50" : ""}
              />
            </div>
            <div className="space-y-2">
              <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">预计完成时间</Label>
              <Input 
                required 
                type="date" 
                defaultValue={initialData?.expectedEnd}
                readOnly={isAddRecordMode}
                className={isAddRecordMode ? "bg-slate-50" : ""}
              />
            </div>
            <div className="space-y-2">
              <Label>实际完成时间</Label>
              <Input type="date" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="bg-slate-50/50 border-b flex flex-row items-center justify-between py-3">
            <CardTitle className="text-base">修缮进度时间轴</CardTitle>
            <Button type="button" variant="outline" size="sm" onClick={addNode}>
              <Plus className="w-4 h-4 mr-1" /> 添加节点
            </Button>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {nodes.map((node, index) => (
              <div key={node.id} className="relative pl-8 border-l-2 border-slate-100 pb-6 last:pb-0">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white shadow-sm" />
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-50/50 p-4 rounded-xl">
                  <div className="space-y-2">
                    <Label className="text-xs">节点时间</Label>
                    <Input type="date" className="h-8 text-xs" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-xs">进度描述</Label>
                    <Input placeholder="描述该节点的关键工作" className="h-8 text-xs" />
                  </div>
                  <div className="flex items-end justify-end">
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      className="text-red-500 h-8 w-8"
                      onClick={() => setNodes(nodes.filter(n => n.id !== node.id))}
                      disabled={nodes.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="bg-slate-50/50 border-b">
            <CardTitle className="text-base">影像资料上传</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
              <Camera className="w-8 h-8 text-slate-400 mb-2" />
              <span className="text-sm font-medium">现场照片上传</span>
              <span className="text-xs text-slate-400 mt-1">支持多图批量上传</span>
            </div>
            <div className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
              <Plane className="w-8 h-8 text-slate-400 mb-2" />
              <span className="text-sm font-medium">航拍影像上传</span>
              <span className="text-xs text-slate-400 mt-1">支持MP4/MOV格式</span>
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

export default RecordForm;