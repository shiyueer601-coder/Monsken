import React, { useEffect } from 'react';
import useIntentionStore from '../hooks/useIntentionStore';

const FloatingIntent: React.FC = () => {
  const { currentIntention } = useIntentionStore();
  
  const moodColors = {
    green: 'text-morandi-green border-morandi-green/30 shadow-morandi-green/20',
    blue: 'text-morandi-blue border-morandi-blue/30 shadow-morandi-blue/20',
    purple: 'text-morandi-purple border-morandi-purple/30 shadow-morandi-purple/20',
  };

  const colors = moodColors[currentIntention.mood];

  return (
    <div
      className={`
        relative
        animate-float
        animate-breathe
        px-8 py-4
        rounded-2xl
        backdrop-blur-xl
        bg-moonlight-soft/70
        border ${colors}
        ${colors.split(' ')[0]}
        shadow-lg
        transition-all duration-300
        text-center
        max-w-md
      `}
    >
      <p className="text-xs text-nordic-fog/60 uppercase tracking-wider mb-2">
        ✨ 今日意图
      </p>
      <p className="text-lg font-medium tracking-wide">
        {currentIntention.text}
      </p>
      <div className="absolute -top-2 -right-2 w-3 h-3 bg-moonlight-deep/80 border border-nordic-fog/30 rounded-full animate-pulse" />
    </div>
  );
};

export default FloatingIntent;
