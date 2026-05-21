import React, { useEffect, useRef } from 'react';
import useIntentionStore from './useIntentionStore';

const IntentionTest = () => {
  const { currentIntention, setIntention } = useIntentionStore();
  const starsContainerRef = useRef<HTMLDivElement>(null);
  
  const getMoodColor = (mood: string) => {
    switch(mood) {
      case 'green': return 'text-morandi-green';
      case 'blue': return 'text-morandi-blue';
      case 'purple': return 'text-morandi-purple';
      default: return 'text-morandi-green';
    }
  };

  useEffect(() => {
    if (!starsContainerRef.current) return;
    
    const container = starsContainerRef.current;
    const starCount = 150;
    
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      
      const size = Math.random() * 3 + 1;
      const x = Math.random() * 100;
      const y = Math.random() * 70;
      const delay = Math.random() * 5;
      const duration = Math.random() * 3 + 2;
      
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${x}%`;
      star.style.top = `${y}%`;
      star.style.animationDelay = `${delay}s`;
      star.style.animationDuration = `${duration}s`;
      
      container.appendChild(star);
    }
    
    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="min-h-screen moonlight-gradient flex flex-col items-center justify-center p-8 gap-4 relative">
      {/* Stars */}
      <div ref={starsContainerRef} className="stars"></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <h1 className="text-xl font-bold text-jade-white/80 mb-4">Intention Store Test</h1>

        {/* Display current intention */}
        <div className="bg-moonlight-soft/80 backdrop-blur-sm p-4 rounded-xl border border-nordic-fog/20">
          <p className="text-sm text-nordic-fog mb-2">Current Intention:</p>
          <p className={`text-lg font-medium ${getMoodColor(currentIntention.mood)}`}>
            "{currentIntention.text}"
          </p>
          <p className={`text-xs mt-1 ${getMoodColor(currentIntention.mood)}`}>Mood: {currentIntention.mood}</p>
        </div>

        {/* Test buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setIntention('Be peaceful', 'green')}
            className="px-4 py-2 bg-moonlight-soft/80 backdrop-blur-sm text-morandi-green rounded-xl hover:bg-moonlight-soft/60 transition-colors border border-nordic-fog/20"
          >
            Set Green
          </button>
          <button
            onClick={() => setIntention('Stay focused', 'blue')}
            className="px-4 py-2 bg-moonlight-soft/80 backdrop-blur-sm text-morandi-blue rounded-xl hover:bg-moonlight-soft/60 transition-colors border border-nordic-fog/20"
          >
            Set Blue
          </button>
          <button
            onClick={() => setIntention('Be creative', 'purple')}
            className="px-4 py-2 bg-moonlight-soft/80 backdrop-blur-sm text-morandi-purple rounded-xl hover:bg-moonlight-soft/60 transition-colors border border-nordic-fog/20"
          >
            Set Purple
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntentionTest;