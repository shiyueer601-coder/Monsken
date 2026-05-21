import React from 'react';

interface MoodSelectorProps {
  selectedMood: 'green' | 'blue' | 'purple';
  onMoodChange: (mood: 'green' | 'blue' | 'purple') => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, onMoodChange }) => {
  const moods = [
    { 
      id: 'green' as const, 
      label: '平静',
      color: 'morandi-green',
      description: '宁静、祥和'
    },
    { 
      id: 'blue' as const, 
      label: '专注',
      color: 'morandi-blue',
      description: '沉思、专注'
    },
    { 
      id: 'purple' as const, 
      label: '创造',
      color: 'morandi-purple',
      description: '灵感、创意'
    },
  ];

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-xs text-nordic-fog/60 uppercase tracking-wider">选择此刻心境</p>
      <div className="flex gap-3">
        {moods.map((mood) => (
          <button
            key={mood.id}
            onClick={() => onMoodChange(mood.id)}
            className={`
              relative px-6 py-3 rounded-xl transition-all duration-300
              backdrop-blur-sm border
              ${selectedMood === mood.id 
                ? `bg-moonlight-soft/80 border-${mood.color}/50 text-${mood.color}` 
                : 'bg-transparent border-nordic-fog/20 text-nordic-fog/50 hover:border-nordic-fog/40'
              }
            `}
          >
            <span className="text-sm font-medium">{mood.label}</span>
            {selectedMood === mood.id && (
              <span className="block text-xs mt-1 opacity-70">{mood.description}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
