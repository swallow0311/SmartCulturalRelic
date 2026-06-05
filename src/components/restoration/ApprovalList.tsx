"use client";

import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Search, ChevronDown, ChevronUp, CheckCircle2, XCircle, Eye } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { showSuccess, showError } from "@/utils/toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface ApprovalListProps {
  onDetail: (data: any) => void;
}

const ApprovalList = ({ onDetail }: ApprovalListProps) => {
  const [showMoreSearch, setShowMoreSearch] = useState(false);
  const [passItem, setPassItem] = useState<any>(null);
  const [rejectItem, setRejectItem] = useState<any>(null);
  const [rejectReason, setRejectReason] = useState("");
  
  const data = [
    { 
      id: '1', 
      name: '故宫太和殿屋顶修缮方案', 
      type: '抢救性修复', 
      relic: '太和殿', 
      urgency: '特急', 
      compiler: '张工', 
      leader: '李队', 
      status: '审核中', 
      submitter: '张工', 
      submitTime: '2023-10-12 14:30'
    },
    { 
      id: '2', 
      name: '天坛祈年殿彩画修复方案', 
      type: '日常保养', 
      relic: '祈年殿', 
      urgency: '一般', 
      compiler: '王工', 
      leader: '赵队', 
      status: '已通过', 
      submitter: '王工', 
      submitTime: '2023-11-05 09:15'
    },
  ];

  const handleReject = () => {
    if (!rejectReason.trim()) {
      showError("请填写驳回原因");
      return;
    }
    showSuccess(`方案《${rejectItem.name}》已被驳回`);
    setRejectItem(null);
    setRejectReason("");
  };

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-xl border shadow-sm space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input className="pl-9 h-9" placeholder="方案名称" />
            </div>
            <Button variant="default" className="bg-indigo-600 hover:bg-indigo-700 h-9">查询</Button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="min-w-[1600px] border-separate border-spacing-0">
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="w-64 border-b">方案名称</TableHead>
                <TableHead className="w-32 border-b">方案类型</TableHead>
                <TableHead className="w-32 border-b">关联文物</TableHead>
                <TableHead className="w-24 border-b">方案状态</TableHead>
                <TableHead className="w-40 border-b">提审时间</TableHead>
                <TableHead className="!sticky !right-0 bg-slate-50 z-50 shadow-[-4px_0_10px_-3px_rgba(0,0,0,0.1)] text-left w-48 border-b border-l pl-6">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id} className="group">
                  <TableCell className="font-medium whitespace-nowrap">{item.name}</TableCell>
                  <TableCell className="whitespace-nowrap">{item.type}</TableCell>
                  <TableCell className="whitespace-nowrap">{item.relic}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Badge className={cn(
                      item.status === '已通过' ? 'bg-green-50 text-green-700 border-green-200' : 
                      'bg-blue-50 text-blue-700 border-blue-200'
                    )}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-500 whitespace-nowrap">{item.submitTime}</TableCell>
                  <TableCell className="!sticky !right-0 bg-white z-40 shadow-[-4px_0_10px_-3px_rgba(0,0,0,0.1)] group-hover:bg-slate-50 transition-colors border-l whitespace-nowrap">
                    <div className="flex items-center gap-2 px-4">
                      <Button variant="ghost" size="sm" className="text-blue-600 h-8 px-2" onClick={() => onDetail(item)}>
                        <Eye className="w-3.5 h-3.5 mr-1" /> 详情
                      </Button>
                      {item.status === '审核中' && (
                        <>
                          <Button variant="ghost" size="sm" className="text-green-600 h-8 px-2" onClick={() => setPassItem(item)}>
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> 通过
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 h-8 px-2" onClick={() => setRejectItem(item)}>
                            <XCircle className="w-3.5 h-3.5 mr-1" /> 驳回
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* 通过确认 */}
      <AlertDialog open={!!passItem} onOpenChange={() => setPassItem(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认通过审批？</AlertDialogTitle>
            <AlertDialogDescription>确认通过修缮方案《{passItem?.name}》的审批吗？</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction className="bg-green-600 hover:bg-green-700" onClick={() => { showSuccess("方案已通过审批"); setPassItem(null); }}>确认通过</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* 驳回确认 */}
      <Dialog open={!!rejectItem} onOpenChange={() => setRejectItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>审批驳回</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">驳回原因</Label>
              <Textarea 
                placeholder="请详细填写驳回原因，以便编制人修改" 
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="min-h-[120px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectItem(null)}>取消</Button>
            <Button variant="destructive" onClick={handleReject}>确认驳回</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApprovalList;