"use client";

import React from 'react';
import { MENU_DATA } from '@/constants/menuData';
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield, Save } from 'lucide-react';
import { showSuccess } from "@/utils/toast";

interface PermissionConfigProps {
  roleName: string;
}

const PermissionConfig = ({ roleName }: PermissionConfigProps) => {
  const handleSave = () => {
    showSuccess(`角色“${roleName}”的权限配置已保存`);
  };

  const renderPermissions = (items: any[], depth = 0) => {
    return items.map((item) => (
      <div key={item.id} className="space-y-3">
        <div className="flex items-center gap-3 py-1">
          <Checkbox id={item.id} defaultChecked={depth === 0} />
          <label htmlFor={item.id} className={`text-sm font-medium leading-none cursor-pointer ${depth === 0 ? 'text-slate-900 font-bold' : 'text-slate-600'}`}>
            {item.label}
          </label>
          {depth > 0 && (
            <div className="flex items-center gap-4 ml-6 border-l pl-4">
              {['查看', '新增', '编辑', '删除', '导出'].map(op => (
                <div key={op} className="flex items-center gap-1.5">
                  <Checkbox id={`${item.id}-${op}`} className="w-3.5 h-3.5" />
                  <span className="text-[11px] text-slate-400">{op}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        {item.children && (
          <div className="ml-6 space-y-3 border-l pl-4">
            {renderPermissions(item.children, depth + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border shadow-sm overflow-hidden">
      <div className="p-4 border-b bg-slate-50/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-blue-600" />
          <h3 className="font-bold text-slate-800">权限配置 - {roleName}</h3>
        </div>
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" /> 保存配置
        </Button>
      </div>
      
      <ScrollArea className="flex-1 p-6">
        <div className="space-y-8">
          {MENU_DATA.map((module) => (
            <div key={module.id} className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b">
                <div className="w-1 h-4 bg-blue-600 rounded-full" />
                <h4 className="text-sm font-black text-slate-900">{module.label}模块</h4>
              </div>
              <div className="space-y-4 pl-2">
                {renderPermissions(module.menus)}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default PermissionConfig;