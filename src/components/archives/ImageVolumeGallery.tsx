"use client";

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Edit, Trash2, Eye, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { showSuccess } from "@/utils/toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface ImageItem {
  id: string;
  deviceCode: string;
  deviceName: string;
  title: string;
  category?: string;
  time?: string;
  creator?: string;
  url: string;
  [key: string]: any;
}

interface ImageVolumeGalleryProps {
  type: 'drawing' | 'photo' | 'rubbing' | 'curtain' | 'display';
  title: string;
}

const DEVICE_MAPPING: Record<string, string> = {
  'BH-001': '故宫太和殿',
  'BH-002': '天坛祈年殿',
  'BH-003': '颐和园佛香阁',
};

const ImageVolumeGallery = ({ type, title }: ImageVolumeGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [deleteItem, setDeleteItem] = useState<ImageItem | null>(null);
  const [uploadForm, setUploadForm] = useState({
    deviceCode: '',
    deviceName: '',
    category: '',
    title: '',
    shootingTime: '',
    orientation: '',
    photographer: '',
    description: '',
    rubbingNumber: '',
    hammerPerson: '',
    status: '',
    copyPerson: '',
    copyTime: '',
    materialRequirements: '',
  });

  const mockData: ImageItem[] = [
    { 
      id: '1', 
      deviceCode: 'BH-001', 
      deviceName: '故宫太和殿', 
      title: type === 'rubbing' ? '太和殿石碑拓片' : '正立面图', 
      category: type === 'photo' ? '全景照片' : '建筑图纸', 
      time: '2023-10-01', 
      creator: '张工', 
      url: 'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?w=800',
    },
  ];

  const handleDeviceCodeChange = (code: string) => {
    setUploadForm(prev => ({
      ...prev,
      deviceCode: code,
      deviceName: DEVICE_MAPPING[code] || ''
    }));
  };

  const handleOpenForm = (mode: 'add' | 'edit', item?: ImageItem) => {
    setFormMode(mode);
    if (item) {
      setUploadForm({ ...uploadForm, ...item });
    } else {
      setUploadForm({
        deviceCode: '', deviceName: '', category: '', title: '', shootingTime: '', orientation: '',
        photographer: '', description: '', rubbingNumber: '', hammerPerson: '', status: '',
        copyPerson: '', copyTime: '', materialRequirements: '',
      });
    }
    setIsFormOpen(true);
  };

  const renderFormFields = () => {
    const commonFields = (
      <>
        <div className="space-y-2">
          <Label>设备编码</Label>
          <Select onValueChange={handleDeviceCodeChange} defaultValue={uploadForm.deviceCode}>
            <SelectTrigger><SelectValue placeholder="选择设备编码" /></SelectTrigger>
            <SelectContent>
              {Object.keys(DEVICE_MAPPING).map(code => (
                <SelectItem key={code} value={code}>{code}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>设备名称</Label>
          <Input value={uploadForm.deviceName} readOnly className="bg-slate-50" />
        </div>
      </>
    );

    return (
      <div className="space-y-4">
        {commonFields}
        {type === 'drawing' && (
          <>
            <div className="space-y-2"><Label>分类</Label><Input placeholder="如图纸分类" defaultValue={uploadForm.category} /></div>
            <div className="space-y-2"><Label>图纸名称</Label><Input defaultValue={uploadForm.title} /></div>
          </>
        )}
        {type === 'photo' && (
          <>
            <div className="space-y-2"><Label>分类</Label><Input placeholder="如全景照片" defaultValue={uploadForm.category} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>拍摄时间</Label><Input type="date" /></div>
              <div className="space-y-2"><Label>方位</Label><Input /></div>
            </div>
            <div className="space-y-2"><Label>拍摄者</Label><Input /></div>
            <div className="space-y-2"><Label>文字说明</Label><Textarea /></div>
          </>
        )}
        {type === 'rubbing' && (
          <>
            <div className="space-y-2"><Label>拓片编号</Label><Input /></div>
            <div className="space-y-2"><Label>题名</Label><Input defaultValue={uploadForm.title} /></div>
            <div className="space-y-2"><Label>锤拓人</Label><Input /></div>
            <div className="space-y-2"><Label>现存状态</Label><Input /></div>
          </>
        )}
        {(type === 'curtain' || type === 'display') && (
          <>
            <div className="space-y-2"><Label>卷名称</Label><Input defaultValue={uploadForm.title} /></div>
            {type === 'curtain' && (
              <>
                <div className="space-y-2"><Label>幕本临摹人</Label><Input /></div>
                <div className="space-y-2"><Label>临摹时间</Label><Input type="date" /></div>
                <div className="space-y-2"><Label>材质要求</Label><Textarea /></div>
              </>
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-lg border">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input className="pl-9" placeholder="关联设备 / 名称查询" />
          </div>
          <Button variant="outline">查询</Button>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => handleOpenForm('add')}>
          <Upload className="w-4 h-4 mr-2" /> 批量上传
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {mockData.map((item) => (
          <Card key={item.id} className="group overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
              <img src={item.url} alt={item.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button size="icon" variant="secondary" className="rounded-full" onClick={() => setSelectedImage(item)}><Eye className="w-4 h-4" /></Button>
                <Button size="icon" variant="secondary" className="rounded-full" onClick={() => handleOpenForm('edit', item)}><Edit className="w-4 h-4" /></Button>
                <Button size="icon" variant="destructive" className="rounded-full" onClick={() => setDeleteItem(item)}><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>
            <CardContent className="p-3 space-y-1">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-[10px]">{item.deviceCode}</Badge>
                <span className="text-[10px] text-slate-400">{item.category || '未分类'}</span>
              </div>
              <h4 className="font-medium text-sm truncate">{item.title}</h4>
              <p className="text-xs text-slate-500 truncate">{item.deviceName}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 表单抽屉（新增/编辑） */}
      <Sheet open={isFormOpen} onOpenChange={setIsFormOpen}>
        <SheetContent className="sm:max-w-md overflow-y-auto">
          <SheetHeader className="mb-6">
            <SheetTitle>{formMode === 'add' ? `批量上传 - ${title}` : `编辑内容 - ${title}`}</SheetTitle>
          </SheetHeader>
          <div className="space-y-6">
            {/* 仅在新增模式下显示上传操作 */}
            {formMode === 'add' && (
              <div className="border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                <Upload className="w-10 h-10 text-slate-400 mb-2" />
                <p className="text-sm text-slate-600 font-medium">点击或拖拽图片至此处上传</p>
                <p className="text-xs text-slate-400 mt-1">支持 JPG, PNG, PDF 格式</p>
              </div>
            )}
            {renderFormFields()}
          </div>
          <SheetFooter className="mt-8">
            <Button variant="outline" className="flex-1" onClick={() => setIsFormOpen(false)}>取消</Button>
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={() => { showSuccess(formMode === 'add' ? "上传成功" : "保存成功"); setIsFormOpen(false); }}>
              {formMode === 'add' ? '开始上传' : '保存修改'}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* 详情弹窗 */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader><DialogTitle>查看详情 - {selectedImage?.title}</DialogTitle></DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center min-h-[450px] shadow-inner">
              <img src={selectedImage?.url} className="max-w-full max-h-full object-contain" />
            </div>
            <div className="text-sm space-y-3">
              <h3 className="font-bold text-slate-900 mb-4 text-base border-b pb-2">详细信息</h3>
              <div className="flex border-b border-slate-50 pb-2"><span className="text-slate-500 w-24 shrink-0">设备编码：</span><span>{selectedImage?.deviceCode}</span></div>
              <div className="flex border-b border-slate-50 pb-2"><span className="text-slate-500 w-24 shrink-0">设备名称：</span><span>{selectedImage?.deviceName}</span></div>
              <div className="flex border-b border-slate-50 pb-2"><span className="text-slate-500 w-24 shrink-0">添加时间：</span><span>{selectedImage?.time}</span></div>
              <div className="flex border-b border-slate-50 pb-2"><span className="text-slate-500 w-24 shrink-0">添加人：</span><span>{selectedImage?.creator}</span></div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 删除确认 */}
      <AlertDialog open={!!deleteItem} onOpenChange={() => setDeleteItem(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除？</AlertDialogTitle>
            <AlertDialogDescription>数据删除后将无法恢复，请确认是否删除“{deleteItem?.title}”？</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={() => { showSuccess("删除成功"); setDeleteItem(null); }}>确认删除</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ImageVolumeGallery;