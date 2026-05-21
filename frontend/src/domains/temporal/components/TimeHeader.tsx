import React from 'react';

interface TimeHeaderProps {
  timeOfDay: 'morning' | 'day' | 'evening';
  onTimeChange: (time: 'morning' | 'day' | 'evening') => void;
}

const TimeHeader: React.FC<TimeHeaderProps> = ({ timeOfDay, onTimeChange }) => {
  const getTimeOfDayText = () => {
    switch(timeOfDay) {
      case 'morning': return '清晨意图';
      case 'day': return '日间记忆';
      case 'evening': return '夜晚沉思';
    }
  };

  const getTimeOfDayIcon = () => {
    switch(timeOfDay) {
      case 'morning': return '🌅';
      case 'day': return '☀️';
      case 'evening': return '🌙';
    }
  };

  const timeSlots = ['morning', 'day', 'evening'] as const;

  return (
    <header className="w-full p-6 flex flex-col items-center gap-4">
      {/* Time Display */}
      <div className="text-center">
        <h2 className="text-sm text-nordic-fog/60 tracking-widest uppercase mb-2">
          {getTimeOfDayIcon()} {getTimeOfDayText()}
        </h2>
        <p className="text-4xl font-light text-jade-white/90 tracking-wide">
          {new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Time Mode Selector */}
      <div className="flex gap-2 mt-4">
        {timeSlots.map((slot) => (
          <button
            key={slot}
            onClick={() => onTimeChange(slot)}
            className={`
              px-4 py-2 rounded-full text-sm transition-all duration-300
              ${timeOfDay === slot 
                ? 'bg-moonlight-soft/80 text-jade-white border border-nordic-fog/30' 
                : 'bg-transparent text-nordic-fog/50 hover:text-nordic-fog/80'
              }
            `}
          >
            {slot === 'morning' ? '🌅 早晨' : slot === 'day' ? '☀️ 日间' : '🌙 夜晚'}
          </button>
        ))}
      </div>
    </header>
  );
};

export default TimeHeader;
