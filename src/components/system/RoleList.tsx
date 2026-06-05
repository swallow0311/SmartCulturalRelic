"use client";

import React, { useState } from 'react';
import RoleGroupSidebar from './RoleGroupSidebar';
import PermissionConfig from './PermissionConfig';

const RoleList = () => {
  const [selectedRole, setSelectedRole] = useState<any>(null);

  return (
    <div className="flex gap-6 h-[calc(100vh-240px)]">
      {/* 左侧角色列表 */}
      <RoleGroupSidebar onSelect={setSelectedRole} />

      {/* 右侧权限配置 */}
      <div className="flex-1 min-w-0">
        {selectedRole ? (
          <PermissionConfig roleName={selectedRole.name} />
        ) : (
          <div className="h-full flex items-center justify-center bg-white rounded-xl border border-dashed text-slate-400">
            请在左侧选择一个角色以配置权限
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleList;