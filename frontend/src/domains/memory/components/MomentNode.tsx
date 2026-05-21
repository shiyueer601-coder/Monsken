import React, { useState } from 'react';

interface MomentNodeProps {
  id: string;
  content: string;
  mood: 'green' | 'blue' | 'purple';
  timestamp: string;
  onDelete?: (id: string) => void;
}

const MomentNode: React.FC<MomentNodeProps> = ({
  id,
  content,
  mood,
  timestamp,
  onDelete
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const moodConfig = {
    green: {
      text: 'text-morandi-green',
      bg: 'bg-morandi-green/10',
      border: 'border-morandi-green/30',
      glow: 'shadow-morandi-green/20',
      label: '平静'
    },
    blue: {
      text: 'text-morandi-blue',
      bg: 'bg-morandi-blue/10',
      border: 'border-morandi-blue/30',
      glow: 'shadow-morandi-blue/20',
      label: '专注'
    },
    purple: {
      text: 'text-morandi-purple',
      bg: 'bg-morandi-purple/10',
      border: 'border-morandi-purple/30',
      glow: 'shadow-morandi-purple/20',
      label: '创造'
    },
  };
  
  const config = moodConfig[mood];
  
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Unknown time';
    }
  };
  
  const formatFullDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('zh-CN', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Unknown date';
    }
  };

  return (
    <div
      className={`
        relative
        animate-float
        px-4 py-3
        rounded-xl
        backdrop-blur-sm
        bg-moonlight-soft/40
        border border-nordic-fog/20
        ${config.text}
        transition-all duration-300 ease-out
        cursor-pointer
        ${isHovered ? `border ${config.border} shadow-lg ${config.glow} scale-105 -translate-y-1` : ''}
        ${isExpanded ? 'max-w-md' : 'max-w-xs'}
      `}
      style={{
        animationDuration: `${3 + Math.random() * 2}s`,
        animationDelay: `${Math.random() * 2}s`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* 心情指示器 */}
      <div className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-${mood === 'green' ? 'morandi-green' : mood === 'blue' ? 'morandi-blue' : 'morandi-purple'} ${isHovered ? 'animate-pulse' : ''}`} />
      
      {/* 内容区域 */}
      <div className={`transition-all duration-300 ${isExpanded ? 'max-h-40' : 'max-h-12'}`}>
        <p className={`
          text-sm font-medium leading-relaxed
          ${isExpanded ? 'whitespace-pre-wrap' : 'line-clamp-2'}
        `}>
          {content}
        </p>
      </div>
      
      {/* 底部信息栏 */}
      <div className={`
        mt-2 flex items-center justify-between
        transition-all duration-300
        ${isExpanded ? 'opacity-100' : 'opacity-70'}
      `}>
        <div className="flex items-center gap-2">
          <span className="text-xs text-nordic-fog/50">
            {isExpanded ? formatFullDate(timestamp) : formatDate(timestamp)}
          </span>
          <span className={`
            px-1.5 py-0.5 text-xs rounded-full
            ${config.bg} ${config.text}/70
          `}>
            {config.label}
          </span>
        </div>
        
        {/* 展开/收起提示 */}
        <div className="flex items-center gap-2">
          {isHovered && (
            <span className="text-xs text-nordic-fog/40">
              {isExpanded ? '点击收起' : '点击展开'}
            </span>
          )}
          <svg 
            className={`w-3 h-3 text-nordic-fog/50 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      {/* 展开时的删除按钮 */}
      {isExpanded && onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
          className="
            absolute top-2 left-2
            p-1 rounded-full
            text-nordic-fog/40 hover:text-red-400
            hover:bg-red-400/10
            transition-all duration-200
          "
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
      
      {/* 光晕效果 */}
      <div className={`
        absolute inset-0 rounded-xl
        ${config.bg}
        blur-md
        opacity-0
        transition-opacity duration-300
        ${isHovered ? 'opacity-100' : ''}
        pointer-events-none
      `} />
    </div>
  );
};

export default MomentNode;
