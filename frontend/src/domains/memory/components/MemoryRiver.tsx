import React from 'react';

interface Moment {
  id: string;
  text: string;
  mood: 'green' | 'blue' | 'purple';
  timestamp: Date;
}

interface MemoryRiverProps {
  moments: Moment[];
  currentMood: 'green' | 'blue' | 'purple';
}

const MemoryRiver: React.FC<MemoryRiverProps> = ({ moments, currentMood }) => {
  const getMoodColor = (mood: string) => {
    switch(mood) {
      case 'green': return {
        bg: 'bg-morandi-green/10',
        border: 'border-morandi-green/30',
        text: 'text-morandi-green',
        glow: 'shadow-morandi-green/20'
      };
      case 'blue': return {
        bg: 'bg-morandi-blue/10',
        border: 'border-morandi-blue/30',
        text: 'text-morandi-blue',
        glow: 'shadow-morandi-blue/20'
      };
      case 'purple': return {
        bg: 'bg-morandi-purple/10',
        border: 'border-morandi-purple/30',
        text: 'text-morandi-purple',
        glow: 'shadow-morandi-purple/20'
      };
    }
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return '刚刚';
    if (minutes < 60) return `${minutes}分钟前`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}小时前`;
    return `${Math.floor(hours / 24)}天前`;
  };

  return (
    <div className="relative w-full h-96 overflow-hidden">
      {/* River Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-moonlight-soft/10 to-transparent" />
      
      {/* River Flow Lines */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div 
          className="absolute w-full h-full"
          style={{
            background: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 50px,
              ${getMoodColor(currentMood).border} 50px,
              ${getMoodColor(currentMood).border} 51px
            )`,
            animation: 'riverFlow 20s linear infinite'
          }}
        />
      </div>

      {/* River Bed */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-moonlight-deep/50 to-transparent" />

      {/* Moments */}
      {moments.length === 0 ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-nordic-fog/40 text-sm italic">
            记忆之河空空如也... 让想法自由流淌
          </p>
        </div>
      ) : (
        <div className="relative w-full h-full">
          {moments.map((moment, index) => {
            const colors = getMoodColor(moment.mood);
            const left = 10 + (index * 30) % 80;
            const top = 20 + (index * 40) % 60;
            const delay = index * 0.5;

            return (
              <div
                key={moment.id}
                className={`
                  absolute
                  ${colors.bg}
                  border ${colors.border}
                  rounded-lg
                  p-3
                  backdrop-blur-sm
                  max-w-xs
                  animate-float
                  shadow-lg ${colors.glow}
                  transition-all duration-300
                  hover:scale-105 hover:z-10
                `}
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  animationDelay: `${delay}s`
                }}
              >
                <p className={`text-sm ${colors.text} mb-2`}>
                  {moment.text}
                </p>
                <p className="text-xs text-nordic-fog/50">
                  {getTimeAgo(moment.timestamp)}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-nordic-fog/30 rounded-full animate-breathe"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 4}s`
            }}
          />
        ))}
      </div>

      {/* River Flow Animation */}
      <style>{`
        @keyframes riverFlow {
          from { transform: translateX(-100%); }
          to { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default MemoryRiver;
