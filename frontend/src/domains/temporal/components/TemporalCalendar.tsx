import React, { useState, useEffect } from 'react';
import useTemporalStore, { CalendarDay } from '../hooks/useTemporalStore';

interface TemporalCalendarProps {
  onSelectDate?: (date: string) => void;
}

const TemporalCalendar: React.FC<TemporalCalendarProps> = ({ onSelectDate }) => {
  const { currentDate, setCurrentDate, getCalendarMonth, moonPhase } = useTemporalStore();
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  
  const days = getCalendarMonth(currentYear, currentMonth);
  
  const selectedDate = currentDate;
  
  const handleDateClick = (day: CalendarDay) => {
    setCurrentDate(day.date);
    onSelectDate?.(day.date);
  };
  
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  
  const getMoodGlow = (mood?: string) => {
    switch(mood) {
      case 'green': return 'shadow-morandi-green/40';
      case 'blue': return 'shadow-morandi-blue/40';
      case 'purple': return 'shadow-morandi-purple/40';
      default: return '';
    }
  };
  
  const getMoodBorder = (mood?: string) => {
    switch(mood) {
      case 'green': return 'border-morandi-green/40';
      case 'blue': return 'border-morandi-blue/40';
      case 'purple': return 'border-morandi-purple/40';
      default: return 'border-transparent';
    }
  };
  
  const isSelected = (day: CalendarDay) => day.date === selectedDate;
  const isToday = (day: CalendarDay) => day.isToday;
  
  // 更新当前年月为选中日期
  useEffect(() => {
    const date = new Date(selectedDate);
    setCurrentYear(date.getFullYear());
    setCurrentMonth(date.getMonth());
  }, [selectedDate]);

  const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

  return (
    <div className="w-full px-6">
      <div className="bg-moonlight-soft/40 backdrop-blur-xl rounded-2xl border border-nordic-fog/20 p-4">
        {/* 月份标题栏 */}
        <div className="flex items-center justify-between mb-4">
          {/* 上一月按钮 */}
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-full text-nordic-fog/60 hover:text-jade-white hover:bg-moonlight-deep/50 transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* 月份年份 */}
          <div className="flex items-center gap-3">
            <span className="text-jade-white/80 font-medium">
              {monthNames[currentMonth]} {currentYear}
            </span>
          </div>
          
          {/* 下一月按钮 */}
          <button
            onClick={handleNextMonth}
            className="p-2 rounded-full text-nordic-fog/60 hover:text-jade-white hover:bg-moonlight-deep/50 transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        {/* 星期标题 */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['日', '一', '二', '三', '四', '五', '六'].map((day) => (
            <div key={day} className="text-center text-xs text-nordic-fog/50">
              {day}
            </div>
          ))}
        </div>
        
        {/* 日期网格 */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day) => (
            <button
              key={day.date}
              onClick={() => handleDateClick(day)}
              className={`
                relative p-2 rounded-xl text-sm transition-all duration-300
                ${isSelected(day) 
                  ? `bg-moonlight-deep/80 text-jade-white border ${getMoodBorder(day.mood)} ${getMoodGlow(day.mood)} shadow-lg animate-breathe` 
                  : isToday(day)
                    ? 'text-jade-white/90 hover:bg-moonlight-deep/50 hover:-translate-y-0.5'
                    : day.hasMoments
                      ? `text-nordic-fog hover:text-jade-white hover:bg-moonlight-deep/30 hover:-translate-y-0.5 ${getMoodGlow(day.mood)}`
                      : 'text-nordic-fog/50 hover:text-nordic-fog hover:bg-moonlight-deep/20 hover:-translate-y-0.5'
                }
              `}
              style={{ animationDuration: isSelected(day) ? '4s' : 'none' }}
            >
              <span>{new Date(day.date).getDate()}</span>
              
              {/* 心情指示器 */}
              {day.mood && !isSelected(day) && (
                <div className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-${day.mood === 'green' ? 'morandi-green' : day.mood === 'blue' ? 'morandi-blue' : 'morandi-purple'}`} />
              )}
              
              {/* 今日标记 */}
              {isToday(day) && (
                <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-jade-white/80" />
              )}
            </button>
          ))}
        </div>
        
        {/* 图例 */}
        <div className="flex items-center justify-center gap-6 mt-4 pt-3 border-t border-nordic-fog/10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-morandi-green" />
            <span className="text-xs text-nordic-fog/60">平静</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-morandi-blue" />
            <span className="text-xs text-nordic-fog/60">专注</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-morandi-purple" />
            <span className="text-xs text-nordic-fog/60">创造</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemporalCalendar;
