# FloatingIntent 组件、Intention Store、Repository 和 MomentNode 实现进度表

## 项目背景
根据 Monsken README.md 的要求，需要创建完整的 intention 和 memory 管理系统，包括显示组件、状态管理和数据持久化，符合项目的 "Slow Interface Philosophy" 和 "Emotional Awareness" 原则。

## 实现要求检查清单

### ✅ FloatingIntent 组件
- [x] 显示今日 intention 文字
- [x] 支持三种 mood 颜色：green, blue, purple
- [x] 使用 TypeScript 严格定义 props 类型
- [x] 使用 React Functional Component 风格
- [x] 独立可用，不依赖其他 domain 或 store
- [x] 浮动上下 5px 动画
- [x] 轻微 opacity 呼吸效果
- [x] 使用 Tailwind CSS + 自定义动画
- [x] 使用 Monsken 设计系统的颜色调色板
- [x] 包含 mock 数据示例
- [x] 提供独立的 HTML 测试文件

### ✅ Intention Zustand Store
- [x] 创建独立的 Zustand store
- [x] state: currentIntention (包含 text 和 mood)
- [x] action: setIntention(text: string, mood?: moodType)
- [x] TypeScript 类型严格定义
- [x] 使用 mock 数据初始化：{ text: "Be calm today", mood: "green" }
- [x] 可直接在组件中调用
- [x] 不连接数据库（暂时使用 mock 数据）

### ✅ Intention Repository
- [x] 创建独立的 repository 模块
- [x] saveIntention(intention: Intention): Promise<void>
- [x] getIntention(): Promise<Intention | null>
- [x] TypeScript 类型严格定义
- [x] 使用 mock SQLite（内存存储模拟）
- [x] 返回 Promise，支持异步操作
- [x] 可直接测试，无需真实数据库

### ✅ MomentNode 组件
- [x] 显示 memory fragment 内容
- [x] 支持四种 props：id, content, mood, timestamp
- [x] 使用 TypeScript 严格定义 props 类型
- [x] 使用 React Functional Component 风格
- [x] 独立组件，不访问其他 domain
- [x] soft float 动画（上下浮动 5px）
- [x] opacity fade in 动画（淡入效果）
- [x] 使用 Tailwind CSS + 自定义动画
- [x] 使用 Monsken Morandi 颜色调色板
- [x] 包含 mock 数据示例
- [x] 提供独立的 HTML 测试文件
- [x] 时间戳格式化为可读格式

## 技术实现细节

### 文件结构
```
frontend/src/
└── domains/
    ├── intention/
    │   ├── components/
    │   │   └── FloatingIntent.tsx
    │   ├── hooks/
    │   │   ├── useIntentionStore.ts
    │   │   ├── index.ts
    │   │   └── useIntentionStore.test.tsx
    │   ├── repository/
    │   │   ├── intentionRepository.ts
    │   │   ├── index.ts
    │   │   └── intentionRepository.test.ts
    │   ├── types/
    │   │   └── index.ts
    │   └── services/
    │       └── index.ts
    └── memory/
        ├── components/
        │   └── MomentNode.tsx
        ├── hooks/
        │   └── index.ts
        ├── repository/
        │   └── index.ts
        ├── services/
        │   └── index.ts
        └── types/
            └── index.ts
```

### TypeScript 类型定义
```typescript
export type MoodType = 'green' | 'blue' | 'purple';

export interface Intention {
  text: string;
  mood: MoodType;
}

export interface MomentNodeProps {
  id: string;
  content: string;
  mood: MoodType;
  timestamp: string;
}
```

### 组件 Props
```typescript
// FloatingIntent
interface FloatingIntentProps {
  text: string;
  mood: MoodType;
}

// MomentNode  
interface MomentNodeProps {
  id: string;
  content: string;
  mood: MoodType;
  timestamp: string;
}
```

### Intention Store 接口
```typescript
interface IntentionStore {
  currentIntention: Intention | null;
  setIntention: (text: string, mood?: MoodType) => void;
}
```

### Repository 接口
```typescript
interface IntentionRepository {
  saveIntention: (intention: Intention) => Promise<void>;
  getIntention: () => Promise<Intention | null>;
}
```

### 动画实现
1. **浮动动画**: 使用 CSS `@keyframes float` 实现上下 5px 移动
2. **呼吸动画**: 使用 CSS `@keyframes breathe` 实现 opacity 在 0.8-1.0 之间变化
3. **淡入动画**: 使用 CSS `@keyframes fade-in` 实现组件加载时的淡入效果
4. **Tailwind 配置**: 在 `tailwind.config.js` 中添加自定义动画支持

