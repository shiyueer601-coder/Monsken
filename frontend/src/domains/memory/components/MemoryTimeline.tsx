import React, { useState } from 'react';

interface Moment {
  id: string;
  text: string;
  mood: 'green' | 'blue' | 'purple';
  timestamp: Date;
}

interface MemoryTimelineProps {
  moments: Moment[];
}

const MemoryTimeline: React.FC<MemoryTimelineProps> = ({ moments }) => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  
  // 按日期分组
  const groupByDate = () => {
    const groups: Record<string, Moment[]> = {};
    moments.forEach(moment => {
      const dateKey = moment.timestamp.toLocaleDateString('zh-CN');
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(moment);
    });
    return groups;
  };
  
  const grouped = groupByDate();
  
  const getMoodColor = (mood: string) => {
    switch(mood) {
      case 'green': return 'bg-morandi-green';
      case 'blue': return 'bg-morandi-blue';
      case 'purple': return 'bg-morandi-purple';
      default: return 'bg-nordic-fog';
    }
  };
  
  const getDateLabel = (dateStr: string) => {
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      return `${parts[1]}月${parts[2]}日`;
    }
    return dateStr;
  };
  
  const isToday = (dateStr: string) => {
    return dateStr === new Date().toLocaleDateString('zh-CN');
  };

  return (
    <div className="w-full h-full overflow-y-auto px-4 py-6">
      {/* 时间线容器 */}
      <div className="relative">
        {/* 中心时间线 */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-morandi-green/30 via-morandi-blue/30 to-morandi-purple/30" />
        
        {/* 日期节点 */}
        <div className="space-y-8">
          {Object.entries(grouped).map(([date, dateMoments]) => (
            <div key={date} className="relative">
              {/* 日期标记 */}
              <div className="flex items-center gap-4 mb-3">
                <div className={`
                  w-4 h-4 rounded-full
                  border-2 border-nordic-fog/30
                  ${isToday(date) ? 'bg-jade-white/80 shadow-lg shadow-jade-white/30' : 'bg-moonlight-deep'}
                  transition-all duration-300
                  hover:scale-125
                `} />
                <div className="flex items-center gap-2">
                  <span className={`
                    text-sm font-medium
                    ${isToday(date) ? 'text-jade-white' : 'text-nordic-fog/70'}
                  `}>
                    {getDateLabel(date)}
                  </span>
                  {isToday(date) && (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-jade-white/10 text-jade-white/70">
                      今天
                    </span>
                  )}
                </div>
              </div>
              
              {/* 当天的记忆节点 */}
              <div className={`
                ml-12 space-y-2
                transition-all duration-300
                ${selectedDay === date ? 'opacity-100' : 'opacity-80'}
              `}>
                {dateMoments.map((moment) => (
                  <div
                    key={moment.id}
                    className={`
                      p-3 rounded-xl
                      bg-moonlight-soft/40
                      border border-nordic-fog/20
                      backdrop-blur-sm
                      transition-all duration-300
                      hover:bg-moonlight-soft/60
                      hover:border-nordic-fog/40
                      hover:translate-x-1
                      cursor-pointer
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full ${getMoodColor(moment.mood)} mt-1.5 flex-shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-jade-white/90">
                          {moment.text}
                        </p>
                        <p className="text-xs text-nordic-fog/50 mt-1">
                          {moment.timestamp.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* 起点标记 */}
        <div className="flex items-center gap-4 mt-8 pt-4 border-t border-nordic-fog/10">
          <div className="w-4 h-4 rounded-full bg-moonlight-deep border-2 border-nordic-fog/30" />
          <span className="text-xs text-nordic-fog/40">时间长河的起点</span>
        </div>
      </div>
    </div>
  );
};

export default MemoryTimeline;
