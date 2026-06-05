"use client";

import React, { useState, useMemo } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { MENU_DATA } from '@/constants/menuData';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

// 驾驶舱组件
import CockpitModule from '@/components/cockpit/CockpitModule';

// 档案组件
import RelicArchiveOverview from '@/components/archives/RelicArchiveOverview';
import IntelligentAnalysis from '@/components/archives/IntelligentAnalysis';
import TextVolumeList from '@/components/archives/TextVolumeList';
import TextVolumeForm from '@/components/archives/TextVolumeForm';
import ImageVolumeGallery from '@/components/archives/ImageVolumeGallery';
import DocumentVolumeList from '@/components/archives/DocumentVolumeList';
import DocumentVolumeForm from '@/components/archives/DocumentVolumeForm';
import AdminDocList from '@/components/archives/AdminDocList';
import AdminDocForm from '@/components/archives/AdminDocForm';
import LegalDocList from '@/components/archives/LegalDocList';
import LegalDocForm from '@/components/archives/LegalDocForm';
import ChronicleList from '@/components/archives/ChronicleList';
import ChronicleForm from '@/components/archives/ChronicleForm';
import ReferenceList from '@/components/archives/ReferenceList';
import ReferenceForm from '@/components/archives/ReferenceForm';
import LiteratureList from '@/components/archives/LiteratureList';
import LiteratureForm from '@/components/archives/LiteratureForm';
import BookList from '@/components/archives/BookList';
import BookForm from '@/components/archives/BookForm';
import BasicInfoList from '@/components/archives/BasicInfoList';
import BasicInfoForm from '@/components/archives/BasicInfoForm';
import PublicityMaintenance from '@/components/archives/PublicityMaintenance';

// 安全组件
import EquipmentList from '@/components/safety/EquipmentList';
import EquipmentForm from '@/components/safety/EquipmentForm';
import AlarmProcessingList from '@/components/safety/AlarmProcessingList';
import ApiList from '@/components/system/ApiList';
import ApiForm from '@/components/system/ApiForm';

// 修葺组件
import RestorationStats from '@/components/restoration/RestorationStats';
import SchemeList from '@/components/restoration/SchemeList';
import SchemeForm from '@/components/restoration/SchemeForm';
import ApprovalList from '@/components/restoration/ApprovalList';
import RecordList from '@/components/restoration/RecordList';
import RecordForm from '@/components/restoration/RecordForm';

// 系统组件
import UserList from '@/components/system/UserList';
import UserForm from '@/components/system/UserForm';
import RoleList from '@/components/system/RoleList';
import RoleForm from '@/components/system/RoleForm';
import ContactList from '@/components/system/ContactList';
import ContactForm from '@/components/system/ContactForm';
import LoginLogList from '@/components/system/LoginLogList';
import OpLogList from '@/components/system/OpLogList';

