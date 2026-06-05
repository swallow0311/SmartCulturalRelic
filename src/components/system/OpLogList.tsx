"use client";

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, FileText, Clock, ListTree } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const OpLogList = () => {
  const data = [
    { 
      id: '1', 
      user: 'admin', 
      category: '文物档案', 
      action: '新增文字卷', 
      detail: '新增了文物档案[故宫太和殿]的文字卷信息，包含基本状况描述与环境沿革。', 
      time: '2023-11-15 11:05:20', 
      status: 'success' 
    },
    { 
      id: '2', 
      user: 'zhangsan', 
      category: '文物修葺', 
      action: '提交审核', 
      detail: '提交了[太和殿屋顶修缮方案]的V1.2版本审核申请，紧急度设为特急。', 
      time: '2023-11-15 10:45:12', 
      status: 'success' 
    },
    { 
      id: '3', 
      user: 'admin', 
      category: '系统管理', 
      action: '重置密码', 
      detail: '重置了用户[lisi]的登录密码，并发送了通知邮件。', 
      time: '2023-11-15 09:30:05', 
      status: 'success' 
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-xl border shadow-sm">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input className="pl-9 h-9" placeholder="搜索用户 / 操作内容" />
        </div>
        <Button variant="outline" className="h-9">查询</Button>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead>操作用户</TableHead>
              <TableHead>日志分类</TableHead>
              <TableHead>操作行为</TableHead>
              <TableHead className="w-1/3">操作明细</TableHead>
              <TableHead>操作时间</TableHead>
              <TableHead>状态</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-bold">{log.user}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-normal bg-slate-50">
                    <ListTree className="w-3 h-3 mr-1 text-slate-400" />
                    {log.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 font-medium text-indigo-600">
                    <FileText className="w-3.5 h-3.5" />
                    {log.action}
                  </div>
                </TableCell>
                <TableCell className="text-slate-600 text-xs leading-relaxed">
                  {log.detail}
                </TableCell>
                <TableCell className="text-slate-500 text-xs">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {log.time}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className="bg-green-50 text-green-700 border-green-200">成功</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default OpLogList;