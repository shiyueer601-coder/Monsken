import React, { useState } from 'react';

interface Moment {
  id: string;
  text: string;
  mood: 'green' | 'blue' | 'purple';
  timestamp: Date;
}

interface MemoryClusterProps {
  moments: Moment[];
  moodFilter?: 'green' | 'blue' | 'purple';
}

const MemoryCluster: React.FC<MemoryClusterProps> = ({ moments, moodFilter }) => {
  const [hoveredMood, setHoveredMood] = useState<'green' | 'blue' | 'purple' | null>(null);
  
  // 按心情分组
  const groupedMoments = {
    green: moments.filter(m => m.mood === 'green'),
    blue: moments.filter(m => m.mood === 'blue'),
    purple: moments.filter(m => m.mood === 'purple'),
  };
  
  const moodConfig = {
    green: {
      label: '平静',
      color: 'morandi-green',
      glow: 'shadow-morandi-green/30',
      bg: 'bg-morandi-green/5',
      border: 'border-morandi-green/30',
      description: '宁静、平和的时刻'
    },
    blue: {
      label: '专注',
      color: 'morandi-blue',
      glow: 'shadow-morandi-blue/30',
      bg: 'bg-morandi-blue/5',
      border: 'border-morandi-blue/30',
      description: '思考、专注的瞬间'
    },
    purple: {
      label: '创造',
      color: 'morandi-purple',
      glow: 'shadow-morandi-purple/30',
      bg: 'bg-morandi-purple/5',
      border: 'border-morandi-purple/30',
      description: '灵感、创意的火花'
    },
  };
  
  const displayMoments = moodFilter 
    ? { [moodFilter]: groupedMoments[moodFilter] }
    : groupedMoments;

  return (
    <div className="w-full h-full flex flex-wrap justify-center items-center gap-6 p-4">
      {Object.entries(displayMoments).map(([mood, moodMoments]) => {
        if (moodMoments.length === 0) return null;
        
        const config = moodConfig[mood as keyof typeof moodConfig];
        
        return (
          <div
            key={mood}
            className={`
              relative
              ${config.bg}
              border ${config.border}
              rounded-2xl
              p-4
              backdrop-blur-sm
              transition-all duration-500
              ${hoveredMood === mood ? `shadow-lg ${config.glow} scale-105` : ''}
              min-w-[200px] max-w-[300px]
            `}
            onMouseEnter={() => setHoveredMood(mood as 'green' | 'blue' | 'purple')}
            onMouseLeave={() => setHoveredMood(null)}
          >
            {/* 标题 */}
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-3 h-3 rounded-full bg-${config.color}`} />
              <span className={`text-sm font-medium text-${config.color}`}>
                {config.label} ({moodMoments.length})
              </span>
            </div>
            
            {/* 描述 */}
            <p className="text-xs text-nordic-fog/50 mb-3">
              {config.description}
            </p>
            
            {/* 记忆节点列表 */}
            <div className="space-y-2">
              {moodMoments.slice(0, 5).map((moment, index) => (
                <div
                  key={moment.id}
                  className={`
                    p-2 rounded-lg
                    bg-moonlight-deep/30
                    border border-nordic-fog/10
                    transition-all duration-300
                    hover:bg-moonlight-deep/50
                    hover:border-${config.color}/30
                    cursor-pointer
                  `}
                  style={{
                    opacity: 1 - (index * 0.15),
                    transform: `translateY(${index * 4}px)`
                  }}
                >
                  <p className="text-xs text-jade-white/80 line-clamp-2">
                    {moment.text}
                  </p>
                </div>
              ))}
              
              {moodMoments.length > 5 && (
                <div className="text-center py-2">
                  <span className="text-xs text-nordic-fog/40">
                    +{moodMoments.length - 5} 更多记忆
                  </span>
                </div>
              )}
            </div>
            
            {/* 光晕效果 */}
            <div className={`
              absolute inset-0 rounded-2xl
              bg-${config.color}/5
              blur-xl
              opacity-0
              transition-opacity duration-500
              ${hoveredMood === mood ? 'opacity-100' : ''}
            `} />
          </div>
        );
      })}
      
      {Object.values(displayMoments).every(m => m.length === 0) && (
        <div className="text-center text-nordic-fog/40">
          <p className="text-sm">暂无记忆节点</p>
          <p className="text-xs mt-1">记录一些想法吧~</p>
        </div>
      )}
    </div>
  );
};

export default MemoryCluster;
