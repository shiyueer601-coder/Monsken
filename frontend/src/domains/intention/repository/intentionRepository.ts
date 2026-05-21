import { Intention } from '../types';

// Mock in-memory storage to simulate SQLite database
let mockDatabase: Intention | null = {
  text: 'Be calm today',
  mood: 'green'
};

/**
 * Repository module for intention data persistence
 * Mock implementation using in-memory storage (simulates SQLite)
 *
 * In a real Tauri desktop app, this would use sqlite3 or similar
 * to interact with the local SQLite database directly.
 */
export const intentionRepository = {
  /**
   * Save intention to the database
   * @param intention - The intention object to save
   * @returns Promise that resolves when saved
   */
  async saveIntention(intention: Intention): Promise<void> {
    // Simulate database save operation with delay
    await new Promise(resolve => setTimeout(resolve, 100));
    mockDatabase = { ...intention };
    console.log('Intention saved to mock database:', intention);
  },

  /**
   * Get today's intention from the database
   * @returns Promise that resolves with the intention object or null
   */
  async getIntention(): Promise<Intention | null> {
    // Simulate database read operation with delay
    await new Promise(resolve => setTimeout(resolve, 100));
    console.log('Intention loaded from mock database:', mockDatabase);
    return mockDatabase ? { ...mockDatabase } : null;
  },

  /**
   * Clear the mock database (for testing purposes)
   */
  async clearIntention(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 50));
    mockDatabase = null;
    console.log('Mock database cleared');
  }
};