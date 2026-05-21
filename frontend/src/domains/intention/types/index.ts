export type MoodType = 'green' | 'blue' | 'purple';

export interface Intention {
  text: string;
  mood: MoodType;
}