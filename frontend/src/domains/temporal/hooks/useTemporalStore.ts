import { create } from 'zustand';

// 月相类型
export type MoonPhase = 'new' | 'waxing-crescent' | 'first-quarter' | 'waxing-gibbous' | 'full' | 'waning-gibbous' | 'third-quarter' | 'waning-crescent';

// 时间阶段类型
export type TimeOfDay = 'morning' | 'day' | 'evening';

// 日历日期类型
export interface CalendarDay {
  date: string; // YYYY-MM-DD
  isToday: boolean;
  hasMoments: boolean;
  mood?: 'green' | 'blue' | 'purple';
}

interface TemporalStore {
  // 当前日期
  currentDate: string;
  setCurrentDate: (date: string) => void;
  
  // 时间阶段
  timeOfDay: TimeOfDay;
  setTimeOfDay: (time: TimeOfDay) => void;
  
  // 月相
  moonPhase: MoonPhase;
  updateMoonPhase: () => void;
  
  // 获取指定月份的日历数据
  getCalendarMonth: (year: number, month: number) => CalendarDay[];
  
  // 获取今日心情
  getTodayMood: () => 'green' | 'blue' | 'purple' | undefined;
}

// 根据日期计算月相
const calculateMoonPhase = (date: Date): MoonPhase => {
  const baseDate = new Date('2024-01-10'); // 已知新月日期
  const daysSinceNew = Math.floor((date.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24));
  const phase = (daysSinceNew % 29.53) / 29.53;
  
  if (phase < 0.0625) return 'new';
  if (phase < 0.1875) return 'waxing-crescent';
  if (phase < 0.3125) return 'first-quarter';
  if (phase < 0.4375) return 'waxing-gibbous';
  if (phase < 0.5625) return 'full';
  if (phase < 0.6875) return 'waning-gibbous';
  if (phase < 0.8125) return 'third-quarter';
  return 'waning-crescent';
};

// 根据时间判断时间阶段
const getTimeOfDay = (date: Date): TimeOfDay => {
  const hour = date.getHours();
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 18) return 'day';
  return 'evening';
};

// 生成日历数据
const generateCalendarMonth = (year: number, month: number): CalendarDay[] => {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  
  const days: CalendarDay[] = [];
  
  // Mock数据：某些日期有记忆
  const daysWithMoments = [2, 5, 8, 12, 15, 18, 22, 25, 28];
  const moodMap: Record<number, 'green' | 'blue' | 'purple'> = {
    2: 'green',
    5: 'blue',
    8: 'purple',
    12: 'green',
    15: 'blue',
    18: 'purple',
    22: 'green',
    25: 'blue',
    28: 'purple',
  };
  
  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    days.push({
      date: dateStr,
      isToday: dateStr === todayStr,
      hasMoments: daysWithMoments.includes(i),
      mood: moodMap[i]
    });
  }
  
  return days;
};

const useTemporalStore = create<TemporalStore>((set, get) => ({
  currentDate: new Date().toISOString().split('T')[0],
  setCurrentDate: (date: string) => {
    set({ currentDate: date });
    set({ timeOfDay: getTimeOfDay(new Date(date)) });
    get().updateMoonPhase();
  },
  
  timeOfDay: getTimeOfDay(new Date()),
  setTimeOfDay: (time: TimeOfDay) => set({ timeOfDay: time }),
  
  moonPhase: calculateMoonPhase(new Date()),
  updateMoonPhase: () => {
    const date = new Date(get().currentDate);
    set({ moonPhase: calculateMoonPhase(date) });
  },
  
  getCalendarMonth: (year: number, month: number) => generateCalendarMonth(year, month),
  
  getTodayMood: () => {
    const today = new Date().toISOString().split('T')[0];
    const days = generateCalendarMonth(new Date().getFullYear(), new Date().getMonth());
    const todayData = days.find(d => d.date === today);
    return todayData?.mood;
  }
}));

export default useTemporalStore;
