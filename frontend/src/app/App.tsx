import React, { useEffect, useState } from 'react';
import useIntentionStore from '@/domains/intention/hooks/useIntentionStore';
import useTemporalStore from '@/domains/temporal/hooks/useTemporalStore';
import FloatingIntent from '@/domains/intention/components/FloatingIntent';
import MoodSelector from '@/domains/intention/components/MoodSelector';
import MomentInput from '@/domains/intention/components/MomentInput';
import MemoryRiver from '@/domains/memory/components/MemoryRiver';
import MemoryCluster from '@/domains/memory/components/MemoryCluster';
import MemoryTimeline from '@/domains/memory/components/MemoryTimeline';
import DayBar from '@/domains/temporal/components/DayBar';
import TemporalCalendar from '@/domains/temporal/components/TemporalCalendar';
import TimeFlow from '@/domains/temporal/components/TimeFlow';
import SeasonalShift from '@/domains/temporal/components/SeasonalShift';

type MemoryView = 'river' | 'cluster' | 'timeline';

function App() {
  const { 
    currentMood, 
    setCurrentMood, 
    moments, 
    addMoment 
  } = useIntentionStore();
  
  const { timeOfDay } = useTemporalStore();
  
  const [showCalendar, setShowCalendar] = useState(false);
  const [memoryView, setMemoryView] = useState<MemoryView>('river');

  // Generate stars on mount
  useEffect(() => {
    const container = document.getElementById('stars-container');
    if (!container || container.children.length > 0) return;
    
    const starCount = 150;
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      
      const size = Math.random() * 3 + 1;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = Math.random() * 4 + 5;
      
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

  const handleAddMoment = (text: string) => {
    addMoment(text, currentMood);
  };
  
  const handleSelectDate = (date: string) => {
    setShowCalendar(false);
  };

  const memoryViews = [
    { id: 'river' as MemoryView, label: '记忆之河', icon: '🌊' },
    { id: 'cluster' as MemoryView, label: '情感聚集', icon: '🌀' },
    { id: 'timeline' as MemoryView, label: '时间线', icon: '⏳' },
  ];

  return (
    <div className="min-h-screen moonlight-gradient relative overflow-hidden">
      {/* Seasonal Background */}
      <SeasonalShift />
      
      {/* Stars Background */}
      <div id="stars-container" className="stars"></div>
      
      {/* Time Flow Animation */}
      <TimeFlow />
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Temporal Layer - Top Bar */}
        <DayBar />
        
        {/* Calendar Toggle Button */}
        <div className="flex justify-center px-6 mb-4">
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="px-4 py-2 rounded-full text-sm text-nordic-fog/60 hover:text-jade-white hover:bg-moonlight-soft/30 transition-all duration-300"
          >
            📅 {showCalendar ? '收起日历' : '展开日历'}
          </button>
        </div>
        
        {/* Calendar Drawer */}
        <div className={`
          overflow-hidden transition-all duration-500 ease-in-out
          ${showCalendar ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}
        `}>
          <TemporalCalendar onSelectDate={handleSelectDate} />
        </div>
        
        {/* Intention Layer */}
        <div className="flex justify-center px-8 mt-6 mb-6">
          <FloatingIntent />
        </div>
        
        {/* Mood Selector */}
        <div className="flex justify-center px-8 mb-6">
          <MoodSelector selectedMood={currentMood} onMoodChange={setCurrentMood} />
        </div>
        
        {/* Memory View Toggle */}
        <div className="flex justify-center px-8 mb-4">
          <div className="flex gap-2">
            {memoryViews.map((view) => (
              <button
                key={view.id}
                onClick={() => setMemoryView(view.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-300
                  ${memoryView === view.id 
                    ? 'bg-moonlight-soft/80 text-jade-white border border-nordic-fog/30' 
                    : 'bg-transparent text-nordic-fog/50 hover:text-nordic-fog/80'
                  }
                `}
              >
                <span>{view.icon}</span>
                <span>{view.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Memory Layer */}
        <div className="flex-1 px-8 mb-6">
          {memoryView === 'river' && (
            <MemoryRiver moments={moments} currentMood={currentMood} />
          )}
          {memoryView === 'cluster' && (
            <MemoryCluster moments={moments} />
          )}
          {memoryView === 'timeline' && (
            <MemoryTimeline moments={moments} />
          )}
        </div>
        
        {/* Moment Input */}
        <div className="flex justify-center px-8 pb-12">
          <MomentInput 
            onSubmit={handleAddMoment}
            placeholder={
              timeOfDay === 'morning' 
                ? '记录此刻的想法，开启新的一天...'
                : timeOfDay === 'day'
                ? '捕捉这个瞬间的想法...'
                : '夜晚的沉思与回顾...'
            }
          />
        </div>
      </div>
      
      {/* Atmospheric Fog */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-moonlight-deep/60 to-transparent pointer-events-none" />
    </div>
  );
}

export default App
