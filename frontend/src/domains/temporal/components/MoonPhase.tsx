import React from 'react';
import useTemporalStore from '../hooks/useTemporalStore';
import { MoonPhase as MoonPhaseType } from '../hooks/useTemporalStore';

const MoonPhase: React.FC = () => {
  const { moonPhase, currentDate } = useTemporalStore();

  const getMoonIcon = () => {
    const icons: Record<MoonPhaseType, string> = {
      'new': '🌑',
      'waxing-crescent': '🌒',
      'first-quarter': '🌓',
      'waxing-gibbous': '🌔',
      'full': '🌕',
      'waning-gibbous': '🌖',
      'third-quarter': '🌗',
      'waning-crescent': '🌘',
    };
    return icons[moonPhase];
  };

  const getMoonName = () => {
    const names: Record<MoonPhaseType, string> = {
      'new': '新月',
      'waxing-crescent': '蛾眉月',
      'first-quarter': '上弦月',
      'waxing-gibbous': '盈凸月',
      'full': '满月',
      'waning-gibbous': '亏凸月',
      'third-quarter': '下弦月',
      'waning-crescent': '残月',
    };
    return names[moonPhase];
  };

  // 获取农历日期
  const getLunarDate = () => {
    const lunarDays = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
      '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
      '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'];
    const date = new Date(currentDate);
    const day = date.getDate();
    return lunarDays[day - 1];
  };

  return (
    <div className="flex flex-col items-center gap-1 group cursor-pointer">
      <div className="relative">
        {/* 月亮图标 */}
        <span 
          className="text-3xl transition-all duration-500 group-hover:scale-110 animate-breathe"
          style={{ animationDuration: '6s' }}
        >
          {getMoonIcon()}
        </span>
        
        {/* 光晕效果 */}
        <div className="absolute inset-0 -m-2 bg-moon-glow/20 rounded-full blur-lg opacity-50 group-hover:opacity-70 transition-opacity" />
      </div>
      
      <div className="text-center">
        <p className="text-xs text-nordic-fog/70">{getMoonName()}</p>
        <p className="text-xs text-jade-white/50">{getLunarDate()}</p>
      </div>
    </div>
  );
};

export default MoonPhase;
