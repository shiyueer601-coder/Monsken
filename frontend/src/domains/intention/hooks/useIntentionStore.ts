import { create } from 'zustand';

// Define the intention type
export interface Intention {
  text: string;
  mood: 'green' | 'blue' | 'purple';
}

// Define the moment type
export interface Moment {
  id: string;
  text: string;
  mood: 'green' | 'blue' | 'purple';
  timestamp: Date;
}

// Define the time of day type
export type TimeOfDay = 'morning' | 'day' | 'evening';

// Define the store interface
interface IntentionStore {
  // Intention
  currentIntention: Intention;
  setIntention: (text: string, mood?: 'green' | 'blue' | 'purple') => void;
  
  // Moments
  moments: Moment[];
  addMoment: (text: string, mood: 'green' | 'blue' | 'purple') => void;
  removeMoment: (id: string) => void;
  
  // Time of day
  timeOfDay: TimeOfDay;
  setTimeOfDay: (time: TimeOfDay) => void;
  
  // Current mood for new moment
  currentMood: 'green' | 'blue' | 'purple';
  setCurrentMood: (mood: 'green' | 'blue' | 'purple') => void;
}

// Create the store
const useIntentionStore = create<IntentionStore>((set) => ({
  // Initial intention
  currentIntention: {
    text: '今天我想保持内心的宁静',
    mood: 'green',
  },
  setIntention: (text: string, mood: 'green' | 'blue' | 'purple' = 'green') => {
    set({
      currentIntention: {
        text,
        mood
      }
    });
  },
  
  // Initial moments
  moments: [
    {
      id: '1',
      text: '早晨的阳光透过窗帘洒进来，感觉很温暖',
      mood: 'green',
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: '2',
      text: '今天开始读一本关于哲学的书，思考了很多',
      mood: 'blue',
      timestamp: new Date(Date.now() - 7200000)
    },
    {
      id: '3',
      text: '想到一些新的项目创意，很兴奋',
      mood: 'purple',
      timestamp: new Date(Date.now() - 10800000)
    }
  ],
  addMoment: (text: string, mood: 'green' | 'blue' | 'purple') => {
    const newMoment: Moment = {
      id: Date.now().toString(),
      text,
      mood,
      timestamp: new Date()
    };
    set((state) => ({
      moments: [newMoment, ...state.moments]
    }));
  },
  removeMoment: (id: string) => {
    set((state) => ({
      moments: state.moments.filter(m => m.id !== id)
    }));
  },
  
  // Initial time of day
  timeOfDay: 'morning',
  setTimeOfDay: (time: TimeOfDay) => {
    set({ timeOfDay: time });
  },
  
  // Initial current mood
  currentMood: 'green',
  setCurrentMood: (mood: 'green' | 'blue' | 'purple') => {
    set({ currentMood: mood });
  },
}));

export default useIntentionStore;