const Index = () => {
  const [activeModuleId, setActiveModuleId] = useState('cockpit');
  const [activeMenuId, setActiveMenuId] = useState('map');
  const [viewMode, setViewMode] = useState<'list' | 'form' | 'detail'>('list');
  const [formData, setFormData] = useState<any>(null);

  const activeModule = useMemo(
    () => MENU_DATA.find((m) => m.id === activeModuleId) || MENU_DATA[0],
    [activeModuleId]
  );

  // 递归查找菜单名称
  const activeMenuLabel = useMemo(() => {
    const findLabel = (items: any[]): string => {
      for (const item of items) {
        if (item.id === activeMenuId) return item.label;
        if (item.children) {
          const found = findLabel(item.children);
          if (found) return found;
        }
      }
      return '';
    };
    return findLabel(activeModule.menus);
  }, [activeModule, activeMenuId]);

  const navigateTo = (moduleId: string, menuId: string) => {
    setActiveModuleId(moduleId);
    setActiveMenuId(menuId);
    setViewMode('list');
    setFormData(null);
  };

  const handleAction = (mode: 'form' | 'detail', data: any = null) => {
    setFormData(data);
    setViewMode(mode);
  };

  const handleModuleChange = (id: string) => {
    setActiveModuleId(id);
    const module = MENU_DATA.find(m => m.id === id);
    const firstMenu = module?.menus[0];
    if (firstMenu?.children && firstMenu.children.length > 0) {
      setActiveMenuId(firstMenu.children[0].id);
    } else {
      setActiveMenuId(firstMenu?.id || '');
    }
    setViewMode('list');
  };

  const handleMenuChange = (id: string) => {
    setActiveMenuId(id);
    setViewMode('list');
  };

  const isReadOnly = viewMode === 'detail';

  const renderContent = () => {
    if (activeModuleId === 'cockpit') return <CockpitModule />;

    if (activeModuleId === 'archives') {
      if (viewMode !== 'list') {
        switch (activeMenuId) {
          case 'text': return <TextVolumeForm onBack={() => setViewMode('list')} isReadOnly={isReadOnly} initialData={formData} />;
          case 'planning':
          case 'archaeology':
          case 'monitoring':
            return <DocumentVolumeForm type={activeMenuId as any} onBack={() => setViewMode('list')} isReadOnly={isReadOnly} initialData={formData} />;
          case 'admin-doc': return <AdminDocForm onBack={() => setViewMode('list')} isReadOnly={isReadOnly} initialData={formData} />;
          case 'legal-doc': return <LegalDocForm onBack={() => setViewMode('list')} isReadOnly={isReadOnly} initialData={formData} />;
          case 'chronicle': return <ChronicleForm onBack={() => setViewMode('list')} isReadOnly={isReadOnly} initialData={formData} />;
          case 'reference': return <ReferenceForm onBack={() => setViewMode('list')} isReadOnly={isReadOnly} initialData={formData} />;
          case 'literature': return <LiteratureForm onBack={() => setViewMode('list')} isReadOnly={isReadOnly} initialData={formData} />;
          case 'book': return <BookForm onBack={() => setViewMode('list')} isReadOnly={isReadOnly} initialData={formData} />;
          case 'basic-info': return <BasicInfoForm onBack={() => setViewMode('list')} isReadOnly={isReadOnly} initialData={formData} />;
        }
      }
      switch (activeMenuId) {
        case 'overview': return <RelicArchiveOverview onSelectRelic={() => setActiveMenuId('text')} onViewMoreApproval={() => navigateTo('restoration', 'approval')} onViewMoreAlarm={() => navigateTo('safety', 'alarm')} />;
        case 'analysis': return <IntelligentAnalysis />;
        case 'text': return <TextVolumeList onAdd={() => handleAction('form')} onEdit={(data) => handleAction('form', data)} onDetail={(data) => handleAction('detail', data)} />;
        case 'drawing': return <ImageVolumeGallery type="drawing" title="图纸卷" />;
        case 'photo': return <ImageVolumeGallery type="photo" title="照片卷" />;
        case 'rubbing': return <ImageVolumeGallery type="rubbing" title="拓片卷" />;
        case 'curtain': return <ImageVolumeGallery type="curtain" title="幕本卷" />;
        case 'display': return <ImageVolumeGallery type="display" title="文物展示卷" />;
        case 'planning':
        case 'archaeology':
        case 'monitoring':
          return <DocumentVolumeList type={activeMenuId as any} onAdd={() => handleAction('form')} onEdit={(data) => handleAction('form', data)} onDetail={(data) => handleAction('detail', data)} />;
        case 'admin-doc': return <AdminDocList onAdd={() => handleAction('form')} onEdit={(data) => handleAction('form', data)} onDetail={(data) => handleAction('detail', data)} />;
        case 'legal-doc': return <LegalDocList onAdd={() => handleAction('form')} onEdit={(data) => handleAction('form', data)} onDetail={(data) => handleAction('detail', data)} />;
        case 'chronicle': return <ChronicleList onAdd={() => handleAction('form')} onEdit={(data) => handleAction('form', data)} onDetail={(data) => handleAction('detail', data)} />;
        case 'reference': return <ReferenceList onAdd={() => handleAction('form')} onEdit={(data) => handleAction('form', data)} onDetail={(data) => handleAction('detail', data)} />;
        case 'literature': return <LiteratureList onAdd={() => handleAction('form')} onEdit={(data) => handleAction('form', data)} onDetail={(data) => handleAction('detail', data)} />;
        case 'book': return <BookList onAdd={() => handleAction('form')} onEdit={(data) => handleAction('form', data)} onDetail={(data) => handleAction('detail', data)} />;
        case 'basic-info': return <BasicInfoList onAdd={() => handleAction('form')} onEdit={(data) => handleAction('form', data)} onDetail={(data) => handleAction('detail', data)} />;
        case 'publicity': return <PublicityMaintenance />;
      }
    }

    if (activeModuleId === 'safety') {
      if (viewMode !== 'list') {
        if (activeMenuId === 'equipment') return <EquipmentForm onBack={() => setViewMode('list')} isReadOnly={isReadOnly} initialData={formData} />;
        if (activeMenuId === 'api') return <ApiForm onBack={() => setViewMode('list')} isReadOnly={isReadOnly} initialData={formData} />;
      }
      switch (activeMenuId) {
        case 'equipment': return <EquipmentList onAdd={() => handleAction('form')} onEdit={(data) => handleAction('form', data)} onDetail={(data) => handleAction('detail', data)} />;
        case 'alarm': return <AlarmProcessingList onDetail={(data) => handleAction('detail', data)} />;
        case 'api': return <ApiList onAdd={() => handleAction('form')} onEdit={(data) => handleAction('form', data)} onDetail={(data) => handleAction('detail', data)} />;
      }
    }

    if (activeModuleId === 'restoration') {
      if (viewMode !== 'list') {
        // 方案详情和审批详情均使用 SchemeForm
        if (activeMenuId === 'scheme' || activeMenuId === 'approval') return <SchemeForm onBack={() => setViewMode('list')} initialData={formData} isReadOnly={isReadOnly} />;
        if (activeMenuId === 'record') return <RecordForm onBack={() => setViewMode('list')} initialData={formData} isReadOnly={isReadOnly} />;
      }
      switch (activeMenuId) {
        case 'stats': return <RestorationStats />;
        case 'scheme': return <SchemeList onAdd={() => handleAction('form')} onEdit={(data) => handleAction('form', data)} onDetail={(data) => handleAction('detail', data)} onAddVersion={(data) => handleAction('form', { ...data, isNewVersion: true })} />;
        case 'approval': return <ApprovalList onDetail={(data) => handleAction('detail', data)} />;
        case 'record': return <RecordList onAdd={() => handleAction('form')} onEdit={(data) => handleAction('form', data)} onDetail={(data) => handleAction('detail', data)} onAddDetail={(data) => handleAction('form', { ...data, isAppend: true })} />;
      }
    }

    if (activeModuleId === 'system') {
      if (viewMode !== 'list') {
        switch (activeMenuId) {
          case 'user': return <UserForm onBack={() => setViewMode('list')} initialData={formData} isReadOnly={isReadOnly} />;
          case 'role': return <RoleForm onBack={() => setViewMode('list')} isReadOnly={isReadOnly} />;
          case 'contact': return <ContactForm onBack={() => setViewMode('list')} isReadOnly={isReadOnly} />;
        }
      }
      switch (activeMenuId) {
        case 'user': return <UserList onAdd={() => handleAction('form')} onEdit={(user) => handleAction('form', user)} onDetail={(user) => handleAction('detail', user)} />;
        case 'role': return <RoleList />;
        case 'contact': return <ContactList onAdd={() => handleAction('form')} onEdit={(data) => handleAction('form', data)} onDetail={(data) => handleAction('detail', data)} />;
        case 'login-log': return <LoginLogList />;
        case 'op-log': return <OpLogList />;
      }
    }

    return <div className="p-8 text-slate-400">功能开发中...</div>;
  };

  const isCockpit = activeModuleId === 'cockpit';
  const isArchiveOverview = activeModuleId === 'archives' && activeMenuId === 'overview';
  const hideSidebar = isCockpit || isArchiveOverview;
  const hideBreadcrumb = isCockpit || isArchiveOverview;

  return (
    <div className="h-screen flex flex-col bg-slate-50 overflow-hidden">
      <Header activeModuleId={activeModuleId} onModuleChange={handleModuleChange} onNavigate={navigateTo} />
      <div className="flex flex-1 overflow-hidden">
        {!hideSidebar && <Sidebar menus={activeModule.menus.filter(m => !['overview', 'basic-info', 'publicity'].includes(m.id))} activeMenuId={activeMenuId} onMenuChange={handleMenuChange} />}
        <main className="flex-1 overflow-y-auto flex flex-col">
          {!hideBreadcrumb && (
            <div className="p-8 pb-4 px-4 md:px-5">
              <Breadcrumb className="mb-4">
                <BreadcrumbList>
                  <BreadcrumbItem><BreadcrumbLink href="#" onClick={(e) => { e.preventDefault(); handleModuleChange('cockpit'); }}>首页</BreadcrumbLink></BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem><BreadcrumbLink href="#" onClick={(e) => { e.preventDefault(); handleModuleChange(activeModuleId); }}>{activeModule.label}</BreadcrumbLink></BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem><BreadcrumbPage className="text-blue-600 font-bold">{isReadOnly ? '详情' : viewMode === 'form' ? '编辑' : activeMenuLabel}</BreadcrumbPage></BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          )}
          <div className={isCockpit ? "flex-1 flex flex-col" : "flex-1 px-4 md:px-5 pt-5"}>{renderContent()}</div>
        </main>
      </div>
    </div>
  );
};

export default Index;