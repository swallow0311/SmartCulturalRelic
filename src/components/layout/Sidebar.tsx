"use client";

import React, { useState, useEffect } from 'react';
import { MenuItem } from '@/types/menu';
import { cn } from '@/lib/utils';
import { 
  ChevronRight,
  ChevronDown,
  FolderOpen,
  Folder
} from 'lucide-react';

interface SidebarProps {
  menus: MenuItem[];
  activeMenuId: string;
  onMenuChange: (id: string) => void;
}

const Sidebar = ({ menus, activeMenuId, onMenuChange }: SidebarProps) => {
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);

  // 自动展开包含激活项的组
  useEffect(() => {
    menus.forEach(menu => {
      if (menu.children?.some(child => child.id === activeMenuId)) {
        if (!expandedGroups.includes(menu.id)) {
          setExpandedGroups(prev => [...prev, menu.id]);
        }
      }
    });
  }, [activeMenuId, menus]);

  const toggleGroup = (id: string) => {
    setExpandedGroups(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const renderMenuItem = (item: MenuItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedGroups.includes(item.id);
    const isActive = activeMenuId === item.id;

    if (hasChildren) {
      return (
        <div key={item.id} className="mb-1">
          <button
            onClick={() => toggleGroup(item.id)}
            className={cn(
              'w-full flex items-center justify-between py-2.5 px-6 transition-all text-slate-600 hover:bg-slate-50',
              isExpanded && 'text-blue-600 font-bold'
            )}
          >
            <div className="flex items-center gap-2">
              {isExpanded ? <FolderOpen size={16} /> : <Folder size={16} />}
              <span className="text-sm">{item.label}</span>
            </div>
            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
          
          {isExpanded && (
            <div className="bg-slate-50/50 py-1">
              {item.children?.map(child => renderMenuItem(child, depth + 1))}
            </div>
          )}
        </div>
      );
    }

    return (
      <button
        key={item.id}
        onClick={() => onMenuChange(item.id)}
        className={cn(
          'w-full flex items-center py-2 px-6 transition-all group relative',
          depth > 0 ? 'pl-12' : 'pl-6',
          isActive
            ? 'text-blue-600 bg-blue-50/50 font-bold border-r-4 border-blue-600'
            : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
        )}
      >
        <span className="text-sm truncate">{item.label}</span>
        {!isActive && (
          <ChevronRight size={12} className="ml-auto opacity-0 group-hover:opacity-50 transition-opacity" />
        )}
      </button>
    );
  };

  return (
    <aside className="w-64 border-r bg-white overflow-y-auto shrink-0 shadow-sm">
      <div className="py-4">
        {menus.map(menu => renderMenuItem(menu))}
      </div>
    </aside>
  );
};

export default Sidebar;