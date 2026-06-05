"use client";

import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { showSuccess } from "@/utils/toast";

const PublicityMaintenance = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModule, setSelectedModule] = useState('all');

  const fieldGroups = [
    {
      id: 'text',
      title: '文字卷字段',
      fields: [
        { id: 'name', label: '公布名称' },
        { id: 'code', label: '代码' },
        { id: 'coords', label: '地理坐标' },
        { id: 'area', label: '面积' },
        { id: 'era', label: '公布时代' },
        { id: 'ownership', label: '所有权' },
      ]
    },
    {
      id: 'admin',
      title: '行政管理文件字段',
      fields: [
        { id: 'title', label: '文件标题' },
        { id: 'type', label: '文件类型' },
        { id: 'doc_code', label: '文号' },
        { id: 'unit', label: '发文单位' },
      ]
    },
    {
      id: 'book',
      title: '图书管理字段',
      fields: [
        { id: 'book_name', label: '书名' },
        { id: 'publisher', label: '出版单位' },
        { id: 'version', label: '版本' },
      ]
    }
  ];

  const filteredGroups = useMemo(() => {
    return fieldGroups
      .filter(group => selectedModule === 'all' || group.id === selectedModule)
      .map(group => ({
        ...group,
        fields: group.fields.filter(field => 
          field.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }))
      .filter(group => group.fields.length > 0);
  }, [searchTerm, selectedModule]);

  const handleSave = () => {
    showSuccess("公开性设置已保存");
  };

  const handleReset = () => {
    setSearchTerm('');
    setSelectedModule('all');
  };

  return (
    <div className="flex flex-col min-h-full">
      <div className="flex-1 space-y-6 pb-24">
        <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-xl border shadow-sm">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input 
                className="pl-9 h-9" 
                placeholder="搜索字段名称" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedModule} onValueChange={setSelectedModule}>
              <SelectTrigger className="w-48 h-9">
                <SelectValue placeholder="功能模块" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部模块</SelectItem>
                {fieldGroups.map(group => (
                  <SelectItem key={group.id} value={group.id}>{group.title.replace('字段', '')}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="h-9" onClick={handleReset}>重置</Button>
          </div>
        </div>

        {filteredGroups.length > 0 ? (
          filteredGroups.map((group) => (
            <Card key={group.id} className="border-none shadow-sm overflow-hidden">
              <CardHeader className="bg-slate-50/50 border-b py-3">
                <CardTitle className="text-sm font-bold text-slate-700">{group.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-1/3 pl-6">字段名称</TableHead>
                      <TableHead>公开性设置</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {group.fields.map((field) => (
                      <TableRow key={field.id}>
                        <TableCell className="font-medium pl-6">{field.label}</TableCell>
                        <TableCell>
                          <RadioGroup defaultValue="internal" className="flex items-center gap-8">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="internal" id={`${field.id}-internal`} />
                              <Label htmlFor={`${field.id}-internal`} className="font-normal cursor-pointer">内部公开</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="request" id={`${field.id}-request`} />
                              <Label htmlFor={`${field.id}-request`} className="font-normal cursor-pointer">依申请公开</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="active" id={`${field.id}-active`} />
                              <Label htmlFor={`${field.id}-active`} className="font-normal cursor-pointer">主动公开</Label>
                            </div>
                          </RadioGroup>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-48 bg-white rounded-xl border border-dashed">
            <p className="text-slate-400">未找到匹配的字段信息</p>
          </div>
        )}
      </div>

      <div className="sticky bottom-0 -mx-8 bg-white border-t p-4 px-8 flex justify-start gap-3 z-30 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
        <Button className="bg-blue-600 hover:bg-blue-700 px-8" onClick={handleSave}>确定</Button>
        <Button variant="outline" className="px-8" onClick={handleReset}>取消</Button>
      </div>
    </div>
  );
};

export default PublicityMaintenance;