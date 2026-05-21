import React from 'react';
import useTemporalStore from '../hooks/useTemporalStore';
import MoonPhase from './MoonPhase';

const DayBar: React.FC = () => {
  const { currentDate, timeOfDay } = useTemporalStore();
  
  const date = new Date(currentDate);
  
  const weekdayNames = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  
  const timeSlots = [
    { id: 'morning', label: '清晨', icon: '🌅', time: '5:00 - 12:00' },
    { id: 'day', label: '日间', icon: '☀️', time: '12:00 - 18:00' },
    { id: 'evening', label: '夜晚', icon: '🌙', time: '18:00 - 5:00' },
  ] as const;
  
  const getTimeColor = () => {
    switch(timeOfDay) {
      case 'morning': return 'from-amber-500/20 to-yellow-500/10';
      case 'day': return 'from-sky-500/20 to-blue-500/10';
      case 'evening': return 'from-indigo-500/20 to-purple-500/10';
    }
  };

  return (
    <div className="w-full px-6 py-4">
      {/* 主日期条 */}
      <div className={`
        bg-gradient-to-r ${getTimeColor()} 
        backdrop-blur-xl rounded-2xl 
        border border-nordic-fog/20 
        p-4
        shadow-lg shadow-nordic-fog/10
      `}>
        <div className="flex items-center justify-between">
          {/* 左侧：日期信息 */}
          <div className="flex items-center gap-4">
            <div>
              <p className="text-xs text-nordic-fog/60 uppercase tracking-wider mb-1">
                {weekdayNames[date.getDay()]}
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-light text-jade-white/90 tracking-wide">
                  {date.getDate()}
                </span>
                <span className="text-lg text-nordic-fog/70">
                  {date.getMonth() + 1}月 {date.getFullYear()}
                </span>
              </div>
            </div>
          </div>
          
          {/* 中间：时间阶段指示器 */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">
                {timeSlots.find(t => t.id === timeOfDay)?.icon}
              </span>
              <div>
                <p className="text-sm text-jade-white/80">
                  {timeSlots.find(t => t.id === timeOfDay)?.label}
                </p>
                <p className="text-xs text-nordic-fog/50">
                  {timeSlots.find(t => t.id === timeOfDay)?.time}
                </p>
              </div>
            </div>
          </div>
          
          {/* 右侧：月相 */}
          <MoonPhase />
        </div>
        
        {/* 时间进度条 */}
        <div className="mt-4 h-1 bg-moonlight-deep/50 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${getTimeColor()} rounded-full transition-all duration-1000`}
            style={{ 
              width: timeOfDay === 'morning' ? '33%' : timeOfDay === 'day' ? '66%' : '100%' 
            }}
          />
        </div>
      </div>
      
      {/* 时间阶段切换按钮 */}
      <div className="flex justify-center gap-2 mt-4">
        {timeSlots.map((slot) => (
          <button
            key={slot.id}
            onClick={() => useTemporalStore.getState().setTimeOfDay(slot.id)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-300
              ${timeOfDay === slot.id 
                ? 'bg-moonlight-soft/80 text-jade-white border border-nordic-fog/30' 
                : 'bg-transparent text-nordic-fog/50 hover:text-nordic-fog/80'
              }
            `}
          >
            <span>{slot.icon}</span>
            <span>{slot.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DayBar;
