import { Module } from "../types/menu";

export const MENU_DATA: Module[] = [
  {
    id: "cockpit",
    label: "驾驶舱",
    menus: [
      { id: "map", label: "全景看板" },
      { id: "relic", label: "文物数据" },
      { id: "event", label: "文保事件" },
      { id: "device", label: "检测设备" },
    ],
  },
  {
    id: "archives",
    label: "文物档案",
    menus: [
      { id: "overview", label: "档案总览" },
      {
        id: "main-volumes",
        label: "主卷管理",
        children: [
          { id: "text", label: "文字卷" },
          { id: "drawing", label: "图纸卷" },
          { id: "photo", label: "照片卷" },
          { id: "rubbing", label: "拓片卷" },
          { id: "curtain", label: "幕本卷" },
          { id: "planning", label: "保护规划及保护工程方案卷" },
          { id: "archaeology", label: "文物调查及考古发掘资料卷" },
          { id: "monitoring", label: "文物保护工程及防治监测卷" },
          { id: "display", label: "文物展示卷" },
        ]
      },
      {
        id: "sub-volumes",
        label: "副卷管理",
        children: [
          { id: "admin-doc", label: "行政管理文件" },
          { id: "legal-doc", label: "法律文书" },
          { id: "chronicle", label: "大事记" },
        ]
      },
      {
        id: "ref-volumes",
        label: "备考卷管理",
        children: [
          { id: "reference", label: "参考资料" },
          { id: "literature", label: "论文与文献学术成果管理" },
          { id: "book", label: "图书管理" },
        ]
      },
      { id: "analysis", label: "智能分析" },
      { id: "basic-info", label: "基础信息字段" },
      { id: "publicity", label: "公开性维护" },
    ],
  },
  {
    id: "safety",
    label: "安全监测",
    menus: [
      { id: "equipment", label: "设备台账" },
      { id: "alarm", label: "告警处置" },
      { id: "api", label: "接口对接" },
    ],
  },
  {
    id: "restoration",
    label: "修葺管理",
    menus: [
      { id: "stats", label: "修葺统计" },
      { id: "scheme", label: "方案管理" },
      { id: "approval", label: "方案审批" },
      { id: "record", label: "修葺记录" },
    ],
  },
  {
    id: "system",
    label: "系统管理",
    menus: [
      { id: "user", label: "用户管理" },
      { id: "role", label: "角色管理" },
      { id: "contact", label: "通讯录" },
      { id: "login-log", label: "登录日志" },
      { id: "op-log", label: "操作日志" },
    ],
  },
];