### 颜色映射
- `green` → `text-morandi-green` (#7fb37f)
- `blue` → `text-morandi-blue` (#7f9fb3)  
- `purple` → `text-morandi-purple` (#9f7fb3)

## 使用方法

### 完整的数据流集成
```tsx
import { useEffect } from 'react';
import useIntentionStore from './domains/intention/hooks/useIntentionStore';
import { intentionRepository } from './domains/intention/repository/intentionRepository';
import FloatingIntent from './domains/intention/components/FloatingIntent';
import MomentNode from './domains/memory/components/MomentNode';

const App = () => {
  const { currentIntention, setIntention } = useIntentionStore();

  // Load intention from repository on mount
  useEffect(() => {
    const loadIntention = async () => {
      const intention = await intentionRepository.getIntention();
      if (intention) {
        setIntention(intention.text, intention.mood);
      }
    };
    loadIntention();
  }, [setIntention]);

  const handleSaveIntention = async (text: string, mood: MoodType) => {
    await intentionRepository.saveIntention({ text, mood });
    setIntention(text, mood);
  };

  if (!currentIntention) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <FloatingIntent 
        text={currentIntention.text} 
        mood={currentIntention.mood} 
      />
      
      <MomentNode
        id="1"
        content="Captured a peaceful moment"
        mood="green"
        timestamp="2026-05-21T14:30:00"
      />
      
      <button onClick={() => handleSaveIntention('New intention', 'blue')}>
        Update Intention
      </button>
    </div>
  );
};
```

## 测试方法

### 方法 1: 使用独立 HTML 文件测试
1. 打开 `test-floating-intent.html` 文件测试 FloatingIntent
2. 打开 `test-moment-node.html` 文件测试 MomentNode
3. 在浏览器中直接打开这些文件
4. 观察浮动、呼吸和淡入动画效果

### 方法 2: 使用 React 测试组件
1. 导入 `IntentionTest` 组件测试 intention 功能
2. 在应用中渲染 MomentNode 组件测试 memory 显示
3. 验证时间戳格式化和 mood 颜色是否正确

### 方法 3: 测试 Repository
1. 导入 `intentionRepository.test.ts`
2. 在控制台查看测试输出
3. 验证异步操作是否正常工作

## Mock 数据清理计划

### 当前状态：使用 Mock 数据
- ✅ FloatingIntent: 包含 MockFloatingIntent 示例（保留用于文档）
- ✅ MomentNode: 包含 MockMomentNode 示例（保留用于文档）
- ✅ Zustand Store: 使用 mock 初始化数据
- ✅ Repository: 使用内存存储模拟 SQLite

### 清理时机：集成真实 SQLite 时
当实现以下功能时替换 mock 数据：
1. **Tauri 集成**: 设置 Tauri 插件访问本地 SQLite
2. **SQLModel 模型**: 在 backend 创建 Intention 和 Memory SQLModel
3. **API 端点**: 创建 REST API 用于 CRUD 操作
4. **服务层**: 在 frontend/services 实现 API 调用

### 过渡方案
```typescript
// 临时：同时支持 mock 和真实数据
const useRealDatabase = process.env.NODE_ENV === 'production';

export const intentionRepository = {
  saveIntention: useRealDatabase 
    ? realSaveIntention 
    : mockSaveIntention,
  getIntention: useRealDatabase 
    ? realGetIntention 
    : mockGetIntention
};
```

## 下一步计划
- [ ] 实现 frontend/services 层连接 backend API
- [ ] 在 backend/models 创建 Intention 和 Memory SQLModel
- [ ] 实现 backend/api/intention.py 和 backend/api/memory.py REST 端点
- [ ] 集成 Tauri SQLite 插件（桌面应用）
- [ ] 添加响应式设计支持
- [ ] 优化动画性能
- [ ] 添加无障碍支持 (ARIA 标签等)
- [ ] 实现完整的 CRUD 操作
- [ ] 创建 Memory River 主界面集成所有组件

## 参考资料
- Monsken README.md - Core Philosophy and Design Principles
- Nordic Moonlight Design System
- Tailwind CSS Custom Animations Documentation
- Zustand Documentation
- Tauri SQLite Plugin Documentation
- SQLModel Documentation