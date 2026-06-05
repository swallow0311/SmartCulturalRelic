"use client";

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Monitor, Globe } from "lucide-react";

const LoginLogList = () => {
  const data = [
    { id: '1', user: 'admin', ip: '192.168.1.105', location: '北京', time: '2023-11-15 10:20:33', logoutTime: '2023-11-15 18:05:12', browser: 'Chrome 119', os: 'Windows 11' },
    { id: '2', user: 'zhangsan', ip: '110.242.68.3', location: '上海', time: '2023-11-15 09:15:12', logoutTime: '2023-11-15 17:30:45', browser: 'Safari', os: 'macOS' },
    { id: '3', user: 'lisi', ip: '221.192.15.66', location: '西安', time: '2023-11-14 18:30:05', logoutTime: '2023-11-14 21:00:00', browser: 'Edge', os: 'Windows 10' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-xl border shadow-sm">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input className="pl-9 h-9" placeholder="搜索用户名 / IP" />
        </div>
        <div className="flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-md border">
          <span className="text-xs text-slate-500 shrink-0">时间范围:</span>
          <Input className="w-36 h-7 border-0 bg-transparent focus-visible:ring-0 text-xs" type="date" />
          <span className="text-slate-300">-</span>
          <Input className="w-36 h-7 border-0 bg-transparent focus-visible:ring-0 text-xs" type="date" />
        </div>
        <Button variant="outline" className="h-9">查询</Button>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead>登录用户</TableHead>
              <TableHead>IP地址</TableHead>
              <TableHead>登录地点</TableHead>
              <TableHead>登录时间</TableHead>
              <TableHead>登出时间</TableHead>
              <TableHead>浏览器</TableHead>
              <TableHead>操作系统</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-bold">{log.user}</TableCell>
                <TableCell className="font-mono text-xs">{log.ip}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-slate-400" />
                    {log.location}
                  </div>
                </TableCell>
                <TableCell className="text-slate-500 text-xs">{log.time}</TableCell>
                <TableCell className="text-slate-500 text-xs">{log.logoutTime || '-'}</TableCell>
                <TableCell>{log.browser}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <Monitor className="w-3.5 h-3.5 text-slate-400" />
                    {log.os}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LoginLogList;