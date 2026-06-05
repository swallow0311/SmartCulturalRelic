"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, X, Plus, Trash2 } from "lucide-react";
import { showSuccess } from "@/utils/toast";
import { ScrollArea } from "@/components/ui/scroll-area";

interface BasicInfoFormProps {
  onBack: () => void;
}

const RANGE_OPTIONS = [
  { group: '主卷管理', items: ['文字卷', '图纸卷', '照片卷', '拓片卷', '幕本卷', '文物展示卷', '保护规划及保护工程方案卷', '文物调查及考古发掘资料卷', '文物保护工程及防治监测卷'] },
  { group: '副卷管理', items: ['行政管理文件', '法律文书', '大事记'] },
  { group: '备考卷管理', items: ['参考资料', '论文与文献', '图书管理'] },
];

const BasicInfoForm = ({ onBack }: BasicInfoFormProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>(['']);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess("保存成功");
    onBack();
  };

  const toggleItem = (item: string) => {
    setSelectedItems(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const addOption = () => setOptions([...options, '']);
  const removeOption = (index: number) => setOptions(options.filter((_, i) => i !== index));
  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const filteredOptions = RANGE_OPTIONS.map(group => ({
    ...group,
    items: group.items.filter(item => item.includes(searchTerm))
  })).filter(group => group.items.length > 0);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col min-h-full">
      <div className="flex-1 space-y-6 pb-24">
        <Card className="border-none shadow-sm">
          <CardHeader className="border-b bg-slate-50/50">
            <CardTitle className="text-base">基础信息录入</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-2">
              <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">信息字段名称</Label>
              <Input required placeholder="请输入信息字段名称" />
            </div>

            <div className="space-y-3">
              <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">应用范围</Label>
              <div className="border rounded-lg overflow-hidden bg-slate-50/30">
                <div className="p-3 border-b bg-white flex items-center gap-2">
                  <Search className="w-4 h-4 text-slate-400" />
                  <Input 
                    className="h-8 border-0 focus-visible:ring-0 bg-transparent" 
                    placeholder="搜索应用范围..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <ScrollArea className="h-[200px] p-4">
                  <div className="space-y-6">
                    {filteredOptions.map((group) => (
                      <div key={group.group} className="space-y-3">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{group.group}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {group.items.map((item) => (
                            <div key={item} className="flex items-center space-x-2">
                              <Checkbox 
                                id={item} 
                                checked={selectedItems.includes(item)}
                                onCheckedChange={() => toggleItem(item)}
                              />
                              <label 
                                htmlFor={item} 
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                              >
                                {item}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="p-3 border-t bg-slate-50 flex flex-wrap gap-2">
                  <span className="text-xs text-slate-500 self-center mr-2">已选 ({selectedItems.length}):</span>
                  {selectedItems.map(item => (
                    <div key={item} className="bg-blue-100 text-blue-700 text-[10px] px-2 py-1 rounded flex items-center gap-1">
                      {item}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => toggleItem(item)} />
                    </div>
                  ))}
                  {selectedItems.length === 0 && <span className="text-xs text-slate-400 italic">暂未选择</span>}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">选项值设置</Label>
                <Button type="button" variant="outline" size="sm" onClick={addOption}>
                  <Plus className="w-4 h-4 mr-1" /> 添加选项
                </Button>
              </div>
              <div className="space-y-3">
                {options.map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <Input 
                      required 
                      placeholder={`选项 ${idx + 1}`} 
                      value={opt} 
                      onChange={(e) => updateOption(idx, e.target.value)}
                    />
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      className="text-red-500 shrink-0" 
                      onClick={() => removeOption(idx)}
                      disabled={options.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>说明</Label>
              <Textarea placeholder="请输入相关说明" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="sticky bottom-0 -mx-8 bg-white border-t p-4 px-8 flex justify-start gap-3 z-30 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 px-8" disabled={selectedItems.length === 0}>确定</Button>
        <Button type="button" variant="outline" onClick={onBack} className="px-8">取消</Button>
      </div>
    </form>
  );
};

export default BasicInfoForm;