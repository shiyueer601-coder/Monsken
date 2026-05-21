import React, { useEffect, useState } from 'react';
import useTemporalStore from '../hooks/useTemporalStore';

const SeasonalShift: React.FC = () => {
  const { currentDate } = useTemporalStore();
  const [seasonColors, setSeasonColors] = useState({
    start: '#0f172a',
    end: '#1e293b',
    accent: '#8fa88f'
  });
  
  useEffect(() => {
    const date = new Date(currentDate);
    const month = date.getMonth() + 1;
    
    // 根据月份设置季节颜色
    const seasons = {
      spring: { // 3-5月
        start: '#064e3b',
        end: '#166534',
        accent: '#86efac'
      },
      summer: { // 6-8月
        start: '#0c4a6e',
        end: '#075985',
        accent: '#7dd3fc'
      },
      autumn: { // 9-11月
        start: '#7c2d12',
        end: '#9a3412',
        accent: '#fb923c'
      },
      winter: { // 12-2月
        start: '#1e3a5f',
        end: '#1e40af',
        accent: '#c7d2fe'
      }
    };
    
    let season: keyof typeof seasons;
    if (month >= 3 && month <= 5) season = 'spring';
    else if (month >= 6 && month <= 8) season = 'summer';
    else if (month >= 9 && month <= 11) season = 'autumn';
    else season = 'winter';
    
    setSeasonColors(seasons[season]);
  }, [currentDate]);
  
  const getSeasonName = () => {
    const date = new Date(currentDate);
    const month = date.getMonth() + 1;
    
    if (month >= 3 && month <= 5) return '春季';
    if (month >= 6 && month <= 8) return '夏季';
    if (month >= 9 && month <= 11) return '秋季';
    return '冬季';
  };
  
  const getSeasonIcon = () => {
    const date = new Date(currentDate);
    const month = date.getMonth() + 1;
    
    if (month >= 3 && month <= 5) return '🌸';
    if (month >= 6 && month <= 8) return '☀️';
    if (month >= 9 && month <= 11) return '🍂';
    return '❄️';
  };

  return (
    <div className="relative">
      {/* 季节渐变背景 */}
      <div 
        className="absolute inset-0 transition-all duration-1000 ease-in-out"
        style={{
          background: `linear-gradient(135deg, ${seasonColors.start} 0%, ${seasonColors.end} 50%, ${seasonColors.accent}15 100%)`
        }}
      />
      
      {/* 季节标识 */}
      <div className="relative z-10 absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-moonlight-deep/50 backdrop-blur-sm border border-nordic-fog/20">
        <span className="text-lg">{getSeasonIcon()}</span>
        <span className="text-xs text-nordic-fog/70">{getSeasonName()}</span>
      </div>
      
      {/* 装饰性粒子 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-breathe"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: seasonColors.accent,
              opacity: Math.random() * 0.3 + 0.1,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 4}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SeasonalShift;
